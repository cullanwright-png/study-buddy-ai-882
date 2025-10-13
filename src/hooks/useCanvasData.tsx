import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface CanvasCourse {
  id: string;
  canvas_course_id: string;
  name: string;
  course_code: string | null;
  start_at: string | null;
  end_at: string | null;
}

export interface CanvasAssignment {
  id: string;
  canvas_assignment_id: string;
  canvas_course_id: string;
  name: string;
  description: string | null;
  due_at: string | null;
  points_possible: number | null;
  submission_types: string[] | null;
}

export interface CanvasSubmission {
  id: string;
  canvas_assignment_id: string;
  workflow_state: string | null;
  grade: string | null;
  score: number | null;
  submitted_at: string | null;
}

export interface CanvasSettings {
  id: string;
  canvas_url: string;
  last_synced_at: string | null;
}

export const useCanvasSettings = () => {
  return useQuery({
    queryKey: ['canvas-settings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('canvas_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data as CanvasSettings | null;
    },
  });
};

export const useCanvasCourses = () => {
  return useQuery({
    queryKey: ['canvas-courses'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('canvas_courses')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (error) throw error;
      return data as CanvasCourse[];
    },
  });
};

export const useCanvasAssignments = () => {
  return useQuery({
    queryKey: ['canvas-assignments'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('canvas_assignments')
        .select('*')
        .eq('user_id', user.id)
        .order('due_at', { ascending: true, nullsFirst: false });

      if (error) throw error;
      return data as CanvasAssignment[];
    },
  });
};

export const useCanvasSubmissions = () => {
  return useQuery({
    queryKey: ['canvas-submissions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('canvas_submissions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data as CanvasSubmission[];
    },
  });
};

export const useSaveCanvasSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (canvasUrl: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('canvas_settings')
        .upsert({
          user_id: user.id,
          canvas_url: canvasUrl,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canvas-settings'] });
      toast({
        title: 'Settings Saved',
        description: 'Canvas settings have been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to save settings: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};

export const useSyncCanvas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('sync-canvas', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['canvas-courses'] });
      queryClient.invalidateQueries({ queryKey: ['canvas-assignments'] });
      queryClient.invalidateQueries({ queryKey: ['canvas-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['canvas-settings'] });
      
      toast({
        title: 'Sync Complete! 🎉',
        description: `Synced ${data.courses} courses and ${data.assignments} assignments from Canvas.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Sync Failed',
        description: `Failed to sync Canvas data: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};
