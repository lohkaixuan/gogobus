"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Route } from '../types';

interface HealthMapProps {
  selectedRoute?: Route;
}

export const HealthMap: React.FC<HealthMapProps> = ({ selectedRoute }) => {
  const router = useRouter();

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#E6F7F7] to-[#B8E6E6] rounded-3xl overflow-hidden">
      <button
        type="button"
        onClick={() => router.push('/')}
        className="absolute z-20 top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-teal-700 shadow-md backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        aria-label="Back to home"
      >
        <span aria-hidden>←</span>
        <span className="hidden sm:inline">Back to Home</span>
      </button>

      {/* Health Heatmap Overlay */}
      <div className="absolute inset-0">
        {/* Clean air zones - green glows */}
        <div 
          className="absolute w-48 h-48 rounded-full opacity-30 blur-3xl animate-breathe"
          style={{
            background: 'radial-gradient(circle, #48BB78 0%, transparent 70%)',
            top: '20%',
            left: '15%'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-25 blur-3xl animate-breathe"
          style={{
            background: 'radial-gradient(circle, #48BB78 0%, transparent 70%)',
            top: '50%',
            right: '20%',
            animationDelay: '1s'
          }}
        />
        
        {/* Pollution zones - gray fog */}
        <div 
          className="absolute w-56 h-56 rounded-full opacity-20 blur-2xl"
          style={{
            background: 'radial-gradient(circle, #A0AEC0 0%, transparent 70%)',
            top: '60%',
            left: '25%'
          }}
        />
      </div>

      {/* Map Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2C7A7B" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Route Path */}
      {selectedRoute && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={selectedRoute.type === 'health' ? '#2C7A7B' : '#63B3ED'} stopOpacity="0.8"/>
              <stop offset="100%" stopColor={selectedRoute.type === 'health' ? '#48BB78' : '#90CDF4'} stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          
          {/* Route line */}
          <path
            d="M 50 500 Q 150 400, 200 300 T 350 100"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={selectedRoute.type === 'health' ? '0' : '10 5'}
          />
          
          {/* Start point */}
          <circle cx="50" cy="500" r="12" fill="var(--color-primary)" stroke="white" strokeWidth="3"/>
          
          {/* End point */}
          <circle cx="350" cy="100" r="12" fill="var(--color-secondary)" stroke="white" strokeWidth="3"/>
          
          {/* Waypoints */}
          {selectedRoute.scenicWaypoints.map((waypoint, idx) => {
            const positions = [
              { x: 150, y: 400 },
              { x: 200, y: 300 },
              { x: 280, y: 200 }
            ];
            const pos = positions[idx] || positions[0];
            
            return (
              <g key={idx}>
                <circle 
                  cx={pos.x} 
                  cy={pos.y} 
                  r="20" 
                  fill="white" 
                  opacity="0.9"
                  className="animate-breathe"
                />
                <text 
                  x={pos.x} 
                  y={pos.y + 6} 
                  textAnchor="middle" 
                  fontSize="20"
                >
                  {waypoint.type === 'tree' ? '🌳' : waypoint.type === 'water' ? '💧' : waypoint.type === 'shade' ? '☂️' : '📷'}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {/* Location markers and labels */}
      <div className="absolute top-8 left-8 bg-white rounded-2xl px-4 py-2 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full animate-pulse"/>
          <span className="text-sm">Your Location</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 bg-white rounded-2xl px-4 py-2 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--color-secondary)] rounded-full"/>
          <span className="text-sm">Destination</span>
        </div>
      </div>

      {/* AQI Legend */}
      <div className="absolute top-8 right-8 bg-white bg-opacity-90 backdrop-blur rounded-2xl px-4 py-3 shadow-md">
        <div className="text-xs mb-2">Air Quality</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#48BB78]"/>
            <span className="text-xs">Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#ECC94B]"/>
            <span className="text-xs">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#F56565]"/>
            <span className="text-xs">Unhealthy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
