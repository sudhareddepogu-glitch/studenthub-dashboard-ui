import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  X, 
  MapPin, 
  ExternalLink,
  Navigation,
  Building,
  Trees,
  Coffee,
  Camera,
  Clock,
  Star,
  Users,
  Globe
} from 'lucide-react';

interface CampusTourProps {
  className?: string;
}

export function CampusTour({ className }: CampusTourProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const modalVideoRef = useRef<HTMLIFrameElement>(null);
  const autoplayVideoRef = useRef<HTMLIFrameElement>(null);

  // VNR Campus YouTube video
  const youtubeVideoId = "PkxKNmlP0NE";
  const videoThumbnail = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
  const embedUrlModal = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1`;
  const embedUrlAutoplay = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${youtubeVideoId}&disablekb=1`;

  const handleVideoClick = () => {
    setIsVideoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsVideoModalOpen(false);
  };

  const handleAutoplayVideoClick = () => {
    setIsVideoModalOpen(true);
  };

  useEffect(() => {
    // Hide play icon after 3 seconds
    const timer = setTimeout(() => {
      setShowPlayIcon(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const openFullscreen = () => {
    window.open(`https://www.youtube.com/watch?v=${youtubeVideoId}`, '_blank');
  };

  const openGoogleMaps = () => {
    // VNR Vignana Jyothi Institute coordinates
    const campusLocation = 'VNR Vignana Jyothi Institute of Engineering and Technology, Bachupally, Hyderabad, Telangana, India';
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campusLocation)}`, '_blank');
  };

  return (
    <div className={className}>
      {/* Campus Tour Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 border-blue-200 hover:shadow-xl transition-all duration-300 group">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/20 rounded-full transform translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-teal-200/20 rounded-full transform -translate-x-8 translate-y-8"></div>
        
        {/* Label Tag */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-blue-500 to-teal-500 text-white border-none px-3 py-1">
            Virtual Campus Tour
          </Badge>
        </div>

        <div className="relative p-6 pt-16">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Explore Our Campus</h3>
              <p className="text-slate-600 text-sm">Immersive 360° virtual experience</p>
            </div>
          </div>

          {/* Autoplay Video Section */}
          <div className="mb-6">
            <div 
              className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300"
              onClick={handleAutoplayVideoClick}
              onMouseEnter={() => {
                setIsHovering(true);
                setShowPlayIcon(true);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setShowPlayIcon(false);
              }}
            >
              {/* Autoplay YouTube Video */}
              <iframe
                ref={autoplayVideoRef}
                className="w-full h-full"
                src={embedUrlAutoplay}
                title="VNR Campus Tour - Autoplay Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ pointerEvents: 'none' }}
              />

              {/* Subtle Play Icon Overlay */}
              <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-500 ${
                (showPlayIcon || isHovering) ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className={`w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                  isHovering ? 'scale-110 bg-white/95' : 'scale-100'
                }`}>
                  <Play className="w-6 h-6 text-slate-800 ml-0.5" />
                </div>
              </div>

              {/* Quality Badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-600 text-white border-none backdrop-blur-sm">
                  🔴 LIVE
                </Badge>
              </div>

              {/* Interactive Overlay for Click */}
              <div className="absolute inset-0 z-10" style={{ pointerEvents: 'auto' }} />
            </div>
          </div>

          {/* Campus Features Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl border border-white/50">
              <Building className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-slate-800 text-sm">Academic Buildings</p>
                <p className="text-xs text-slate-600">12 locations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl border border-white/50">
              <Trees className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-slate-800 text-sm">Campus Grounds</p>
                <p className="text-xs text-slate-600">8 outdoor areas</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl border border-white/50">
              <Coffee className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-slate-800 text-sm">Student Facilities</p>
                <p className="text-xs text-slate-600">15 amenities</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl border border-white/50">
              <Camera className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-slate-800 text-sm">360° Views</p>
                <p className="text-xs text-slate-600">HD quality</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleVideoClick}
              className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white transform hover:scale-105 transition-all duration-200"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Watch with Audio
            </Button>
            
            <Button 
              onClick={openGoogleMaps}
              variant="outline"
              className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Locate Campus
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
              <p className="text-lg font-semibold text-blue-600">50+</p>
              <p className="text-xs text-slate-600">Locations</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-lg font-semibold text-orange-600">4.8</span>
                <Star className="w-3 h-3 text-orange-500 fill-current" />
              </div>
              <p className="text-xs text-slate-600">Rating</p>
            </div>
            <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
              <p className="text-lg font-semibold text-green-600">12K+</p>
              <p className="text-xs text-slate-600">Views</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black/95 backdrop-blur-md border-slate-700/50">
          <DialogHeader className="absolute top-4 left-4 right-4 z-10 flex flex-row items-center justify-between space-y-0">
            <div>
              <DialogTitle className="text-white font-semibold text-lg">
                Virtual Campus Tour – VNR Vignana Jyothi Institute
              </DialogTitle>
              <DialogDescription className="text-white/80 text-sm">
                Explore our campus facilities and grounds through this immersive 360° virtual tour experience
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleModalClose}
              className="text-white hover:bg-white/20 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogHeader>
          
          <div className="relative aspect-video bg-black">
            <iframe
              ref={modalVideoRef}
              className="w-full h-full"
              src={embedUrlModal}
              title="VNR Campus Tour - Full Experience"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Custom Action Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/60 backdrop-blur-md rounded-xl p-3">
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">
                  🎥 <span className="font-medium">Immersive Campus Experience</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={openGoogleMaps}
                  size="sm"
                  className="bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:from-[#3367D6] hover:to-[#2E8B57] text-white transform hover:scale-105 transition-all duration-200"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Locate Campus
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openFullscreen}
                  className="text-white hover:bg-white/20 p-2 rounded-lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}