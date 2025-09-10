import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Clock, 
  Coffee,
  Target,
  BarChart3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PomodoroSession {
  type: 'work' | 'short-break' | 'long-break';
  duration: number;
  completedAt: Date;
}

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('General Study');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sessionDurations = {
    work: 25 * 60, // 25 minutes
    'short-break': 5 * 60, // 5 minutes
    'long-break': 15 * 60, // 15 minutes
  };

  const subjects = [
    'General Study',
    'Mathematics',
    'English',
    'Science',
    'History',
    'Foreign Language',
    'Other'
  ];

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

      // Auto-switch to break
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
      
      // Auto-switch back to work
      setSessionType('work');
      setTimeLeft(sessionDurations.work);
    }

    // Play notification sound (you could add actual audio here)
    if ('Notification' in window) {
      new Notification(`${sessionType === 'work' ? 'Focus' : 'Break'} session complete!`);
    }
  };

  const toggleTimer = () => {
    if (!isActive) {
      // Request notification permission when starting first session
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
      case 'work': return 'primary';
      case 'short-break': return 'accent';
      case 'long-break': return 'success';
      default: return 'primary';
    }
  };

  const getSessionIcon = () => {
    switch (sessionType) {
      case 'work': return <Target className="w-6 h-6" />;
      case 'short-break': return <Coffee className="w-6 h-6" />;
      case 'long-break': return <Coffee className="w-6 h-6" />;
      default: return <Clock className="w-6 h-6" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Pomodoro Timer
        </h1>
        <p className="text-muted-foreground">
          Stay focused with the proven Pomodoro Technique
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Timer Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-medium">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {getSessionIcon()}
                <CardTitle className="text-2xl capitalize">
                  {sessionType.replace('-', ' ')} Session
                </CardTitle>
              </div>
              <CardDescription>
                {sessionType === 'work' 
                  ? `Studying: ${selectedSubject}`
                  : 'Take a well-deserved break'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-8">
              {/* Timer Display */}
              <div className="relative">
                <div className="text-8xl font-mono font-bold text-primary mb-4">
                  {formatTime(timeLeft)}
                </div>
                <Progress 
                  value={getProgressPercentage()} 
                  className="w-full h-3 mb-6"
                />
              </div>

              {/* Session Type Switcher */}
              <div className="flex justify-center space-x-2 mb-6">
                <Button
                  variant={sessionType === 'work' ? 'default' : 'outline'}
                  onClick={() => switchSession('work')}
                  disabled={isActive}
                  className={sessionType === 'work' ? 'bg-gradient-primary text-white' : ''}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Focus
                </Button>
                <Button
                  variant={sessionType === 'short-break' ? 'default' : 'outline'}
                  onClick={() => switchSession('short-break')}
                  disabled={isActive}
                  className={sessionType === 'short-break' ? 'bg-gradient-accent text-white' : ''}
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Short Break
                </Button>
                <Button
                  variant={sessionType === 'long-break' ? 'default' : 'outline'}
                  onClick={() => switchSession('long-break')}
                  disabled={isActive}
                  className={sessionType === 'long-break' ? 'bg-gradient-success text-white' : ''}
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Long Break
                </Button>
              </div>

              {/* Subject Selector */}
              {sessionType === 'work' && (
                <div className="max-w-xs mx-auto mb-6">
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={toggleTimer}
                  size="lg"
                  className={`${
                    isActive 
                      ? 'bg-gradient-accent' 
                      : 'bg-gradient-primary'
                  } text-white border-0 shadow-soft hover:shadow-medium px-8`}
                >
                  {isActive ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  size="lg"
                  disabled={isActive}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Today's Progress */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {sessionsCompleted}
                </div>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">
                  {formatHours(totalFocusTime)}
                </div>
                <p className="text-sm text-muted-foreground">Focus Time</p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span>Next Long Break:</span>
                  <span>{4 - (sessionsCompleted % 4)} sessions</span>
                </div>
                <Progress value={(sessionsCompleted % 4) * 25} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="shadow-soft bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">💡 Pomodoro Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>Remove all distractions before starting</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>Don't skip breaks - they help you stay fresh</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>If interrupted, consider restarting the session</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>Use breaks to stretch and hydrate</p>
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Session Lengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Focus Session:</span>
                <Badge variant="outline">25 minutes</Badge>
              </div>
              <div className="flex justify-between">
                <span>Short Break:</span>
                <Badge variant="outline">5 minutes</Badge>
              </div>
              <div className="flex justify-between">
                <span>Long Break:</span>
                <Badge variant="outline">15 minutes</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;