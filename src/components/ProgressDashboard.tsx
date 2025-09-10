import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  Brain
} from 'lucide-react';

const ProgressDashboard: React.FC = () => {
  // Mock data for demonstration
  const weeklyData = {
    totalStudyTime: 18.5, // hours
    completedTasks: 24,
    focusSessions: 42,
    averageSessionLength: 26, // minutes
    mostProductiveDay: 'Wednesday',
    streakDays: 7
  };

  const subjectBreakdown = [
    { subject: 'Mathematics', hours: 5.5, color: 'bg-primary', percentage: 30 },
    { subject: 'English', hours: 4.2, color: 'bg-accent', percentage: 23 },
    { subject: 'Science', hours: 3.8, color: 'bg-success', percentage: 21 },
    { subject: 'History', hours: 3.0, color: 'bg-warning', percentage: 16 },
    { subject: 'Other', hours: 2.0, color: 'bg-muted', percentage: 10 }
  ];

  const weeklyGoals = [
    { goal: 'Study 20 hours', current: 18.5, target: 20, percentage: 92 },
    { goal: 'Complete 25 tasks', current: 24, target: 25, percentage: 96 },
    { goal: '45 focus sessions', current: 42, target: 45, percentage: 93 },
    { goal: 'Maintain 7-day streak', current: 7, target: 7, percentage: 100 }
  ];

  const achievements = [
    { title: 'First Week Complete', description: 'Completed your first week of studying', icon: '🎉', unlocked: true },
    { title: 'Focus Master', description: 'Completed 40+ focus sessions in a week', icon: '🎯', unlocked: true },
    { title: 'Early Bird', description: 'Started studying before 8 AM for 5 days', icon: '🌅', unlocked: false },
    { title: 'Marathon Runner', description: 'Study for 25+ hours in a week', icon: '🏃‍♂️', unlocked: false },
    { title: 'Perfectionist', description: 'Complete all assignments on time for a week', icon: '⭐', unlocked: false },
    { title: 'Knowledge Seeker', description: 'Use AI assistant 20+ times', icon: '🧠', unlocked: true }
  ];

  const dailyStudyTime = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 4.1 },
    { day: 'Thu', hours: 2.8 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 1.4 },
    { day: 'Sun', hours: 1.0 }
  ];

  const maxHours = Math.max(...dailyStudyTime.map(d => d.hours));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Progress Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your study habits and celebrate your achievements
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-primary text-white border-0 shadow-soft">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-white/80 mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1">{weeklyData.totalStudyTime}h</div>
            <p className="text-white/80 text-sm">Total Study Time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-white border-0 shadow-soft">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-white/80 mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1">{weeklyData.completedTasks}</div>
            <p className="text-white/80 text-sm">Tasks Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success text-white border-0 shadow-soft">
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 text-white/80 mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1">{weeklyData.focusSessions}</div>
            <p className="text-white/80 text-sm">Focus Sessions</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-soft">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1 text-primary">{weeklyData.streakDays}</div>
            <p className="text-muted-foreground text-sm">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Weekly Study Chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Weekly Study Time
              </CardTitle>
              <CardDescription>
                Your daily study hours for this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyStudyTime.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <Progress 
                        value={(day.hours / maxHours) * 100} 
                        className="h-6"
                      />
                    </div>
                    <div className="w-12 text-sm text-right">{day.hours}h</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Average per day:</span>
                    <span className="font-medium ml-2">
                      {(weeklyData.totalStudyTime / 7).toFixed(1)}h
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Most productive:</span>
                    <span className="font-medium ml-2">{weeklyData.mostProductiveDay}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Breakdown */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Subject Breakdown
              </CardTitle>
              <CardDescription>
                How you've distributed your study time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectBreakdown.map((subject, index) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <span className="text-sm text-muted-foreground">
                        {subject.hours}h ({subject.percentage}%)
                      </span>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals & Achievements Sidebar */}
        <div className="space-y-6">
          {/* Weekly Goals */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Weekly Goals
              </CardTitle>
              <CardDescription>
                Track your progress this week
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={goal.goal} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.goal}</span>
                    <Badge 
                      variant={goal.percentage === 100 ? "default" : "outline"}
                      className={goal.percentage === 100 ? "bg-success text-white" : ""}
                    >
                      {goal.percentage}%
                    </Badge>
                  </div>
                  <Progress value={goal.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {goal.current} / {goal.target}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Achievements
              </CardTitle>
              <CardDescription>
                Your study milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.title}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-success/10 border border-success/20' 
                      : 'bg-muted/50 opacity-60'
                  }`}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="outline" className="border-success text-success">
                      ✓
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Stats */}
          <Card className="shadow-soft bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">📊 Study Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Average session:</span>
                <span className="font-medium">{weeklyData.averageSessionLength} min</span>
              </div>
              <div className="flex justify-between">
                <span>Best day:</span>
                <span className="font-medium">{weeklyData.mostProductiveDay}</span>
              </div>
              <div className="flex justify-between">
                <span>Current streak:</span>
                <span className="font-medium">{weeklyData.streakDays} days</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Keep up the great work! You're {((weeklyData.totalStudyTime / 20) * 100).toFixed(0)}% 
                  to your weekly goal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;