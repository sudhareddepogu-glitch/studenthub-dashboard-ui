import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  MessageSquare, 
  Send, 
  Star, 
  BookOpen, 
  Users, 
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const feedbackCategories = [
  { id: 'course', label: 'Course Content', icon: BookOpen },
  { id: 'faculty', label: 'Faculty', icon: Users },
  { id: 'event', label: 'Events', icon: Calendar },
  { id: 'facility', label: 'Facilities', icon: AlertTriangle },
  { id: 'general', label: 'General', icon: MessageSquare }
];

const myFeedback = [
  {
    id: 1,
    title: 'Machine Learning Course - Week 5 Content',
    category: 'course',
    subject: 'Machine Learning (CS 4701)',
    rating: 4,
    content: 'The neural network module was excellent, but I think we need more hands-on coding exercises. The theoretical content is great, but practical implementation would help solidify concepts.',
    date: 'Sept 10, 2024',
    status: 'reviewed',
    response: 'Thank you for your feedback! We\'re adding more coding labs starting next week.',
    likes: 8,
    helpful: true
  },
  {
    id: 2,
    title: 'Career Fair Organization',
    category: 'event',
    subject: 'Fall Career Fair 2024',
    rating: 3,
    content: 'The career fair was good overall, but the venue was too crowded. Consider splitting into multiple days or using a larger space. Also, more tech companies would be appreciated.',
    date: 'Sept 5, 2024',
    status: 'pending',
    response: null,
    likes: 15,
    helpful: false
  },
  {
    id: 3,
    title: 'Library Study Spaces',
    category: 'facility',
    subject: 'Central Library',
    rating: 5,
    content: 'The new study pods are fantastic! Great for group work and the noise isolation is perfect. Thank you for listening to student feedback and implementing these changes.',
    date: 'Aug 28, 2024',
    status: 'reviewed',
    response: 'We\'re thrilled you\'re enjoying the new study spaces!',
    likes: 23,
    helpful: true
  }
];

const recentFeedback = [
  {
    id: 4,
    title: 'Database Systems Lab Equipment',
    category: 'course',
    author: 'Anonymous',
    rating: 2,
    preview: 'The lab computers are outdated and slow. It\'s affecting our ability to complete assignments efficiently...',
    date: '2h ago',
    likes: 12,
    comments: 3
  },
  {
    id: 5,
    title: 'Professor Johnson\'s Teaching Style',
    category: 'faculty',
    author: 'Anonymous',
    rating: 5,
    preview: 'Excellent teaching methodology and very approachable. Makes complex topics easy to understand...',
    date: '5h ago',
    likes: 28,
    comments: 7
  },
  {
    id: 6,
    title: 'Cafeteria Food Quality',
    category: 'facility',
    author: 'Anonymous',
    rating: 3,
    preview: 'Food options are decent but could use more variety. Vegetarian options are limited...',
    date: '1d ago',
    likes: 19,
    comments: 12
  }
];

export function StudentFeedback() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submittedFeedback, setSubmittedFeedback] = useState<any[]>([]);
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<number>>(new Set());

  const handleSubmitFeedback = () => {
    // Create new feedback submission
    const newSubmission = {
      id: Date.now(),
      title,
      subject,
      category: selectedCategory,
      rating,
      content,
      isAnonymous,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: 'submitted'
    };

    // Add to submitted feedback list (at the beginning for newest first)
    setSubmittedFeedback(prev => [newSubmission, ...prev]);
    
    // Show success message
    toast.success('Feedback submitted successfully ✅');
    
    // Reset form
    setTitle('');
    setSubject('');
    setRating(0);
    setContent('');
  };

  const toggleExpanded = (submissionId: number) => {
    const newExpanded = new Set(expandedSubmissions);
    if (newExpanded.has(submissionId)) {
      newExpanded.delete(submissionId);
    } else {
      newExpanded.add(submissionId);
    }
    setExpandedSubmissions(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = feedbackCategories.find(c => c.id === category);
    return cat ? cat.icon : MessageSquare;
  };

  const RatingStars = ({ rating, interactive = false, onRatingChange }: { rating: number, interactive?: boolean, onRatingChange?: (rating: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star 
              className={`w-5 h-5 ${
                star <= rating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-slate-300'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Student Feedback</h1>
          <p className="text-slate-600">Share your thoughts and help improve the experience</p>
        </div>
      </div>

      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="my-feedback">My Feedback</TabsTrigger>
          <TabsTrigger value="browse">Browse Feedback</TabsTrigger>
        </TabsList>

        {/* Submit Feedback Tab */}
        <TabsContent value="submit" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Submit New Feedback
            </h3>
            
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <Label className="text-base font-medium">Category</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
                  {feedbackCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <p className="text-sm font-medium">{category.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title">Feedback Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title for your feedback"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject">Subject/Course (if applicable)</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Machine Learning (CS 4701), Career Fair 2024"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Rating */}
              <div>
                <Label className="text-base font-medium">Overall Rating</Label>
                <div className="mt-2">
                  <RatingStars rating={rating} interactive onRatingChange={setRating} />
                </div>
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">Detailed Feedback</Label>
                <Textarea
                  id="content"
                  placeholder="Please provide specific details about your experience. What went well? What could be improved?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 h-32 resize-none"
                />
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded"
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Submit anonymously (recommended for sensitive feedback)
                </Label>
              </div>

              <Button 
                onClick={handleSubmitFeedback}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                disabled={!title || !content || rating === 0}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </Card>

          {/* Submitted Feedback List */}
          {submittedFeedback.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-orange-600" />
                  Your Submitted Feedback
                </h3>
                <Badge variant="outline" className="text-slate-700">
                  {submittedFeedback.length} submission{submittedFeedback.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {submittedFeedback.map((submission) => {
                  const Icon = getCategoryIcon(submission.category);
                  const isExpanded = expandedSubmissions.has(submission.id);
                  const previewText = submission.content.length > 100 
                    ? submission.content.substring(0, 100) + '...' 
                    : submission.content;

                  return (
                    <div
                      key={submission.id}
                      className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Icon className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-sm">{submission.title}</h4>
                            {submission.subject && (
                              <p className="text-xs text-slate-600">{submission.subject}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Submitted ✅
                          </Badge>
                          <RatingStars rating={submission.rating} />
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-slate-700 text-sm">
                          {isExpanded ? submission.content : previewText}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-slate-500">
                          <span>{submission.date} at {submission.time}</span>
                          {submission.isAnonymous && (
                            <span className="ml-2 px-2 py-1 bg-slate-100 rounded-lg">Anonymous</span>
                          )}
                        </div>
                        {submission.content.length > 100 && (
                          <button
                            onClick={() => toggleExpanded(submission.id)}
                            className="flex items-center text-orange-600 hover:text-orange-700 text-xs font-medium transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-3 h-3 mr-1" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3 h-3 mr-1" />
                                Show More
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </TabsContent>

        {/* My Feedback Tab */}
        <TabsContent value="my-feedback" className="space-y-6">
          <div className="space-y-4">
            {myFeedback.map((feedback) => {
              const Icon = getCategoryIcon(feedback.category);
              return (
                <Card key={feedback.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-orange-600" />
                      <div>
                        <h3 className="font-semibold text-slate-800">{feedback.title}</h3>
                        <p className="text-sm text-slate-600">{feedback.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(feedback.status)}>
                        {feedback.status === 'reviewed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {feedback.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                      </Badge>
                      <RatingStars rating={feedback.rating} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-slate-700">{feedback.content}</p>
                    </div>

                    {feedback.response && (
                      <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                        <p className="text-sm font-medium text-blue-800 mb-1">Official Response:</p>
                        <p className="text-blue-700">{feedback.response}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{feedback.date}</span>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {feedback.likes} helpful
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Browse Feedback Tab */}
        <TabsContent value="browse" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-slate-600" />
              <select className="px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="all">All Categories</option>
                {feedbackCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <Badge variant="outline" className="text-slate-700">
              {recentFeedback.length} recent feedback
            </Badge>
          </div>

          <div className="space-y-4">
            {recentFeedback.map((feedback) => {
              const Icon = getCategoryIcon(feedback.category);
              return (
                <Card key={feedback.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-orange-600" />
                      <div>
                        <h3 className="font-semibold text-slate-800">{feedback.title}</h3>
                        <p className="text-sm text-slate-600">by {feedback.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RatingStars rating={feedback.rating} />
                      <span className="text-sm text-slate-500">{feedback.date}</span>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-4">{feedback.preview}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <button className="flex items-center hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {feedback.likes}
                      </button>
                      <button className="flex items-center hover:text-blue-600 transition-colors">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {feedback.comments}
                      </button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                      Read More
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center py-8">
            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
              Load More Feedback
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}