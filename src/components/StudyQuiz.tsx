import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface StudyQuizProps {
  topic: string;
  onClose: () => void;
}

const StudyQuiz: React.FC<StudyQuizProps> = ({ topic, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Generate quiz questions based on topic
  const generateQuiz = (topic: string): QuizQuestion[] => {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('photosynthesis')) {
      return [
        {
          id: '1',
          question: 'What is the primary purpose of photosynthesis?',
          options: [
            'To produce oxygen for animals',
            'To convert light energy into chemical energy (glucose)',
            'To remove carbon dioxide from the atmosphere',
            'To create water for the plant'
          ],
          correctAnswer: 1,
          explanation: 'Photosynthesis converts light energy into chemical energy stored in glucose, which plants use for energy and growth.',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: 'In which part of the chloroplast do the light-dependent reactions occur?',
          options: [
            'Stroma',
            'Thylakoid membranes',
            'Outer membrane',
            'Intermembrane space'
          ],
          correctAnswer: 1,
          explanation: 'Light-dependent reactions occur in the thylakoid membranes where chlorophyll captures light energy.',
          difficulty: 'medium'
        },
        {
          id: '3',
          question: 'What is the role of the Calvin cycle in photosynthesis?',
          options: [
            'To capture light energy',
            'To produce ATP and NADPH',
            'To fix carbon dioxide into glucose',
            'To split water molecules'
          ],
          correctAnswer: 2,
          explanation: 'The Calvin cycle uses ATP and NADPH from light reactions to fix CO₂ into glucose through carbon fixation.',
          difficulty: 'hard'
        }
      ];
    }
    
    if (topicLower.includes('quadratic')) {
      return [
        {
          id: '1',
          question: 'What is the discriminant of the quadratic equation 2x² - 4x + 1 = 0?',
          options: ['12', '8', '4', '16'],
          correctAnswer: 1,
          explanation: 'Discriminant = b² - 4ac = (-4)² - 4(2)(1) = 16 - 8 = 8',
          difficulty: 'medium'
        },
        {
          id: '2',
          question: 'If the discriminant is negative, how many real solutions does the quadratic have?',
          options: ['0', '1', '2', 'Infinite'],
          correctAnswer: 0,
          explanation: 'A negative discriminant means there are no real solutions, only complex solutions.',
          difficulty: 'easy'
        },
        {
          id: '3',
          question: 'What is the vertex of y = 2(x - 3)² + 5?',
          options: ['(3, 5)', '(-3, 5)', '(3, -5)', '(-3, -5)'],
          correctAnswer: 0,
          explanation: 'In vertex form y = a(x - h)² + k, the vertex is (h, k) = (3, 5).',
          difficulty: 'medium'
        }
      ];
    }

    // Default quiz for any topic
    return [
      {
        id: '1',
        question: `What is a fundamental concept in ${topic}?`,
        options: [
          'Basic principle A',
          'Basic principle B', 
          'Basic principle C',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: `${topic} typically involves multiple interconnected concepts that work together.`,
        difficulty: 'easy'
      },
      {
        id: '2',
        question: `Which application best demonstrates ${topic}?`,
        options: [
          'Application example 1',
          'Application example 2',
          'Application example 3',
          'Depends on context'
        ],
        correctAnswer: 3,
        explanation: `The best application of ${topic} depends on the specific context and requirements.`,
        difficulty: 'medium'
      }
    ];
  };

  const [questions] = useState<QuizQuestion[]>(generateQuiz(topic));
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmitAnswer = () => {
    const answerIndex = parseInt(selectedAnswer);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setAnswers({});
    setQuizCompleted(false);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (quizCompleted) {
    const score = getScore();
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground">Here's how you did on {topic}</p>
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-primary">
              {score.percentage}%
            </CardTitle>
            <CardDescription>
              {score.correct} out of {score.total} questions correct
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-muted rounded-full h-4 mb-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all"
                style={{ width: `${score.percentage}%` }}
              />
            </div>
            <Badge variant={score.percentage >= 80 ? 'default' : score.percentage >= 60 ? 'secondary' : 'destructive'}>
              {score.percentage >= 80 ? 'Excellent!' : score.percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </Badge>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button onClick={handleRestartQuiz}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" onClick={onClose}>
            Back to Study Tools
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{topic} - Quiz</h2>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </Badge>
            <div className="w-full bg-muted rounded-full h-2 ml-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-xl font-medium leading-relaxed">
            {currentQuestion.question}
          </h3>

          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {option}
                </Label>
                {showResult && (
                  <div className="ml-2">
                    {index === currentQuestion.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : index === parseInt(selectedAnswer) ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>

          {showResult && (
            <Card className={`${
              parseInt(selectedAnswer) === currentQuestion.correctAnswer 
                ? 'border-green-200 bg-green-50' 
                : 'border-red-200 bg-red-50'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  {parseInt(selectedAnswer) === currentQuestion.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium mb-1">
                      {parseInt(selectedAnswer) === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2">
            {!showResult ? (
              <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyQuiz;