'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Bell, Sparkles, Home } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: 'Location-Based',
    description: 'Get reminded when you enter specific places like home, gym, or office',
    gradient: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    emoji: '📍'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Time-Aware',
    description: 'Set reminders for specific times - morning, evening, or custom hours',
    gradient: 'from-blue-400 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    emoji: '⏰'
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: 'Smart Notifications',
    description: 'Context-aware alerts that trigger at the perfect moment',
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    emoji: '🔔'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Custom Locations',
    description: 'Add unlimited places and create reminders for any location you visit',
    gradient: 'from-orange-400 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    emoji: '✨'
  }
];

interface FeatureCarouselProps {
  onColorChange?: (bgGradient: string, mainGradient: string) => void;
  onCreateClick?: () => void;
}

export function FeatureCarousel({ onColorChange, onCreateClick }: FeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    onColorChange?.(features[currentIndex].bgGradient, features[currentIndex].gradient);
  }, [currentIndex, onColorChange]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % features.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentFeature = features[currentIndex];

  return (
    <div className="relative">
      {/* Main Carousel Card */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentFeature.bgGradient} p-8 border border-white/50 shadow-xl transition-all duration-500`}>
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/40 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className={`inline-flex w-20 h-20 mb-4 bg-gradient-to-br ${currentFeature.gradient} rounded-3xl shadow-2xl items-center justify-center transform transition-all duration-500 ${
            isAnimating ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
          }`}>
            <span className="text-4xl">{currentFeature.emoji}</span>
          </div>

          {/* Title */}
          <h3 className={`text-2xl font-black text-zinc-900 mb-3 transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            {currentFeature.title}
          </h3>

          {/* Description */}
          <p className={`text-zinc-600 text-sm max-w-xs mx-auto mb-6 transition-all duration-500 delay-100 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            {currentFeature.description}
          </p>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? `w-8 h-2 bg-gradient-to-r ${currentFeature.gradient}`
                    : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-xs text-zinc-500 font-medium">
            {currentIndex + 1} / {features.length}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-zinc-700 hover:bg-white hover:scale-110 transition-all active:scale-95 border border-zinc-200"
        >
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-r-[8px] border-r-zinc-700 border-b-[5px] border-b-transparent -ml-0.5"></div>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-zinc-700 hover:bg-white hover:scale-110 transition-all active:scale-95 border border-zinc-200"
        >
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-zinc-700 border-b-[5px] border-b-transparent -mr-0.5"></div>
        </button>
      </div>

      {/* CTA Button Below Carousel */}
      <div className="mt-6 text-center">
        <div className="inline-flex flex-col items-center gap-3">
          <p className="text-xs text-zinc-500 font-medium">Ready to get started?</p>
          <button 
            onClick={onCreateClick}
            className={`group relative px-6 py-3 bg-gradient-to-r ${currentFeature.gradient} text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Create Your First Reminder</span>
              <span className="text-xl">→</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
