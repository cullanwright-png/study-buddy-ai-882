import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from 'lucide-react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface StudyFlashcardsProps {
  topic: string;
  onClose: () => void;
}

const StudyFlashcards: React.FC<StudyFlashcardsProps> = ({ topic, onClose }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());

  // Generate flashcards based on topic
  const generateFlashcards = (topic: string): Flashcard[] => {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('photosynthesis')) {
      return [
        {
          id: '1',
          question: 'What is the chemical equation for photosynthesis?',
          answer: '6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂',
          difficulty: 'medium'
        },
        {
          id: '2',
          question: 'Where does photosynthesis occur in plant cells?',
          answer: 'In the chloroplasts, specifically in the thylakoids and stroma',
          difficulty: 'easy'
        },
        {
          id: '3',
          question: 'What are the two main stages of photosynthesis?',
          answer: 'Light-dependent reactions (photo reactions) and light-independent reactions (Calvin cycle)',
          difficulty: 'medium'
        },
        {
          id: '4',
          question: 'What pigment is primarily responsible for capturing light energy?',
          answer: 'Chlorophyll a (with assistance from chlorophyll b and accessory pigments)',
          difficulty: 'easy'
        },
        {
          id: '5',
          question: 'What is the role of NADPH in photosynthesis?',
          answer: 'NADPH provides reducing power (electrons) for the Calvin cycle to convert CO₂ into glucose',
          difficulty: 'hard'
        }
      ];
    }
    
    if (topicLower.includes('quadratic')) {
      return [
        {
          id: '1',
          question: 'What is the standard form of a quadratic equation?',
          answer: 'ax² + bx + c = 0, where a ≠ 0',
          difficulty: 'easy'
        },
        {
          id: '2',
          question: 'What is the quadratic formula?',
          answer: 'x = (-b ± √(b²-4ac)) / 2a',
          difficulty: 'medium'
        },
        {
          id: '3',
          question: 'What does the discriminant tell you?',
          answer: 'b²-4ac determines the number of real solutions: positive = 2, zero = 1, negative = 0',
          difficulty: 'medium'
        },
        {
          id: '4',
          question: 'What is the vertex form of a quadratic?',
          answer: 'y = a(x-h)² + k, where (h,k) is the vertex',
          difficulty: 'hard'
        },
        {
          id: '5',
          question: 'How do you find the axis of symmetry?',
          answer: 'x = -b/2a (for standard form) or x = h (for vertex form)',
          difficulty: 'medium'
        }
      ];
    }

    // Default flashcards for any topic
    return [
      {
        id: '1',
        question: `What are the key concepts in ${topic}?`,
        answer: 'This would contain the main ideas and principles that define this topic.',
        difficulty: 'medium'
      },
      {
        id: '2',
        question: `What are common examples of ${topic}?`,
        answer: 'Real-world applications and examples that illustrate the concepts.',
        difficulty: 'easy'
      },
      {
        id: '3',
        question: `What are the advanced concepts in ${topic}?`,
        answer: 'More complex ideas that build upon the foundational knowledge.',
        difficulty: 'hard'
      }
    ];
  };

  const [flashcards] = useState<Flashcard[]>(generateFlashcards(topic));
  const currentCard = flashcards[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const markAsMastered = () => {
    setMasteredCards(prev => new Set([...prev, currentCard.id]));
    nextCard();
  };

  const markAsNeedsPractice = () => {
    setMasteredCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    nextCard();
  };

  const resetProgress = () => {
    setMasteredCards(new Set());
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{topic} - Flashcards</h2>
          <p className="text-muted-foreground">
            Card {currentCardIndex + 1} of {flashcards.length} • 
            {masteredCards.size} mastered
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetProgress}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Card 
          className={`w-full max-w-2xl h-80 cursor-pointer transition-transform hover:scale-105 ${
            isFlipped ? 'bg-gradient-to-br from-primary/5 to-accent/5' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <CardHeader className="text-center">
            <div className="flex justify-between items-center">
              <Badge className={getDifficultyColor(currentCard.difficulty)}>
                {currentCard.difficulty}
              </Badge>
              <Badge variant="outline">
                {masteredCards.has(currentCard.id) ? 'Mastered ✓' : 'Learning'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full text-center p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-muted-foreground">
                {isFlipped ? 'Answer' : 'Question'}
              </h3>
              <p className="text-xl leading-relaxed">
                {isFlipped ? currentCard.answer : currentCard.question}
              </p>
              <p className="text-sm text-muted-foreground">
                Click to {isFlipped ? 'see question' : 'reveal answer'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={prevCard}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        {isFlipped && (
          <>
            <Button variant="outline" onClick={markAsNeedsPractice} className="text-red-600">
              <X className="w-4 h-4 mr-2" />
              Need Practice
            </Button>
            <Button onClick={markAsMastered} className="text-green-600">
              <Check className="w-4 h-4 mr-2" />
              Mastered
            </Button>
          </>
        )}
        
        <Button variant="outline" onClick={nextCard}>
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${(masteredCards.size / flashcards.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StudyFlashcards;