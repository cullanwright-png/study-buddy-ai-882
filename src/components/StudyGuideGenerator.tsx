import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Target, Lightbulb, CheckCircle } from 'lucide-react';

interface StudyGuide {
  overview: string;
  keyTerms: { term: string; definition: string }[];
  mainConcepts: { title: string; explanation: string; examples: string[] }[];
  studyTips: string[];
  practiceQuestions: string[];
  timeline: { week: number; topics: string[] }[];
}

interface StudyGuideGeneratorProps {
  topic: string;
  onClose: () => void;
}

const StudyGuideGenerator: React.FC<StudyGuideGeneratorProps> = ({ topic, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Generate comprehensive study guide based on topic
  const generateStudyGuide = (topic: string): StudyGuide => {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('photosynthesis')) {
      return {
        overview: "Photosynthesis is the fundamental process by which plants, algae, and some bacteria convert light energy into chemical energy (glucose) while producing oxygen as a byproduct. This process is crucial for life on Earth as it provides energy for most ecosystems and produces the oxygen we breathe.",
        keyTerms: [
          { term: "Chlorophyll", definition: "Green pigment that captures light energy in plants" },
          { term: "Chloroplasts", definition: "Organelles where photosynthesis occurs in plant cells" },
          { term: "Thylakoids", definition: "Membrane structures inside chloroplasts where light reactions occur" },
          { term: "Stroma", definition: "Fluid-filled space in chloroplasts where the Calvin cycle occurs" },
          { term: "ATP", definition: "Adenosine triphosphate - energy currency of cells" },
          { term: "NADPH", definition: "Electron carrier that provides reducing power for glucose synthesis" }
        ],
        mainConcepts: [
          {
            title: "Light-Dependent Reactions (Photo Reactions)",
            explanation: "These reactions capture light energy and convert it into chemical energy (ATP and NADPH) while splitting water molecules.",
            examples: [
              "Chlorophyll absorbs light photons",
              "Water is split: H₂O → ½O₂ + 2H⁺ + 2e⁻",
              "ATP and NADPH are produced for the Calvin cycle"
            ]
          },
          {
            title: "Light-Independent Reactions (Calvin Cycle)",
            explanation: "These reactions use ATP and NADPH to fix carbon dioxide into glucose through a series of enzyme-catalyzed reactions.",
            examples: [
              "CO₂ fixation by RuBisCO enzyme",
              "Glucose synthesis using ATP and NADPH",
              "Regeneration of RuBP to continue the cycle"
            ]
          },
          {
            title: "Overall Equation",
            explanation: "The complete photosynthesis reaction summarizes the inputs and outputs of the process.",
            examples: [
              "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
              "Inputs: Carbon dioxide, water, light energy",
              "Outputs: Glucose, oxygen"
            ]
          }
        ],
        studyTips: [
          "Draw the chloroplast structure and label where each reaction occurs",
          "Practice writing the chemical equation from memory",
          "Connect photosynthesis to cellular respiration - they're opposite processes",
          "Use acronyms: ATP = 'A Ton of Power', NADPH = 'Nice And Dandy Power House'",
          "Create a flowchart showing the pathway from light to glucose",
          "Remember: Light reactions need light, Calvin cycle doesn't (but needs ATP/NADPH from light reactions)"
        ],
        practiceQuestions: [
          "What would happen to photosynthesis if chlorophyll was removed?",
          "Why is water essential for photosynthesis beyond just being a reactant?",
          "How does the Calvin cycle continue in the dark if light reactions have stopped?",
          "Compare and contrast photosynthesis and cellular respiration",
          "What factors can limit the rate of photosynthesis?"
        ],
        timeline: [
          { week: 1, topics: ["Basic equation and overview", "Chloroplast structure"] },
          { week: 2, topics: ["Light-dependent reactions", "ATP and NADPH production"] },
          { week: 3, topics: ["Calvin cycle", "Carbon fixation process"] },
          { week: 4, topics: ["Factors affecting photosynthesis", "Practice problems"] }
        ]
      };
    }
    
    if (topicLower.includes('quadratic')) {
      return {
        overview: "Quadratic equations are polynomial equations of degree 2, typically written as ax² + bx + c = 0. They appear frequently in mathematics and real-world applications, from physics problems involving projectile motion to optimization problems in business and engineering.",
        keyTerms: [
          { term: "Standard Form", definition: "ax² + bx + c = 0, where a ≠ 0" },
          { term: "Vertex Form", definition: "y = a(x - h)² + k, where (h,k) is the vertex" },
          { term: "Discriminant", definition: "b² - 4ac, determines the number of real solutions" },
          { term: "Parabola", definition: "U-shaped curve that represents a quadratic function" },
          { term: "Vertex", definition: "The highest or lowest point on a parabola" },
          { term: "Axis of Symmetry", definition: "Vertical line that divides the parabola into two equal halves" }
        ],
        mainConcepts: [
          {
            title: "Quadratic Formula",
            explanation: "The universal method for solving any quadratic equation: x = (-b ± √(b²-4ac))/2a",
            examples: [
              "For 2x² - 4x + 1 = 0: x = (4 ± √(16-8))/4 = (4 ± √8)/4",
              "Always gives exact solutions when they exist",
              "Works for all quadratic equations"
            ]
          },
          {
            title: "Factoring Method",
            explanation: "Finding two binomials that multiply to give the original quadratic expression.",
            examples: [
              "x² - 5x + 6 = (x - 2)(x - 3)",
              "x² - 4 = (x + 2)(x - 2) [difference of squares]",
              "Only works when factors are rational numbers"
            ]
          },
          {
            title: "Completing the Square",
            explanation: "Converting standard form to vertex form by creating a perfect square trinomial.",
            examples: [
              "x² + 6x + 5 = (x + 3)² - 9 + 5 = (x + 3)² - 4",
              "Useful for finding vertex and graphing",
              "Foundation for deriving the quadratic formula"
            ]
          }
        ],
        studyTips: [
          "Memorize the quadratic formula - it's your safety net for any quadratic",
          "Check your discriminant first to know what to expect",
          "Practice identifying which method is most efficient for each problem",
          "Always verify solutions by substituting back into the original equation",
          "Graph quadratics to visualize the solutions",
          "Remember: if a > 0, parabola opens up; if a < 0, parabola opens down"
        ],
        practiceQuestions: [
          "Solve x² - 7x + 12 = 0 using three different methods",
          "Find the vertex of y = 2x² - 8x + 3 without graphing",
          "How many real solutions does 3x² + 2x + 5 = 0 have?",
          "A ball is thrown upward with equation h = -16t² + 32t + 6. When does it hit the ground?",
          "Find the quadratic equation with roots 3 and -5"
        ],
        timeline: [
          { week: 1, topics: ["Standard form", "Graphing parabolas", "Finding vertex"] },
          { week: 2, topics: ["Factoring method", "Zero product property"] },
          { week: 3, topics: ["Quadratic formula", "Discriminant analysis"] },
          { week: 4, topics: ["Completing the square", "Word problems", "Applications"] }
        ]
      };
    }

    // Default study guide for any topic
    return {
      overview: `This study guide covers the essential concepts and skills needed to master ${topic}. Focus on understanding the fundamental principles and their practical applications.`,
      keyTerms: [
        { term: "Key Concept 1", definition: `Primary principle in ${topic}` },
        { term: "Key Concept 2", definition: `Secondary principle in ${topic}` },
        { term: "Application", definition: `How ${topic} is used in practice` }
      ],
      mainConcepts: [
        {
          title: "Fundamental Principles",
          explanation: `The core ideas that define ${topic} and its scope.`,
          examples: ["Basic example 1", "Basic example 2", "Basic example 3"]
        },
        {
          title: "Advanced Applications",
          explanation: `How the fundamental principles are applied in complex scenarios.`,
          examples: ["Advanced example 1", "Advanced example 2", "Advanced example 3"]
        }
      ],
      studyTips: [
        `Start with understanding the basic vocabulary of ${topic}`,
        "Practice with simple examples before moving to complex problems",
        "Connect new concepts to things you already know",
        "Test yourself regularly to identify gaps in understanding"
      ],
      practiceQuestions: [
        `What are the main components of ${topic}?`,
        `How does ${topic} relate to other subjects you've studied?`,
        `What are some real-world applications of ${topic}?`
      ],
      timeline: [
        { week: 1, topics: ["Introduction and basic concepts"] },
        { week: 2, topics: ["Core principles and methods"] },
        { week: 3, topics: ["Applications and problem-solving"] },
        { week: 4, topics: ["Review and advanced topics"] }
      ]
    };
  };

  const [studyGuide] = useState<StudyGuide>(generateStudyGuide(topic));

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{topic} - Study Guide</h2>
          <p className="text-muted-foreground">Comprehensive study materials and learning pathway</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="terms">Key Terms</TabsTrigger>
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="tips">Study Tips</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Topic Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{studyGuide.overview}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="w-8 h-8 mx-auto text-primary mb-2" />
                <h3 className="font-semibold mb-1">Key Terms</h3>
                <p className="text-2xl font-bold text-primary">{studyGuide.keyTerms.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Lightbulb className="w-8 h-8 mx-auto text-accent mb-2" />
                <h3 className="font-semibold mb-1">Main Concepts</h3>
                <p className="text-2xl font-bold text-accent">{studyGuide.mainConcepts.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="w-8 h-8 mx-auto text-success mb-2" />
                <h3 className="font-semibold mb-1">Study Weeks</h3>
                <p className="text-2xl font-bold text-success">{studyGuide.timeline.length}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Terms & Definitions</CardTitle>
              <CardDescription>Essential vocabulary for mastering {topic}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyGuide.keyTerms.map((term, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => toggleCheck(`term-${index}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary mb-1">{term.term}</h4>
                      <p className="text-muted-foreground">{term.definition}</p>
                    </div>
                    {checkedItems.has(`term-${index}`) && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          {studyGuide.mainConcepts.map((concept, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {concept.title}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCheck(`concept-${index}`)}
                  >
                    {checkedItems.has(`concept-${index}`) ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{concept.explanation}</p>
                <div>
                  <h4 className="font-medium mb-2">Examples:</h4>
                  <ul className="space-y-1">
                    {concept.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Study Tips & Strategies
              </CardTitle>
              <CardDescription>Proven techniques to master {topic} effectively</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {studyGuide.studyTips.map((tip, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCheck(`tip-${index}`)}
                >
                  <span className="text-yellow-500 font-bold text-lg">💡</span>
                  <p className="flex-1">{tip}</p>
                  {checkedItems.has(`tip-${index}`) && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Practice Questions</CardTitle>
              <CardDescription>Test your understanding with these questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {studyGuide.practiceQuestions.map((question, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCheck(`question-${index}`)}
                >
                  <div className="flex items-start justify-between">
                    <p className="flex-1">{question}</p>
                    {checkedItems.has(`question-${index}`) && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {studyGuide.timeline.length}-Week Study Timeline
              </CardTitle>
              <CardDescription>Structured learning pathway for {topic}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyGuide.timeline.map((week, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCheck(`week-${index}`)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-primary">Week {week.week}</h4>
                    {checkedItems.has(`week-${index}`) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <ul className="space-y-1">
                    {week.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center gap-2 text-sm">
                        <span className="text-primary">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Study Progress</h3>
                <div className="w-full bg-muted rounded-full h-3 mb-2">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ 
                      width: `${(checkedItems.size / (
                        studyGuide.keyTerms.length + 
                        studyGuide.mainConcepts.length + 
                        studyGuide.studyTips.length + 
                        studyGuide.practiceQuestions.length + 
                        studyGuide.timeline.length
                      )) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {checkedItems.size} items completed
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyGuideGenerator;