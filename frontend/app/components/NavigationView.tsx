"use client";

import React, { useState, useEffect } from 'react';
import { Route, Waypoint } from '../types';
import { Wind, Droplet, ChevronDown, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NavigationViewProps {
  route: Route;
  onComplete: () => void;
}

export const NavigationView: React.FC<NavigationViewProps> = ({ route, onComplete }) => {
  const [currentWaypoint, setCurrentWaypoint] = useState(0);
  const [steps, setSteps] = useState(0);
  const [hydrationLogged, setHydrationLogged] = useState(false);
  const [showNudge, setShowNudge] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);

  const walkingSegment = route.walkingSegments.find(seg => seg.isLastMile);
  const stepsRemaining = 500 - steps;
  const progressPercentage = (steps / 500) * 100;

  useEffect(() => {
    // Simulate step counting
    const interval = setInterval(() => {
      setSteps(prev => {
        if (prev >= 500) {
          clearInterval(interval);
          setShowCompletion(true);
          setTimeout(() => {
            onComplete();
          }, 3000);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Cycle through nudges
    const nudgeInterval = setInterval(() => {
      setShowNudge(false);
      setTimeout(() => {
        setCurrentWaypoint(prev => (prev + 1) % 3);
        setShowNudge(true);
      }, 300);
    }, 8000);

    return () => clearInterval(nudgeInterval);
  }, []);

  const nudges = [
    { text: "Passing City Park (High Oxygen Zone). Take a deep breath! 🌳", icon: <Wind className="w-4 h-4" /> },
    { text: "Shoulders tight? Drop them for 10 seconds while waiting at this light.", icon: null },
    { text: "Great posture! Keep your head up and enjoy the view.", icon: null }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#48BB78';
    return '#63B3ED';
  };

  return (
    <div className="relative w-full h-full bg-[var(--color-background)]">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-white shadow-md z-20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[var(--color-text-secondary)]">Distance remaining</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl">{walkingSegment ? walkingSegment.distance : 0.8}</span>
              <span className="text-sm text-[var(--color-text-secondary)]">km walk</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-[var(--color-primary)] bg-opacity-10 px-4 py-2 rounded-2xl">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: getAQIColor(route.aqi) }}
            />
            <div>
              <div className="text-xs text-[var(--color-text-secondary)]">AQI</div>
              <div className="text-lg text-[var(--color-primary)]">{route.aqi}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Nudge Pill */}
      {showNudge && !showCompletion && (
        <div 
          className="absolute top-24 left-6 right-6 bg-white rounded-3xl px-5 py-4 shadow-lg z-10 transition-all duration-300"
          style={{ animation: 'slideDown 0.3s ease-out' }}
        >
          <div className="flex items-start gap-3">
            {nudges[currentWaypoint].icon}
            <p className="flex-1 text-sm">{nudges[currentWaypoint].text}</p>
          </div>
        </div>
      )}

      {/* Map View */}
      <div className="absolute inset-0 pt-28 pb-48">
        <div className="relative w-full h-full bg-gradient-to-br from-[#E6F7F7] to-[#D5F5F5] rounded-3xl mx-6 overflow-hidden shadow-inner">
          {/* Background image with green overlay */}
          <div className="absolute inset-0">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1741004421389-6f225bf38c10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMHRyZWVzJTIwcGF0aHdheXxlbnwxfHx8fDE3NjQzNDczNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Park pathway"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2C7A7B] to-[#48BB78] opacity-20"/>
          </div>

          {/* Navigation Path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 500">
            {/* Dotted green path with leaf icons */}
            <defs>
              <linearGradient id="navGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2C7A7B" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#48BB78" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            
            <path
              d="M 150 400 L 150 300 Q 150 250, 180 220 L 180 100"
              fill="none"
              stroke="url(#navGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="15 10"
            />
            
            {/* Current location dot */}
            <circle 
              cx="150" 
              cy={400 - (progressPercentage * 3)} 
              r="10" 
              fill="#63B3ED" 
              className="animate-pulse"
            >
              <animate
                attributeName="cy"
                from="400"
                to="100"
                dur="25s"
                fill="freeze"
              />
            </circle>

            {/* Leaf waypoint markers */}
            <g>
              <circle cx="150" cy="300" r="16" fill="white" opacity="0.9"/>
              <text x="150" y="307" textAnchor="middle" fontSize="18">🌳</text>
            </g>
            <g>
              <circle cx="180" cy="220" r="16" fill="white" opacity="0.9"/>
              <text x="180" y="227" textAnchor="middle" fontSize="18">☂️</text>
            </g>
            <g>
              <circle cx="180" cy="150" r="16" fill="white" opacity="0.9"/>
              <text x="180" y="157" textAnchor="middle" fontSize="18">💧</text>
            </g>
          </svg>

          {/* Shaded Area Highlight */}
          <div 
            className="absolute bg-[var(--color-primary)] bg-opacity-20 rounded-2xl px-3 py-1"
            style={{
              top: '45%',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <span className="text-xs">🌲 Tree Canopy Shade</span>
          </div>
        </div>

        {/* Hydration Bubble */}
        <div 
          className="absolute right-12 bottom-12 bg-[var(--color-secondary)] text-white w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
          onClick={() => setHydrationLogged(!hydrationLogged)}
        >
          <Droplet className={`w-6 h-6 ${hydrationLogged ? 'fill-current' : ''}`} />
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl px-6 py-6 z-20">
        <div className="text-center mb-4">
          <p className="text-lg">Walk briskly to catch the 8:15 tram.</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            You are {stepsRemaining > 0 ? stepsRemaining : 0} steps away from your daily goal!
          </p>
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="45"
                fill="none"
                stroke="var(--color-gray-light)"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="45"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progressPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl">{Math.round(progressPercentage)}%</span>
              <span className="text-xs text-[var(--color-text-secondary)]">Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletion && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-3xl p-8 mx-6 max-w-sm text-center animate-scale-up">
            <div className="w-20 h-20 bg-[var(--color-primary)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-[var(--color-primary)]" />
            </div>
            <h3 className="mb-2">Great Job!</h3>
            <p className="text-[var(--color-text-secondary)] mb-4">
              You avoided {route.co2Saved}g of CO₂ and burned {route.caloriesBurned} calories.
            </p>
            <div className="bg-[var(--color-primary)] bg-opacity-10 rounded-2xl px-6 py-4">
              <div className="text-3xl text-[var(--color-primary)] mb-1">+50</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Zen Points earned</div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
