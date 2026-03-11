import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceSearchProps {
  onTranscript: (text: string) => void;
  className?: string;
  disabled?: boolean;
}

export function VoiceSearch({ onTranscript, className = '', disabled = false }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);

  // Simulate voice recognition
  const startListening = () => {
    if (disabled) return;
    
    setIsListening(true);
    setShowWaveform(true);
    
    // Simulate listening for 3 seconds
    setTimeout(() => {
      setIsListening(false);
      setShowWaveform(false);
      setIsProcessing(true);
      
      // Simulate processing for 1 second
      setTimeout(() => {
        setIsProcessing(false);
        // Simulate different transcriptions based on current context
        const sampleTranscripts = [
          "DBMS Lecture Notes",
          "Machine Learning Assignment",
          "Data Structures Lab",
          "Web Development Project",
          "AI Workshop Event",
          "Tech Club Meeting",
          "Database Systems Quiz"
        ];
        const randomTranscript = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
        onTranscript(randomTranscript);
      }, 1000);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setShowWaveform(false);
    setIsProcessing(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={isListening ? stopListening : startListening}
        disabled={disabled || isProcessing}
        className={`p-2 rounded-full transition-all duration-300 ${
          isListening 
            ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg' 
            : isProcessing
            ? 'bg-orange-100 text-orange-600'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
        }`}
      >
        <motion.div
          animate={
            isListening 
              ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
              : isProcessing 
              ? { scale: [1, 0.9, 1] }
              : { scale: 1 }
          }
          transition={
            isListening 
              ? { duration: 0.8, repeat: Infinity }
              : isProcessing
              ? { duration: 0.5, repeat: Infinity }
              : { duration: 0.2 }
          }
        >
          {isListening ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </motion.div>
        
        {/* Ripple effect for listening state */}
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </Button>

      {/* Status Tooltip */}
      <AnimatePresence>
        {(isListening || isProcessing) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50"
          >
            {isListening ? 'Listening...' : 'Processing...'}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waveform Animation */}
      <AnimatePresence>
        {showWaveform && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-1"
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-blue-500 to-teal-500 rounded-full"
                animate={{
                  height: [4, 16, 4],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}