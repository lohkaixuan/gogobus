"use client";

import React from 'react';
import { Route } from '../types';
import { Leaf, Zap, Scale, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';

interface RouteCardProps {
  route: Route;
  onSelect: (routeId: string) => void;
  isSelected?: boolean;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onSelect, isSelected }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#48BB78';
    if (aqi <= 100) return '#ECC94B';
    return '#F56565';
  };

  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    return 'Unhealthy';
  };

  const handleSelect = () => {
    if (route.type === 'health') {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    onSelect(route.id);
  };

  const isHealthRoute = route.type === 'health';
  const isFastRoute = route.type === 'fast';

  return (
    <div
      onClick={handleSelect}
      className={`relative bg-white rounded-3xl p-5 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'ring-4 ring-[var(--color-primary)] shadow-lg scale-[1.02]' 
          : 'hover:shadow-md hover:scale-[1.01]'
      } ${isAnimating ? 'animate-green-wave' : ''}`}
      style={{
        boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        backgroundImage: isAnimating 
          ? 'linear-gradient(90deg, transparent, rgba(44, 122, 123, 0.2), transparent)'
          : 'none',
        backgroundSize: '200% 100%'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {isHealthRoute && (
            <div className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-full">
              <Leaf className="w-4 h-4" />
              <span className="text-sm">Recommended for Health</span>
            </div>
          )}
          {isFastRoute && (
            <div className="flex items-center gap-2 bg-[var(--color-secondary)] text-white px-3 py-1.5 rounded-full">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Fastest</span>
            </div>
          )}
          {route.type === 'standard' && (
            <div className="flex items-center gap-2 bg-gray-500 text-white px-3 py-1.5 rounded-full">
              <Scale className="w-4 h-4" />
              <span className="text-sm">Balanced</span>
            </div>
          )}
        </div>
        
        {/* Breathability Score */}
        <div className="flex flex-col items-center bg-[var(--color-background)] rounded-2xl px-3 py-2">
          <div className="text-2xl" style={{ color: getAQIColor(route.aqi) }}>
            {Math.round((100 - route.aqi / 2) / 10)}
          </div>
          <div className="text-xs text-[var(--color-text-secondary)]">Score</div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">Duration</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl">{route.duration}</span>
            <span className="text-sm text-[var(--color-text-secondary)]">mins</span>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">Air Quality</div>
          <div className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: getAQIColor(route.aqi) }}
            />
            <span className="text-sm">{route.aqi}</span>
            <span className="text-xs text-[var(--color-text-secondary)]">({getAQILabel(route.aqi)})</span>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">Crowd</div>
          <div className="flex items-center gap-1">
            {route.crowdLevel === 'High' && <AlertTriangle className="w-3 h-3 text-[var(--color-alert)]" />}
            <span className={`text-sm ${route.crowdLevel === 'High' ? 'text-[var(--color-alert)]' : ''}`}>
              {route.crowdLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Exposure Graph */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-[var(--color-text-secondary)]" />
          <span className="text-xs text-[var(--color-text-secondary)]">Exposure Levels</span>
        </div>
        <div className="flex items-end gap-1 h-12">
          {route.exposureLevel.map((level, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-t transition-all"
              style={{
                height: `${(level / 120) * 100}%`,
                backgroundColor: level <= 50 ? '#48BB78' : level <= 100 ? '#ECC94B' : '#F56565',
                opacity: 0.7
              }}
            />
          ))}
        </div>
      </div>

      {/* Transport Modes */}
      <div className="flex items-center gap-2 mb-4">
        {route.transportModes.map((mode, idx) => (
          <React.Fragment key={idx}>
            <span className="text-xs bg-[var(--color-gray-light)] px-2 py-1 rounded-lg">
              {mode}
            </span>
            {idx < route.transportModes.length - 1 && (
              <span className="text-xs text-[var(--color-text-secondary)]">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Health Benefits */}
      {route.co2Saved && route.caloriesBurned && (
        <div className="flex items-center gap-4 pt-3 border-t border-[var(--color-gray-light)]">
          <div className="flex items-center gap-2 text-xs text-[var(--color-primary)]">
            <Leaf className="w-3 h-3" />
            <span>{route.co2Saved}g CO₂ saved</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-primary)]">
            <span>🔥</span>
            <span>{route.caloriesBurned} cal burned</span>
          </div>
        </div>
      )}

      {/* Scenic Waypoints indicator */}
      {route.scenicWaypoints.length > 0 && (
        <div className="flex items-center gap-1 mt-3 text-xs text-[var(--color-text-secondary)]">
          <MapPin className="w-3 h-3" />
          <span>{route.scenicWaypoints.length} scenic waypoint{route.scenicWaypoints.length > 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
};
