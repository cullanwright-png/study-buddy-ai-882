import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Calendar, 
  Clock, 
  BarChart3, 
  Brain, 
  Heart,
  Settings,
  Menu,
  X,
  GraduationCap,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'assignments', label: 'Assignments', icon: Calendar, badge: '3' },
    { id: 'pomodoro', label: 'Study Timer', icon: Clock, badge: null },
    { id: 'grades', label: 'Grades', icon: GraduationCap, badge: null },
    { id: 'progress', label: 'Progress', icon: BarChart3, badge: null },
    { id: 'motivation', label: 'Motivation', icon: Heart, badge: null },
    { id: 'settings', label: 'Customize', icon: Settings, badge: null },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  StudyBuddy
                </h1>
                <p className="text-xs text-muted-foreground">Your Academic Companion</p>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "relative h-10 px-4 transition-all",
                      isActive 
                        ? "bg-gradient-primary text-white shadow-soft" 
                        : "hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "secondary" : "outline"} 
                        className={cn(
                          "ml-2 text-xs h-5 px-1.5",
                          isActive 
                            ? "bg-white/20 text-white border-0" 
                            : "border-primary/30 text-primary"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Dark Mode Toggle & Help Button */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:bg-primary/10 hover:text-primary"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 mr-2" />
                ) : (
                  <Moon className="w-4 h-4 mr-2" />
                )}
                {theme === 'dark' ? 'Light' : 'Dark'}
              </Button>
              <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Welcome to StudyBuddy!</DialogTitle>
                    <DialogDescription>
                      Your complete academic companion for managing assignments, studying efficiently, and tracking your progress.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh] pr-4">
                    <div className="space-y-6">
                      {/* Features Section */}
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Features</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-sm flex items-center gap-2">
                              <Home className="w-4 h-4 text-primary" />
                              Dashboard
                            </p>
                            <p className="text-sm text-muted-foreground ml-6">Your home base with an overview of upcoming assignments, study streaks, and quick stats.</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              Assignments
                            </p>
                            <p className="text-sm text-muted-foreground ml-6">Track all your assignments, mark them complete, and never miss a deadline.</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              Study Timer
                            </p>
                            <p className="text-sm text-muted-foreground ml-6">Use the Pomodoro technique to study in focused 25-minute intervals with breaks.</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-primary" />
                              Grades
                            </p>
                            <p className="text-sm text-muted-foreground ml-6">View all your grades synced from Canvas and track your academic performance.</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-primary" />
                              Progress
                            </p>
                            <p className="text-sm text-muted-foreground ml-6">Visualize your study patterns, assignment completion rates, and productivity trends.</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm flex items-center gap-2">
                              <Heart className="w-4 h-4 text-primary" />
                              Motivation
                            </p>
                            <p className="text-sm text-muted-foreground ml-6">Daily motivational quotes and encouragement to keep you inspired.</p>
                          </div>
                        </div>
                      </div>

                      {/* Canvas Integration Section */}
                      <div className="pt-4 border-t">
                        <h3 className="font-semibold text-lg mb-3">Linking Your Canvas Account</h3>
                        <div className="space-y-3 text-sm">
                          <p className="text-muted-foreground">
                            Connect your Canvas LMS account to automatically sync your assignments and grades:
                          </p>
                          <ol className="space-y-2 ml-4 list-decimal text-muted-foreground">
                            <li>Go to the <strong className="text-foreground">Customize</strong> section in the navigation</li>
                            <li>Find the <strong className="text-foreground">Canvas Integration</strong> card</li>
                            <li>Enter your Canvas institution URL (e.g., school.instructure.com)</li>
                            <li>Generate an API token from your Canvas account:
                              <ul className="ml-6 mt-1 list-disc">
                                <li>Go to Canvas → Account → Settings</li>
                                <li>Scroll to "Approved Integrations"</li>
                                <li>Click "+ New Access Token"</li>
                                <li>Copy the token and paste it into StudyBuddy</li>
                              </ul>
                            </li>
                            <li>Click <strong className="text-foreground">Save Settings</strong></li>
                            <li>Use the <strong className="text-foreground">Sync Now</strong> button to fetch your latest data</li>
                          </ol>
                          <p className="text-muted-foreground mt-3">
                            Once connected, your assignments and grades will automatically appear in the app!
                          </p>
                        </div>
                      </div>

                      {/* Tips Section */}
                      <div className="pt-4 border-t">
                        <h3 className="font-semibold text-lg mb-3">Pro Tips</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground ml-4 list-disc">
                          <li>Use the floating timer to keep your Pomodoro session visible while working on other tabs</li>
                          <li>Check your dashboard daily to stay on top of upcoming deadlines</li>
                          <li>Sync Canvas regularly to ensure your assignments are up to date</li>
                          <li>Build a study streak to stay motivated and consistent</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                StudyBuddy
              </h1>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-border shadow-medium">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full justify-start h-12",
                      isActive 
                        ? "bg-gradient-primary text-white" 
                        : ""
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "secondary" : "outline"} 
                        className={cn(
                          "ml-auto text-xs",
                          isActive 
                            ? "bg-white/20 text-white border-0" 
                            : "border-primary/30 text-primary"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
              
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full justify-start h-12 hover:bg-primary/10 hover:text-primary"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 mr-3" />
                  ) : (
                    <Moon className="w-5 h-5 mr-3" />
                  )}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-12 hover:bg-primary/10 hover:text-primary"
                    >
                      <HelpCircle className="w-5 h-5 mr-3" />
                      Help
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;