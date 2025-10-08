-- Create tables for Canvas integration

-- Canvas courses table
CREATE TABLE public.canvas_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  canvas_course_id TEXT NOT NULL,
  name TEXT NOT NULL,
  course_code TEXT,
  start_at TIMESTAMP WITH TIME ZONE,
  end_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, canvas_course_id)
);

-- Canvas assignments table
CREATE TABLE public.canvas_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  canvas_assignment_id TEXT NOT NULL,
  canvas_course_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  due_at TIMESTAMP WITH TIME ZONE,
  points_possible NUMERIC,
  submission_types TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, canvas_assignment_id)
);

-- Canvas submissions table
CREATE TABLE public.canvas_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  canvas_assignment_id TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE,
  score NUMERIC,
  grade TEXT,
  workflow_state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, canvas_assignment_id)
);

-- Canvas settings table to store user's Canvas configuration
CREATE TABLE public.canvas_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  canvas_url TEXT NOT NULL,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.canvas_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canvas_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canvas_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canvas_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for canvas_courses
CREATE POLICY "Users can view their own courses"
  ON public.canvas_courses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own courses"
  ON public.canvas_courses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own courses"
  ON public.canvas_courses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own courses"
  ON public.canvas_courses FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for canvas_assignments
CREATE POLICY "Users can view their own assignments"
  ON public.canvas_assignments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assignments"
  ON public.canvas_assignments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assignments"
  ON public.canvas_assignments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assignments"
  ON public.canvas_assignments FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for canvas_submissions
CREATE POLICY "Users can view their own submissions"
  ON public.canvas_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON public.canvas_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
  ON public.canvas_submissions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own submissions"
  ON public.canvas_submissions FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for canvas_settings
CREATE POLICY "Users can view their own settings"
  ON public.canvas_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON public.canvas_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON public.canvas_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings"
  ON public.canvas_settings FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_canvas_courses_updated_at
  BEFORE UPDATE ON public.canvas_courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_canvas_assignments_updated_at
  BEFORE UPDATE ON public.canvas_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_canvas_submissions_updated_at
  BEFORE UPDATE ON public.canvas_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_canvas_settings_updated_at
  BEFORE UPDATE ON public.canvas_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();