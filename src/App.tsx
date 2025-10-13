import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import AssignmentTracker from "@/components/AssignmentTracker";
import PomodoroTimer from "@/components/PomodoroTimer";
import Grades from "@/components/Grades";
import ProgressDashboard from "@/components/ProgressDashboard";
import MotivationCorner from "@/components/MotivationCorner";
import Settings from "@/components/Settings";
import FloatingTimer from "@/components/FloatingTimer";
import Auth from "@/components/Auth";
import { TimerProvider, useTimer } from "@/hooks/useTimer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [showFloatingTimer, setShowFloatingTimer] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { isActive, timeLeft } = useTimer();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentSection} />;
      case 'assignments':
        return <AssignmentTracker />;
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'grades':
        return <Grades />;
      case 'progress':
        return <ProgressDashboard />;
      case 'motivation':
        return <MotivationCorner />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  // Show floating timer when not on timer page and timer is running or has been started
  const shouldShowFloatingTimer = currentSection !== 'pomodoro' && (isActive || timeLeft < 25 * 60) && showFloatingTimer;

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentSection={currentSection} 
        onNavigate={(section) => {
          // Show floating timer when leaving timer page if timer was started
          if (currentSection === 'pomodoro' && section !== 'pomodoro' && (isActive || timeLeft < 25 * 60)) {
            setShowFloatingTimer(true);
          }
          setCurrentSection(section);
        }} 
      />
      {renderCurrentSection()}
      
      {shouldShowFloatingTimer && (
        <FloatingTimer
          onClose={() => setShowFloatingTimer(false)}
          onMaximize={() => {
            setCurrentSection('pomodoro');
            setShowFloatingTimer(false);
          }}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <TimerProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppContent />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TimerProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
