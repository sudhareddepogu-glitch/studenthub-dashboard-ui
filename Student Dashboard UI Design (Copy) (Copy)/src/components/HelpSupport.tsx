import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  BookOpen, 
  Users, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Send,
  X,
  ExternalLink,
  Download,
  Play
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  const faqs = [
    {
      question: "How do I submit an assignment?",
      answer: "To submit an assignment, navigate to the Records section, find your assignment, and click the 'Submit' button. You can upload files, add notes, and track submission status."
    },
    {
      question: "Why can't I download my certificate?",
      answer: "Certificate download issues usually occur when: 1) The certificate hasn't been officially issued yet, 2) Your browser is blocking downloads, or 3) There's a temporary server issue. Try refreshing the page or contact support."
    },
    {
      question: "How do I register for events?",
      answer: "Go to the Events section, browse upcoming events, and click 'Register' on any event you're interested in. You'll receive confirmation via email and in-app notifications."
    },
    {
      question: "Can I change my profile visibility?",
      answer: "Yes! Go to Settings > Privacy & Security and adjust your profile visibility settings. You can choose from Public, University Only, or Private visibility levels."
    },
    {
      question: "How do I sync with my LMS?",
      answer: "In Settings > Integrations, you can connect your Learning Management System. Click 'Connect LMS' and follow the authentication process to sync your courses and grades."
    },
    {
      question: "What if I forgot my password?",
      answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive a password reset link. If you don't receive it within 10 minutes, check your spam folder."
    }
  ];

  const userGuides = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      type: "PDF",
      duration: "15 min read",
      thumbnail: "📚"
    },
    {
      title: "Portfolio Management",
      description: "How to create and manage your portfolio",
      type: "Video",
      duration: "8 min watch",
      thumbnail: "🎥"
    },
    {
      title: "Event Registration Process",
      description: "Step-by-step event registration guide",
      type: "PDF",
      duration: "5 min read",
      thumbnail: "📅"
    },
    {
      title: "Grade Tracking Tutorial",
      description: "Understanding your academic progress",
      type: "Video",
      duration: "12 min watch",
      thumbnail: "📊"
    },
    {
      title: "Notification Settings",
      description: "Customize your notification preferences",
      type: "PDF",
      duration: "3 min read",
      thumbnail: "🔔"
    },
    {
      title: "Data Export & Backup",
      description: "How to export your academic data",
      type: "Video",
      duration: "6 min watch",
      thumbnail: "💾"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ChatWindow = () => (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Live Support</span>
        </div>
        <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 h-64 overflow-y-auto bg-slate-50">
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm">
              S
            </div>
            <div className="bg-white p-3 rounded-xl rounded-tl-none max-w-xs">
              <p className="text-sm">Hi! I'm Sarah from student support. How can I help you today? 😊</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            className="flex-1 bg-slate-50 border-slate-200 rounded-xl"
            onKeyPress={(e) => e.key === 'Enter' && chatMessage.trim() && setChatMessage('')}
          />
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            onClick={() => chatMessage.trim() && setChatMessage('')}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Help & Support</h1>
            <p className="text-slate-600">Find answers and get the help you need</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search help topics, FAQs, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-3 bg-white/60 backdrop-blur-sm border-slate-200 rounded-2xl text-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQs Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => setShowChat(true)}
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl border border-blue-200 transition-all duration-200 group"
              >
                <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-blue-800">Live Chat</p>
                <p className="text-sm text-blue-600">Chat with support</p>
              </button>
              
              <button className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 rounded-2xl border border-teal-200 transition-all duration-200 group">
                <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-teal-800">User Guides</p>
                <p className="text-sm text-teal-600">Step-by-step tutorials</p>
              </button>
              
              <button className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-2xl border border-purple-200 transition-all duration-200 group">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-purple-800">Community</p>
                <p className="text-sm text-purple-600">Join discussions</p>
              </button>
              
              <button className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-2xl border border-orange-200 transition-all duration-200 group">
                <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-orange-800">Raise Ticket</p>
                <p className="text-sm text-orange-600">Get personalized help</p>
              </button>
            </div>

            {/* FAQs */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-slate-50/50 rounded-xl border border-slate-200/50 px-4">
                    <AccordionTrigger className="text-left font-medium text-slate-800 hover:no-underline hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {filteredFaqs.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <p className="text-slate-500">No FAQs found matching "{searchQuery}"</p>
                  <Button 
                    className="mt-4 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                    onClick={() => setShowChat(true)}
                  >
                    Ask Support Team
                  </Button>
                </div>
              )}
            </div>

            {/* User Guides */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-teal-600" />
                User Guides & Tutorials
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userGuides.map((guide, index) => (
                  <div key={index} className="p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 hover:bg-white/50 transition-colors group cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{guide.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 group-hover:text-blue-600">{guide.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{guide.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3 text-xs text-slate-500">
                            <span className={`px-2 py-1 rounded-lg ${
                              guide.type === 'Video' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {guide.type}
                            </span>
                            <span>{guide.duration}</span>
                          </div>
                          {guide.type === 'Video' ? (
                            <Play className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                          ) : (
                            <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Raise a Ticket */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-600" />
                Raise a Support Ticket
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="assignment">Assignment Submission</option>
                    <option value="grades">Grades & Certificates</option>
                    <option value="events">Events & Registration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <Label>Subject</Label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="mt-1 bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Please provide detailed information about your issue..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="mt-1 bg-slate-50 border-slate-200 rounded-xl h-24 resize-none"
                  />
                </div>
                
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </div>
            </div>

            {/* Community Forum */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Community Forum
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="p-3 bg-slate-50/50 rounded-xl">
                  <p className="font-medium text-slate-800 text-sm">Latest Discussions</p>
                  <p className="text-xs text-slate-600 mt-1">How to optimize study schedule?</p>
                </div>
                <div className="p-3 bg-slate-50/50 rounded-xl">
                  <p className="font-medium text-slate-800 text-sm">Popular This Week</p>
                  <p className="text-xs text-slate-600 mt-1">Tips for group project management</p>
                </div>
                <div className="p-3 bg-slate-50/50 rounded-xl">
                  <p className="font-medium text-slate-800 text-sm">Study Groups</p>
                  <p className="text-xs text-slate-600 mt-1">Find study partners near you</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Community Forum
              </Button>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200/50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Need More Help?</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-slate-700">Email Support</p>
                  <p className="text-slate-600">support@studyhub.edu</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Phone Support</p>
                  <p className="text-slate-600">+1 (555) 123-HELP</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Office Hours</p>
                  <p className="text-slate-600">Mon-Fri: 8 AM - 6 PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Window */}
      {showChat && <ChatWindow />}

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </>
  );
}