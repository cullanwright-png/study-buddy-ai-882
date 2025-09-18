import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTimer } from '@/hooks/useTimer';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Clock, 
  Coffee,
  Target,
  BarChart3,
  Edit,
  Save,
  X
} from 'lucide-react';

const PomodoroTimer: React.FC = () => {
  const [isEditingDurations, setIsEditingDurations] = useState(false);
  const [tempDurations, setTempDurations] = useState({
    work: 25,
    'short-break': 5,
    'long-break': 15
  });
  
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
    updateSessionDuration,
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

  const handleEditDurations = () => {
    setTempDurations({
      work: Math.floor(sessionDurations.work / 60),
      'short-break': Math.floor(sessionDurations['short-break'] / 60),
      'long-break': Math.floor(sessionDurations['long-break'] / 60)
    });
    setIsEditingDurations(true);
  };

  const handleSaveDurations = () => {
    updateSessionDuration('work', tempDurations.work);
    updateSessionDuration('short-break', tempDurations['short-break']);
    updateSessionDuration('long-break', tempDurations['long-break']);
    setIsEditingDurations(false);
  };

  const handleCancelEdit = () => {
    setIsEditingDurations(false);
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
                    Work ({Math.floor(sessionDurations.work / 60)}m)
                  </Button>
                  <Button
                    onClick={() => switchSession('short-break')}
                    variant={sessionType === 'short-break' ? 'default' : 'outline'}
                    size="sm"
                  >
                    Short Break ({Math.floor(sessionDurations['short-break'] / 60)}m)
                  </Button>
                  <Button
                    onClick={() => switchSession('long-break')}
                    variant={sessionType === 'long-break' ? 'default' : 'outline'}
                    size="sm"
                  >
                    Long Break ({Math.floor(sessionDurations['long-break'] / 60)}m)
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
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Session Lengths</span>
                  </div>
                  {!isEditingDurations ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleEditDurations}
                      disabled={isActive}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleSaveDurations}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleCancelEdit}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!isEditingDurations ? (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Work Session</span>
                      </div>
                      <span className="text-sm font-medium">{Math.floor(sessionDurations.work / 60)} minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Coffee className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Short Break</span>
                      </div>
                      <span className="text-sm font-medium">{Math.floor(sessionDurations['short-break'] / 60)} minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Coffee className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Long Break</span>
                      </div>
                      <span className="text-sm font-medium">{Math.floor(sessionDurations['long-break'] / 60)} minutes</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="work-duration" className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span>Work Session (minutes)</span>
                      </Label>
                      <Input
                        id="work-duration"
                        type="number"
                        min="1"
                        max="120"
                        value={tempDurations.work}
                        onChange={(e) => setTempDurations(prev => ({
                          ...prev,
                          work: parseInt(e.target.value) || 1
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="short-break-duration" className="flex items-center space-x-2 text-sm">
                        <Coffee className="w-4 h-4 text-green-500" />
                        <span>Short Break (minutes)</span>
                      </Label>
                      <Input
                        id="short-break-duration"
                        type="number"
                        min="1"
                        max="30"
                        value={tempDurations['short-break']}
                        onChange={(e) => setTempDurations(prev => ({
                          ...prev,
                          'short-break': parseInt(e.target.value) || 1
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="long-break-duration" className="flex items-center space-x-2 text-sm">
                        <Coffee className="w-4 h-4 text-blue-500" />
                        <span>Long Break (minutes)</span>
                      </Label>
                      <Input
                        id="long-break-duration"
                        type="number"
                        min="1"
                        max="60"
                        value={tempDurations['long-break']}
                        onChange={(e) => setTempDurations(prev => ({
                          ...prev,
                          'long-break': parseInt(e.target.value) || 1
                        }))}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;