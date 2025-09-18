import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  RefreshCw, 
  Target, 
  Sparkles, 
  Calendar,
  Trophy,
  Zap,
  Sun,
  Moon,
  Coffee,
  Music,
  Play,
  Pause,
  Square
} from 'lucide-react';

const MotivationCorner: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [exercisePhase, setExercisePhase] = useState<string>('');
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const motivationalQuotes = [
    {
      text: "The future depends on what you do today.",
      author: "Mahatma Gandhi",
      category: "Action"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Perseverance"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Passion"
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
      category: "Persistence"
    },
    {
      text: "The expert in anything was once a beginner.",
      author: "Helen Hayes",
      category: "Learning"
    },
    {
      text: "It always seems impossible until it's done.",
      author: "Nelson Mandela",
      category: "Achievement"
    },
    {
      text: "Your limitation—it's only your imagination.",
      author: "Unknown",
      category: "Mindset"
    },
    {
      text: "Study while others are sleeping; work while others are loafing; prepare while others are playing.",
      author: "William A. Ward",
      category: "Dedication"
    },
    {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
      category: "Education"
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
      category: "Learning"
    },
    {
      text: "Intelligence plus character—that is the goal of true education.",
      author: "Martin Luther King Jr.",
      category: "Education"
    },
    {
      text: "Success is where preparation and opportunity meet.",
      author: "Bobby Unser",
      category: "Preparation"
    },
    {
      text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
      author: "Brian Herbert",
      category: "Learning"
    },
    {
      text: "Knowledge is power. Information is liberating.",
      author: "Kofi Annan",
      category: "Knowledge"
    },
    {
      text: "The roots of education are bitter, but the fruit is sweet.",
      author: "Aristotle",
      category: "Education"
    },
    {
      text: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
      category: "Learning"
    },
    {
      text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      author: "Dr. Seuss",
      category: "Reading"
    },
    {
      text: "Success is the sum of small efforts repeated day in and day out.",
      author: "Robert Collier",
      category: "Consistency"
    },
    {
      text: "What we learn with pleasure we never forget.",
      author: "Alfred Mercier",
      category: "Learning"
    },
    {
      text: "An investment in knowledge pays the best interest.",
      author: "Benjamin Franklin",
      category: "Knowledge"
    },
    {
      text: "Study hard, for the well is deep, and our brains are shallow.",
      author: "Richard Baxter",
      category: "Study"
    },
    {
      text: "The expert in anything was once a beginner who refused to give up.",
      author: "Helen Hayes",
      category: "Perseverance"
    },
    {
      text: "Champions aren't made in the gyms. Champions are made from something deep inside them—a desire, a dream, a vision.",
      author: "Muhammad Ali",
      category: "Motivation"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
      category: "Belief"
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
      category: "Beginning"
    }
  ];

  const studyTips = [
    {
      icon: <Sun className="w-5 h-5 text-accent" />,
      title: "Morning Power Hour",
      tip: "Study your hardest subject first thing in the morning when your mind is fresh."
    },
    {
      icon: <Coffee className="w-5 h-5 text-warning" />,
      title: "Break Time Magic",
      tip: "Take 5-15 minute breaks every hour. Your brain needs time to process and consolidate information."
    },
    {
      icon: <Target className="w-5 h-5 text-success" />,
      title: "Goal Setting",
      tip: "Set specific, measurable goals for each study session. 'Read Chapter 3' is better than 'study biology'."
    },
    {
      icon: <Music className="w-5 h-5 text-primary" />,
      title: "Environment Matters",
      tip: "Create a dedicated study space. Your brain will associate this area with focus and learning."
    }
  ];

  const breathingExercises = [
    {
      name: "4-7-8 Breathing",
      description: "Inhale for 4, hold for 7, exhale for 8. Great for reducing anxiety before exams.",
      duration: "2-3 minutes",
      benefit: "Reduces stress",
      pattern: [
        { phase: "Inhale", duration: 4 },
        { phase: "Hold", duration: 7 },
        { phase: "Exhale", duration: 8 }
      ]
    },
    {
      name: "Box Breathing",
      description: "Inhale for 4, hold for 4, exhale for 4, hold for 4. Perfect for focus.",
      duration: "3-5 minutes", 
      benefit: "Improves focus",
      pattern: [
        { phase: "Inhale", duration: 4 },
        { phase: "Hold", duration: 4 },
        { phase: "Exhale", duration: 4 },
        { phase: "Hold", duration: 4 }
      ]
    },
    {
      name: "Simple Deep Breathing",
      description: "Take slow, deep breaths through your nose and out through your mouth.",
      duration: "1-2 minutes",
      benefit: "Quick energy boost",
      pattern: [
        { phase: "Inhale", duration: 4 },
        { phase: "Exhale", duration: 6 }
      ]
    }
  ];

  const positiveAffirmations = [
    "I am capable of learning anything I set my mind to.",
    "Every challenge makes me stronger and smarter.",
    "I choose progress over perfection.",
    "My efforts today are building my future success.",
    "I am growing my knowledge every single day.",
    "Mistakes are just learning opportunities in disguise.",
    "I have the power to achieve my academic goals.",
    "I am becoming more confident with each study session."
  ];

  const weeklyGoals = [
    { goal: "Complete all assignments", progress: 85 },
    { goal: "Study 20 hours", progress: 72 },
    { goal: "Exercise 3 times", progress: 67 },
    { goal: "Read for pleasure", progress: 40 }
  ];

  const [selectedAffirmation] = useState(
    positiveAffirmations[Math.floor(Math.random() * positiveAffirmations.length)]
  );

  const getNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => 
      (prevIndex + 1) % motivationalQuotes.length
    );
  };

  const startBreathingExercise = (exerciseIndex: number) => {
    if (activeExercise === exerciseIndex && isExerciseRunning) {
      // Stop the exercise
      setIsExerciseRunning(false);
      setActiveExercise(null);
      setExercisePhase('');
      setExerciseTimer(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    setActiveExercise(exerciseIndex);
    setIsExerciseRunning(true);
    startExerciseTimer(exerciseIndex);
  };

  const startExerciseTimer = (exerciseIndex: number) => {
    const exercise = breathingExercises[exerciseIndex];
    let currentPhaseIndex = 0;
    let phaseTimeLeft = exercise.pattern[currentPhaseIndex].duration;
    
    setExercisePhase(exercise.pattern[currentPhaseIndex].phase);
    setExerciseTimer(phaseTimeLeft);

    timerRef.current = setInterval(() => {
      phaseTimeLeft--;
      setExerciseTimer(phaseTimeLeft);

      if (phaseTimeLeft <= 0) {
        currentPhaseIndex = (currentPhaseIndex + 1) % exercise.pattern.length;
        phaseTimeLeft = exercise.pattern[currentPhaseIndex].duration;
        setExercisePhase(exercise.pattern[currentPhaseIndex].phase);
        setExerciseTimer(phaseTimeLeft);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const currentQuote = motivationalQuotes[currentQuoteIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Motivation Corner
        </h1>
        <p className="text-muted-foreground">
          Boost your energy and stay inspired on your learning journey
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Quote */}
          <Card className="shadow-medium bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Daily Inspiration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <blockquote className="text-xl italic text-foreground/90 border-l-4 border-primary pl-6">
                "{currentQuote.text}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">— {currentQuote.author}</p>
                  <Badge variant="outline" className="mt-1 border-primary/30 text-primary">
                    {currentQuote.category}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={getNextQuote}
                  className="border-primary/30 hover:bg-primary/5"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Quote
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Affirmation Card */}
          <Card className="shadow-soft bg-gradient-to-br from-accent/10 to-success/10 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                Your Daily Affirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <p className="text-lg font-medium text-accent mb-4">
                  {selectedAffirmation}
                </p>
                <p className="text-sm text-muted-foreground">
                  Read this out loud and believe in yourself! 💪
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Study Tips */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Study Success Tips
              </CardTitle>
              <CardDescription>
                Proven strategies to boost your learning effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.tip}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Breathing Exercises */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" />
                Quick Relaxation
              </CardTitle>
              <CardDescription>
                Breathing exercises to help you stay calm and focused
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {breathingExercises.map((exercise, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{exercise.name}</h4>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{exercise.duration}</Badge>
                      <Badge variant="secondary">{exercise.benefit}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                  
                  {activeExercise === index && isExerciseRunning && (
                    <div className="mb-4 p-3 bg-primary/5 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{exerciseTimer}</div>
                      <div className="text-lg font-medium text-primary/80 capitalize">{exercisePhase}</div>
                      <div className="text-xs text-muted-foreground mt-1">Follow the rhythm</div>
                    </div>
                  )}
                  
                  <Button 
                    variant={activeExercise === index && isExerciseRunning ? "destructive" : "outline"}
                    size="sm" 
                    className="w-full"
                    onClick={() => startBreathingExercise(index)}
                  >
                    {activeExercise === index && isExerciseRunning ? (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        Stop Exercise
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Exercise
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Goals Progress */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Weekly Goals
              </CardTitle>
              <CardDescription>
                Your progress this week
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyGoals.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.goal}</span>
                    <span className="text-sm text-muted-foreground">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievement Badge */}
          <Card className="shadow-soft bg-gradient-success text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Trophy className="w-5 h-5" />
                This Week's Achievement
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-bold mb-1">Focus Master</h3>
              <p className="text-white/90 text-sm">
                Completed 40+ focus sessions this week!
              </p>
            </CardContent>
          </Card>

          {/* Quick Mood Booster */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Mood Booster
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-3xl mb-2">🌟</div>
                <p className="text-sm font-medium">You're doing amazing!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Every study session brings you closer to your goals.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-accent/5 rounded">
                  <div className="text-lg">📚</div>
                  <p className="text-xs">Knowledge</p>
                </div>
                <div className="p-2 bg-success/5 rounded">
                  <div className="text-lg">💪</div>
                  <p className="text-xs">Strength</p>
                </div>
                <div className="p-2 bg-primary/5 rounded">
                  <div className="text-lg">🎯</div>
                  <p className="text-xs">Focus</p>
                </div>
                <div className="p-2 bg-warning/5 rounded">
                  <div className="text-lg">⚡</div>
                  <p className="text-xs">Energy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Streak */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">7</div>
              <p className="text-sm text-muted-foreground mb-3">Days in a row!</p>
              <p className="text-xs text-muted-foreground">
                Keep it up! Consistency is the key to success.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MotivationCorner;