import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  MessageCircle, 
  BookOpen, 
  FileText, 
  HelpCircle,
  Send,
  Lightbulb,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: "Hi! I'm your AI study assistant. I can help you with explanations, create study materials, or answer questions. What would you like to learn about today?",
      timestamp: new Date()
    }
  ]);

  const [studyTopic, setStudyTopic] = useState('');
  const [notesContent, setNotesContent] = useState('');

  const quickPrompts = [
    { 
      text: "Explain photosynthesis in simple terms", 
      category: "Science",
      icon: <BookOpen className="w-4 h-4" />
    },
    { 
      text: "Help me understand quadratic equations", 
      category: "Math",
      icon: <Target className="w-4 h-4" />
    },
    { 
      text: "Create a study schedule for my exams", 
      category: "Planning",
      icon: <Clock className="w-4 h-4" />
    },
    { 
      text: "Summarize the causes of World War II", 
      category: "History",
      icon: <FileText className="w-4 h-4" />
    }
  ];

  const studyTools = [
    {
      title: "Flashcards Generator",
      description: "Turn your notes into interactive flashcards",
      icon: <Zap className="w-6 h-6 text-accent" />,
      action: "Generate Flashcards"
    },
    {
      title: "Quiz Creator",
      description: "Test your knowledge with custom quizzes",
      icon: <HelpCircle className="w-6 h-6 text-primary" />,
      action: "Create Quiz"
    },
    {
      title: "Study Guide",
      description: "Get a comprehensive study guide for any topic",
      icon: <FileText className="w-6 h-6 text-success" />,
      action: "Make Study Guide"
    },
    {
      title: "Concept Explainer",
      description: "Break down complex topics into simple explanations",
      icon: <Lightbulb className="w-6 h-6 text-warning" />,
      action: "Explain Concept"
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, newUserMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: generateAIResponse(chatMessage),
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, botResponse]);
    }, 1000);

    setChatMessage('');
  };

  const generateAIResponse = (question: string) => {
    // Simple mock responses - in real app this would connect to an AI API
    if (question.toLowerCase().includes('photosynthesis')) {
      return "Photosynthesis is how plants make their own food! Think of it like cooking with sunlight. Plants take in carbon dioxide from the air, water from their roots, and use sunlight as energy to create glucose (sugar) and oxygen. The equation is: 6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂. The chloroplasts in leaves are like tiny solar-powered kitchens doing this amazing process!";
    }
    
    if (question.toLowerCase().includes('quadratic')) {
      return "Quadratic equations have the form ax² + bx + c = 0. Think of them as U-shaped curves called parabolas! The quadratic formula x = (-b ± √(b²-4ac))/2a helps you find where the parabola crosses the x-axis. Here's a tip: the discriminant (b²-4ac) tells you how many solutions you'll get. Positive = 2 solutions, zero = 1 solution, negative = no real solutions.";
    }

    if (question.toLowerCase().includes('schedule') || question.toLowerCase().includes('plan')) {
      return "Great idea! Here's a study schedule framework: 1) List all your subjects and upcoming exams 2) Prioritize by difficulty and exam dates 3) Use time-blocking: assign specific hours to each subject 4) Include breaks every 25-50 minutes 5) Review sessions before each exam 6) Keep one day for catch-up. Would you like me to help create a specific schedule for your subjects?";
    }

    return "That's a great question! I'd love to help you understand this better. Could you provide a bit more context about what specifically you'd like to know? I can explain concepts, create study materials, or help with problem-solving strategies.";
  };

  const handleQuickPrompt = (prompt: string) => {
    setChatMessage(prompt);
    handleSendMessage();
  };

  const handleToolAction = (toolTitle: string) => {
    toast({
      title: `${toolTitle} Coming Soon! 🚀`,
      description: "This feature is being developed to make your studying even more effective.",
    });
  };

  const handleGenerateStudyMaterial = (type: string) => {
    if (!studyTopic.trim()) {
      toast({
        title: "Enter a Topic",
        description: "Please enter a topic to generate study materials for.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: `${type} Generated! 📚`,
      description: `Study materials for "${studyTopic}" are ready.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          AI Study Assistant
        </h1>
        <p className="text-muted-foreground">
          Your personal tutor powered by artificial intelligence
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Chat Assistant
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Study Tools
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Materials
          </TabsTrigger>
        </TabsList>

        {/* Chat Assistant */}
        <TabsContent value="chat" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="shadow-soft h-96">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Chat with AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
                    {chatHistory.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-white shadow-soft border'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything about your studies..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Questions</CardTitle>
                  <CardDescription>
                    Try these example prompts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="w-full justify-start h-auto p-3 text-left"
                    >
                      <div className="flex items-start gap-2">
                        {prompt.icon}
                        <div>
                          <Badge variant="secondary" className="mb-1">
                            {prompt.category}
                          </Badge>
                          <p className="text-xs">{prompt.text}</p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Study Tools */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {studyTools.map((tool, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {tool.icon}
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleToolAction(tool.title)}
                    className="w-full"
                    variant="outline"
                  >
                    {tool.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-soft bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">💡 How AI Can Help You Study</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Concept Explanation</h4>
                <p className="text-muted-foreground">Break down complex topics into understandable parts</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Practice Problems</h4>
                <p className="text-muted-foreground">Generate practice questions for any subject</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Study Strategies</h4>
                <p className="text-muted-foreground">Get personalized study recommendations</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Quick Answers</h4>
                <p className="text-muted-foreground">Get instant help when you're stuck</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generate Materials */}
        <TabsContent value="generate" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Generate Study Materials
              </CardTitle>
              <CardDescription>
                Enter a topic to create custom study materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Study Topic</label>
                <Input
                  placeholder="e.g., The French Revolution, Cellular Respiration, Calculus Derivatives"
                  value={studyTopic}
                  onChange={(e) => setStudyTopic(e.target.value)}
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => handleGenerateStudyMaterial('Summary')}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <FileText className="w-6 h-6 mb-1 text-primary" />
                  <span>Generate Summary</span>
                </Button>
                <Button 
                  onClick={() => handleGenerateStudyMaterial('Flashcards')}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Zap className="w-6 h-6 mb-1 text-accent" />
                  <span>Create Flashcards</span>
                </Button>
                <Button 
                  onClick={() => handleGenerateStudyMaterial('Quiz')}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <HelpCircle className="w-6 h-6 mb-1 text-success" />
                  <span>Make Quiz</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Study Notes Enhancement</CardTitle>
              <CardDescription>
                Paste your notes and I'll enhance them with explanations and examples
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your study notes here..."
                value={notesContent}
                onChange={(e) => setNotesContent(e.target.value)}
                className="min-h-32"
              />
              <Button 
                onClick={() => toast({
                  title: "Notes Enhanced! ✨",
                  description: "Your notes have been improved with additional explanations.",
                })}
                disabled={!notesContent.trim()}
                className="w-full"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Enhance My Notes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistant;