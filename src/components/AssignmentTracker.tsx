import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Calendar, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Filter,
  Search,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  type: 'homework' | 'test' | 'project' | 'quiz';
}

const AssignmentTracker: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Chapter 5 Math Problems',
      subject: 'Mathematics',
      description: 'Complete problems 1-25 from textbook',
      dueDate: '2024-01-15',
      priority: 'high',
      completed: false,
      type: 'homework'
    },
    {
      id: '2',
      title: 'English Essay Draft',
      subject: 'English',
      description: 'Write first draft of persuasive essay',
      dueDate: '2024-01-18',
      priority: 'medium',
      completed: false,
      type: 'project'
    },
    {
      id: '3',
      title: 'Science Lab Report',
      subject: 'Chemistry',
      description: 'Lab report on chemical reactions',
      dueDate: '2024-01-20',
      priority: 'low',
      completed: true,
      type: 'project'
    },
    {
      id: '4',
      title: 'History Quiz',
      subject: 'History',
      description: 'World War II timeline and events',
      dueDate: '2024-01-16',
      priority: 'medium',
      completed: false,
      type: 'quiz'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: '',
    subject: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    type: 'homework'
  });

  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const assignment: Assignment = {
      id: Date.now().toString(),
      title: newAssignment.title!,
      subject: newAssignment.subject!,
      description: newAssignment.description || '',
      dueDate: newAssignment.dueDate!,
      priority: newAssignment.priority as 'low' | 'medium' | 'high',
      type: newAssignment.type as 'homework' | 'test' | 'project' | 'quiz',
      completed: false
    };

    setAssignments([assignment, ...assignments]);
    setNewAssignment({
      title: '',
      subject: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      type: 'homework'
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Assignment Added! 📚",
      description: "Your assignment has been added to the tracker.",
    });
  };

  const handleToggleComplete = (id: string) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id 
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    ));
    
    const assignment = assignments.find(a => a.id === id);
    if (assignment && !assignment.completed) {
      toast({
        title: "Great job! 🎉",
        description: `You completed "${assignment.title}"`,
      });
    }
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setNewAssignment({
      title: assignment.title,
      subject: assignment.subject,
      description: assignment.description,
      dueDate: assignment.dueDate,
      priority: assignment.priority,
      type: assignment.type
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAssignment = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate || !editingAssignment) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedAssignment: Assignment = {
      ...editingAssignment,
      title: newAssignment.title!,
      subject: newAssignment.subject!,
      description: newAssignment.description || '',
      dueDate: newAssignment.dueDate!,
      priority: newAssignment.priority as 'low' | 'medium' | 'high',
      type: newAssignment.type as 'homework' | 'test' | 'project' | 'quiz'
    };

    setAssignments(assignments.map(assignment => 
      assignment.id === editingAssignment.id ? updatedAssignment : assignment
    ));

    setNewAssignment({
      title: '',
      subject: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      type: 'homework'
    });
    setEditingAssignment(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Assignment Updated! ✏️",
      description: "Your assignment has been successfully updated.",
    });
  };

  const handleDeleteAssignment = (id: string) => {
    const assignment = assignments.find(a => a.id === id);
    setAssignments(assignments.filter(assignment => assignment.id !== id));
    
    toast({
      title: "Assignment Deleted 🗑️",
      description: `"${assignment?.title}" has been removed from your tracker.`,
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'homework': return <BookOpen className="w-4 h-4" />;
      case 'test': return <AlertTriangle className="w-4 h-4" />;
      case 'project': return <Calendar className="w-4 h-4" />;
      case 'quiz': return <Clock className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesFilter = filterType === 'all' || assignment.type === filterType;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = assignments.filter(a => a.completed).length;
  const pendingCount = assignments.filter(a => !a.completed).length;
  const overdueCount = assignments.filter(a => !a.completed && getDaysUntilDue(a.dueDate) < 0).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Assignment Tracker
        </h1>
        <p className="text-muted-foreground mb-6">
          Stay organized and never miss a deadline again
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{assignments.length}</div>
              <p className="text-white/80 text-sm">Total Assignments</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-accent text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-white/80 text-sm">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-success text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-white/80 text-sm">Completed</p>
            </CardContent>
          </Card>
          <Card className={`${overdueCount > 0 ? 'bg-destructive' : 'bg-muted'} text-white border-0`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{overdueCount}</div>
              <p className="text-white/80 text-sm">Overdue</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="homework">Homework</SelectItem>
              <SelectItem value="test">Tests</SelectItem>
              <SelectItem value="project">Projects</SelectItem>
              <SelectItem value="quiz">Quizzes</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white border-0 shadow-soft hover:shadow-medium">
                <Plus className="w-4 h-4 mr-2" />
                Add Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Assignment</DialogTitle>
                <DialogDescription>
                  Keep track of your homework, tests, and projects
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Assignment title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics, English"
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Assignment details"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newAssignment.priority} 
                      onValueChange={(value) => setNewAssignment({...newAssignment, priority: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={newAssignment.type} 
                    onValueChange={(value) => setNewAssignment({...newAssignment, type: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homework">Homework</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddAssignment} className="w-full">
                  Add Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Assignment Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Assignment</DialogTitle>
                <DialogDescription>
                  Update your assignment details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title *</Label>
                  <Input
                    id="edit-title"
                    placeholder="Assignment title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-subject">Subject *</Label>
                  <Input
                    id="edit-subject"
                    placeholder="e.g., Mathematics, English"
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Assignment details"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-dueDate">Due Date *</Label>
                    <Input
                      id="edit-dueDate"
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-priority">Priority</Label>
                    <Select 
                      value={newAssignment.priority} 
                      onValueChange={(value) => setNewAssignment({...newAssignment, priority: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-type">Type</Label>
                  <Select 
                    value={newAssignment.type} 
                    onValueChange={(value) => setNewAssignment({...newAssignment, type: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homework">Homework</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleUpdateAssignment} className="w-full">
                  Update Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No assignments found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter'
                  : 'Add your first assignment to get started'
                }
              </p>
              {!searchTerm && filterType === 'all' && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Assignment
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredAssignments.map((assignment) => {
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            const isOverdue = daysUntilDue < 0 && !assignment.completed;
            const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0 && !assignment.completed;
            
            return (
              <Card 
                key={assignment.id} 
                className={`shadow-soft hover:shadow-medium transition-all ${
                  assignment.completed ? 'bg-muted/50' : ''
                } ${isOverdue ? 'border-destructive/50 bg-destructive/5' : ''} ${
                  isDueSoon ? 'border-warning/50 bg-warning/5' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={assignment.completed}
                      onCheckedChange={() => handleToggleComplete(assignment.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${
                          assignment.completed ? 'line-through text-muted-foreground' : ''
                        }`}>
                          {assignment.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {assignment.completed && (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          )}
                          <Badge variant={getPriorityColor(assignment.priority)}>
                            {assignment.priority}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditAssignment(assignment)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Assignment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{assignment.title}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteAssignment(assignment.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(assignment.type)}
                          <span className="capitalize">{assignment.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{assignment.subject}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
                          {isOverdue && (
                            <Badge variant="destructive" className="ml-2">
                              Overdue
                            </Badge>
                          )}
                          {isDueSoon && (
                            <Badge variant="default" className="ml-2 bg-warning text-warning-foreground">
                              Due Soon
                            </Badge>
                          )}
                        </div>
                      </div>
                      {assignment.description && (
                        <p className={`text-sm ${
                          assignment.completed ? 'text-muted-foreground' : 'text-foreground/80'
                        }`}>
                          {assignment.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AssignmentTracker;