import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import AssignmentTracker from "@/components/AssignmentTracker";
import PomodoroTimer from "@/components/PomodoroTimer";
import ProgressDashboard from "@/components/ProgressDashboard";
import AIAssistant from "@/components/AIAssistant";
import MotivationCorner from "@/components/MotivationCorner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentSection} />;
      case 'assignments':
        return <AssignmentTracker />;
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'progress':
        return <ProgressDashboard />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'motivation':
        return <MotivationCorner />;
      default:
        return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="min-h-screen bg-background">
                  <Navigation 
                    currentSection={currentSection} 
                    onNavigate={setCurrentSection} 
                  />
                  {renderCurrentSection()}
                </div>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
