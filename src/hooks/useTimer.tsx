import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface PomodoroSession {
  type: 'work' | 'short-break' | 'long-break';
  duration: number;
  completedAt: Date;
}

interface TimerContextType {
  timeLeft: number;
  isActive: boolean;
  sessionType: 'work' | 'short-break' | 'long-break';
  sessionsCompleted: number;
  totalFocusTime: number;
  selectedSubject: string;
  toggleTimer: () => void;
  resetTimer: () => void;
  switchSession: (type: 'work' | 'short-break' | 'long-break') => void;
  setSelectedSubject: (subject: string) => void;
  formatTime: (seconds: number) => string;
  formatHours: (seconds: number) => string;
  getProgressPercentage: () => number;
  getSessionColor: () => string;
  getSessionIcon: () => string;
  sessionDurations: Record<'work' | 'short-break' | 'long-break', number>;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('General Study');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sessionDurations = {
    work: 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      handleSessionComplete();
    }
  }, [timeLeft, isActive]);

  const handleSessionComplete = () => {
    setIsActive(false);
    
    if (sessionType === 'work') {
      setSessionsCompleted(prev => prev + 1);
      setTotalFocusTime(prev => prev + sessionDurations.work);
      
      toast({
        title: "Great Work! 🎉",
        description: "You completed a focus session. Time for a break!",
      });

      if ((sessionsCompleted + 1) % 4 === 0) {
        setSessionType('long-break');
        setTimeLeft(sessionDurations['long-break']);
      } else {
        setSessionType('short-break');
        setTimeLeft(sessionDurations['short-break']);
      }
    } else {
      toast({
        title: "Break Complete! ☕",
        description: "Ready to focus again?",
      });
      
      setSessionType('work');
      setTimeLeft(sessionDurations.work);
    }

    if ('Notification' in window) {
      new Notification(`${sessionType === 'work' ? 'Focus' : 'Break'} session complete!`);
    }
  };

  const toggleTimer = () => {
    if (!isActive) {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(sessionDurations[sessionType]);
  };

  const switchSession = (type: 'work' | 'short-break' | 'long-break') => {
    setIsActive(false);
    setSessionType(type);
    setTimeLeft(sessionDurations[type]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getProgressPercentage = () => {
    const totalDuration = sessionDurations[sessionType];
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  const getSessionColor = () => {
    switch (sessionType) {
      case 'work':
        return 'text-red-500';
      case 'short-break':
        return 'text-green-500';
      case 'long-break':
        return 'text-blue-500';
      default:
        return 'text-red-500';
    }
  };

  const getSessionIcon = () => {
    switch (sessionType) {
      case 'work':
        return '🍅';
      case 'short-break':
        return '☕';
      case 'long-break':
        return '🛋️';
      default:
        return '🍅';
    }
  };

  const value = {
    timeLeft,
    isActive,
    sessionType,
    sessionsCompleted,
    totalFocusTime,
    selectedSubject,
    toggleTimer,
    resetTimer,
    switchSession,
    setSelectedSubject,
    formatTime,
    formatHours,
    getProgressPercentage,
    getSessionColor,
    getSessionIcon,
    sessionDurations,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};