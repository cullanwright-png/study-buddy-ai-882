import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CanvasAssignment {
  id: number
  name: string
  description: string
  due_at: string | null
  points_possible: number | null
  submission_types: string[]
}

interface CanvasCourse {
  id: number
  name: string
  course_code: string
  start_at: string | null
  end_at: string | null
}

interface CanvasSubmission {
  assignment_id: number
  workflow_state: string
  grade: string | null
  score: number | null
  submitted_at: string | null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get Canvas settings for the user
    const { data: settings, error: settingsError } = await supabaseClient
      .from('canvas_settings')
      .select('canvas_url')
      .eq('user_id', user.id)
      .single()

    if (settingsError || !settings) {
      return new Response(
        JSON.stringify({ error: 'Canvas settings not configured' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const canvasToken = Deno.env.get('CANVAS_API_TOKEN')
    if (!canvasToken) {
      return new Response(
        JSON.stringify({ error: 'Canvas API token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const canvasBaseUrl = settings.canvas_url.replace(/\/$/, '')
    const headers = {
      'Authorization': `Bearer ${canvasToken}`,
      'Content-Type': 'application/json',
    }

    console.log('Fetching Canvas courses...')

    // Fetch courses from Canvas
    const coursesResponse = await fetch(`${canvasBaseUrl}/api/v1/courses?enrollment_state=active&per_page=100`, {
      headers,
    })

    if (!coursesResponse.ok) {
      throw new Error(`Canvas API error: ${coursesResponse.statusText}`)
    }

    const canvasCourses: CanvasCourse[] = await coursesResponse.json()
    console.log(`Found ${canvasCourses.length} courses`)

    // Store courses in database
    for (const course of canvasCourses) {
      await supabaseClient
        .from('canvas_courses')
        .upsert({
          user_id: user.id,
          canvas_course_id: course.id.toString(),
          name: course.name,
          course_code: course.course_code,
          start_at: course.start_at,
          end_at: course.end_at,
        }, {
          onConflict: 'user_id,canvas_course_id'
        })
    }

    // Fetch assignments for each course
    let totalAssignments = 0
    for (const course of canvasCourses) {
      console.log(`Fetching assignments for course ${course.id}...`)
      
      const assignmentsResponse = await fetch(
        `${canvasBaseUrl}/api/v1/courses/${course.id}/assignments?per_page=100`,
        { headers }
      )

      if (assignmentsResponse.ok) {
        const assignments: CanvasAssignment[] = await assignmentsResponse.json()
        totalAssignments += assignments.length

        for (const assignment of assignments) {
          await supabaseClient
            .from('canvas_assignments')
            .upsert({
              user_id: user.id,
              canvas_course_id: course.id.toString(),
              canvas_assignment_id: assignment.id.toString(),
              name: assignment.name,
              description: assignment.description,
              due_at: assignment.due_at,
              points_possible: assignment.points_possible,
              submission_types: assignment.submission_types,
            }, {
              onConflict: 'user_id,canvas_assignment_id'
            })
        }

        // Fetch submissions for the course
        const submissionsResponse = await fetch(
          `${canvasBaseUrl}/api/v1/courses/${course.id}/students/submissions?student_ids[]=all&per_page=100`,
          { headers }
        )

        if (submissionsResponse.ok) {
          const submissions: CanvasSubmission[] = await submissionsResponse.json()

          for (const submission of submissions) {
            await supabaseClient
              .from('canvas_submissions')
              .upsert({
                user_id: user.id,
                canvas_assignment_id: submission.assignment_id.toString(),
                workflow_state: submission.workflow_state,
                grade: submission.grade,
                score: submission.score,
                submitted_at: submission.submitted_at,
              }, {
                onConflict: 'user_id,canvas_assignment_id'
              })
          }
        }
      }
    }

    // Update last synced timestamp
    await supabaseClient
      .from('canvas_settings')
      .update({ last_synced_at: new Date().toISOString() })
      .eq('user_id', user.id)

    console.log(`Sync completed: ${canvasCourses.length} courses, ${totalAssignments} assignments`)

    return new Response(
      JSON.stringify({
        success: true,
        courses: canvasCourses.length,
        assignments: totalAssignments,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error syncing Canvas data:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
