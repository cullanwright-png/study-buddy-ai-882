import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Grade {
  id: string;
  subject: string;
  grade: number;
  credits: number;
  semester: string;
}

const Grades = () => {
  const [grades, setGrades] = useState<Grade[]>([
    { id: '1', subject: 'Mathematics', grade: 92, credits: 4, semester: 'Fall 2024' },
    { id: '2', subject: 'Physics', grade: 88, credits: 4, semester: 'Fall 2024' },
    { id: '3', subject: 'Chemistry', grade: 95, credits: 3, semester: 'Fall 2024' },
    { id: '4', subject: 'English Literature', grade: 90, credits: 3, semester: 'Fall 2024' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    credits: '',
    semester: 'Fall 2024'
  });

  const calculateGPA = () => {
    if (grades.length === 0) return '0.00';
    const totalPoints = grades.reduce((sum, grade) => {
      const gradePoint = (grade.grade / 100) * 4;
      return sum + (gradePoint * grade.credits);
    }, 0);
    const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const calculateAverage = () => {
    if (grades.length === 0) return '0.0';
    const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
    return (total / grades.length).toFixed(1);
  };

  const getLetterGrade = (numGrade: number) => {
    if (numGrade >= 93) return 'A';
    if (numGrade >= 90) return 'A-';
    if (numGrade >= 87) return 'B+';
    if (numGrade >= 83) return 'B';
    if (numGrade >= 80) return 'B-';
    if (numGrade >= 77) return 'C+';
    if (numGrade >= 73) return 'C';
    if (numGrade >= 70) return 'C-';
    if (numGrade >= 67) return 'D+';
    if (numGrade >= 63) return 'D';
    if (numGrade >= 60) return 'D-';
    return 'F';
  };

  const getGradeBadgeColor = (numGrade: number) => {
    if (numGrade >= 90) return 'bg-green-500';
    if (numGrade >= 80) return 'bg-blue-500';
    if (numGrade >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGrade: Grade = {
      id: editingGrade?.id || Date.now().toString(),
      subject: formData.subject,
      grade: parseFloat(formData.grade),
      credits: parseInt(formData.credits),
      semester: formData.semester
    };

    if (editingGrade) {
      setGrades(grades.map(g => g.id === editingGrade.id ? newGrade : g));
    } else {
      setGrades([...grades, newGrade]);
    }

    resetForm();
  };

  const handleEdit = (grade: Grade) => {
    setEditingGrade(grade);
    setFormData({
      subject: grade.subject,
      grade: grade.grade.toString(),
      credits: grade.credits.toString(),
      semester: grade.semester
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setGrades(grades.filter(g => g.id !== id));
  };

  const resetForm = () => {
    setFormData({ subject: '', grade: '', credits: '', semester: 'Fall 2024' });
    setEditingGrade(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Academic Grades
            </h1>
            <p className="text-muted-foreground">Track your course grades and GPA</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white" onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Grade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingGrade ? 'Edit Grade' : 'Add New Grade'}</DialogTitle>
                  <DialogDescription>
                    {editingGrade ? 'Update the grade information' : 'Enter the details for the new grade'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject/Course</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Mathematics"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade (%)</Label>
                    <Input
                      id="grade"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      placeholder="e.g., 95"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.credits}
                      onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                      placeholder="e.g., 3"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                        <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                        <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                        <SelectItem value="Spring 2023">Spring 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-primary text-white">
                    {editingGrade ? 'Update' : 'Add'} Grade
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary/20 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>GPA</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {calculateGPA()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Out of 4.0</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-soft">
            <CardHeader>
              <CardTitle>Average Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {calculateAverage()}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {getLetterGrade(parseFloat(calculateAverage()))} Grade
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-soft">
            <CardHeader>
              <CardTitle>Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {grades.reduce((sum, g) => sum + g.credits, 0)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{grades.length} Courses</p>
            </CardContent>
          </Card>
        </div>

        {/* Grades List */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Course Grades</CardTitle>
            <CardDescription>Your current semester grades</CardDescription>
          </CardHeader>
          <CardContent>
            {grades.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No grades added yet. Start by adding your first course grade!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {grades.map((grade) => (
                  <div
                    key={grade.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{grade.subject}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {grade.credits} {grade.credits === 1 ? 'Credit' : 'Credits'}
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{grade.semester}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right mr-4">
                        <Badge className={`${getGradeBadgeColor(grade.grade)} text-white border-0`}>
                          {getLetterGrade(grade.grade)}
                        </Badge>
                        <p className="text-2xl font-bold mt-1">{grade.grade}%</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(grade)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(grade.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Grades;