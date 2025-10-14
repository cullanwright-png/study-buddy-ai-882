import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Target, BookOpen, Brain, Heart } from 'lucide-react';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Mock data for demonstration
  const stats = {
    todayAssignments: 3,
    studyTime: 2.5,
    completedTasks: 12,
    streakDays: 7
  };

  const upcomingAssignments = [
    { subject: 'Math', title: 'Chapter 5 Problems', due: 'Tomorrow', priority: 'high' },
    { subject: 'English', title: 'Essay Draft', due: 'Friday', priority: 'medium' },
    { subject: 'Science', title: 'Lab Report', due: 'Next Week', priority: 'low' }
  ];

  const motivationQuote = {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Welcome back, <span className="text-accent-light">Student</span>!
            </h1>
            <p className="text-xl mb-6 text-white/90">
              Ready to crush today's goals? You're on a {stats.streakDays}-day study streak! 
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => onNavigate('pomodoro')}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Clock className="mr-2 h-5 w-5" />
                Start Study Session
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => onNavigate('assignments')}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Calendar className="mr-2 h-5 w-5" />
                View Assignments
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-primary text-white border-0 shadow-soft">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Calendar className="h-8 w-8 text-white/80" />
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  Today
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.todayAssignments}</div>
              <p className="text-white/80">Assignments Due</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent text-white border-0 shadow-soft">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Clock className="h-8 w-8 text-white/80" />
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  Hours
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.studyTime}</div>
              <p className="text-white/80">Study Time Today</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-white border-0 shadow-soft">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Target className="h-8 w-8 text-white/80" />
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  Week
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stats.completedTasks}</div>
              <p className="text-white/80">Tasks Completed</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Heart className="h-8 w-8 text-primary" />
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Streak
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1 text-primary">{stats.streakDays}</div>
              <p className="text-muted-foreground">Days Strong</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Assignments */}
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Upcoming Assignments
              </CardTitle>
              <CardDescription>Stay on top of your deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-muted-foreground">{assignment.subject}</div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={assignment.priority === 'high' ? 'destructive' : 
                              assignment.priority === 'medium' ? 'default' : 'secondary'}
                      className="mb-1"
                    >
                      {assignment.due}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => onNavigate('assignments')}
              >
                View All Assignments
              </Button>
            </CardContent>
          </Card>

          {/* Study Timer */}
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Study Timer
              </CardTitle>
              <CardDescription>Focus with Pomodoro technique</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl font-mono font-bold text-primary">25:00</div>
              <p className="text-muted-foreground">Ready to start your next session?</p>
              <Button 
                className="w-full bg-gradient-primary text-white border-0 shadow-soft hover:shadow-medium"
                onClick={() => onNavigate('pomodoro')}
              >
                Start Pomodoro
              </Button>
            </CardContent>
          </Card>

          {/* Motivation Corner */}
          <Card className="shadow-soft hover:shadow-medium transition-all bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                Daily Motivation
              </CardTitle>
              <CardDescription>A boost for your study journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <blockquote className="italic text-foreground/80 border-l-4 border-accent pl-4">
                "{motivationQuote.text}"
              </blockquote>
              <p className="text-sm font-medium text-accent">— {motivationQuote.author}</p>
              <Button 
                variant="outline" 
                className="w-full border-accent/30 text-accent hover:bg-accent/10"
                onClick={() => onNavigate('motivation')}
              >
                Get More Motivation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;