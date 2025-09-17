import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useTimer } from '@/hooks/useTimer';
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

const PomodoroTimer: React.FC = () => {
  const {
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
  } = useTimer();

  const subjects = [
    'General Study',
    'Mathematics',
    'English',
    'Science',
    'History',
    'Foreign Language',
    'Other'
  ];

  const getSessionLabel = () => {
    switch (sessionType) {
      case 'work':
        return 'Focus Session';
      case 'short-break':
        return 'Short Break';
      case 'long-break':
        return 'Long Break';
      default:
        return 'Timer';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Pomodoro Timer
          </h1>
          <p className="text-muted-foreground">
            Stay focused with the proven Pomodoro Technique
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <Card className="p-8 text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className="text-3xl">{getSessionIcon()}</span>
                  <Badge variant="outline" className={`${getSessionColor()} text-lg px-4 py-2`}>
                    {getSessionLabel()}
                  </Badge>
                </div>
                
                {/* Timer Display */}
                <div className={`text-8xl font-bold mb-4 ${getSessionColor()}`}>
                  {formatTime(timeLeft)}
                </div>
                
                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-6">
                  <Progress 
                    value={getProgressPercentage()} 
                    className="h-4"
                  />
                </div>

                {/* Subject Selection (only show during work sessions) */}
                {sessionType === 'work' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      What are you studying?
                    </label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-full max-w-sm mx-auto">
                        <SelectValue />
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
                <div className="flex justify-center space-x-4 mb-8">
                  <Button
                    onClick={toggleTimer}
                    size="lg"
                    className="px-8 py-3"
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
                    className="px-8 py-3"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Session Type Buttons */}
                <div className="flex justify-center space-x-2">
                  <Button
                    onClick={() => switchSession('work')}
                    variant={sessionType === 'work' ? 'default' : 'outline'}
                    size="sm"
                  >
                    Work (25m)
                  </Button>
                  <Button
                    onClick={() => switchSession('short-break')}
                    variant={sessionType === 'short-break' ? 'default' : 'outline'}
                    size="sm"
                  >
                    Short Break (5m)
                  </Button>
                  <Button
                    onClick={() => switchSession('long-break')}
                    variant={sessionType === 'long-break' ? 'default' : 'outline'}
                    size="sm"
                  >
                    Long Break (15m)
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Today's Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sessions Completed</span>
                  <Badge variant="secondary">{sessionsCompleted}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Focus Time</span>
                  <Badge variant="secondary">{formatHours(totalFocusTime)}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Pomodoro Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Pomodoro Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Focus on one task at a time</li>
                  <li>• Take breaks seriously - they're important!</li>
                  <li>• Turn off distractions during work sessions</li>
                  <li>• After 4 sessions, take a longer break</li>
                  <li>• Use breaks to stretch and hydrate</li>
                </ul>
              </CardContent>
            </Card>

            {/* Session Lengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Session Lengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Work Session</span>
                  </div>
                  <span className="text-sm font-medium">25 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Coffee className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Short Break</span>
                  </div>
                  <span className="text-sm font-medium">5 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Coffee className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Long Break</span>
                  </div>
                  <span className="text-sm font-medium">15 minutes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;