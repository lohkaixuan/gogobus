import React from 'react';
import { Route } from '../types';
import { X, Droplets, Wind, Users, Clock, Zap } from 'lucide-react';

interface ComparisonViewProps {
  routes: Route[];
  onClose: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ routes, onClose }) => {
  const healthRoute = routes.find(r => r.type === 'health');
  const fastRoute = routes.find(r => r.type === 'fast');

  if (!healthRoute || !fastRoute) return null;

  const pollutantDifference = Math.round(
    (fastRoute.aqi - healthRoute.aqi) * fastRoute.duration * 0.5
  );

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-[var(--color-gray-light)] px-6 py-4 flex items-center justify-between z-10">
        <h3>Compare Routes</h3>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-[var(--color-gray-light)] rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* Visual Comparison */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Health Route */}
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                💚
              </div>
              <div>
                <div className="text-sm opacity-90">Recommended</div>
                <div>Zen Route</div>
              </div>
            </div>
            <div className="text-4xl mb-1">{healthRoute.duration}</div>
            <div className="text-sm opacity-90">minutes</div>
          </div>

          {/* Fast Route */}
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-light)] text-white rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm opacity-90">Fastest</div>
                <div>Fast Route</div>
              </div>
            </div>
            <div className="text-4xl mb-1">{fastRoute.duration}</div>
            <div className="text-sm opacity-90">minutes</div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="bg-[var(--color-background)] px-6 py-4 border-b border-[var(--color-gray-light)]">
            <h4>Detailed Breakdown</h4>
          </div>

          {/* Time */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-[var(--color-gray-light)] items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--color-text-secondary)]" />
              <span>Duration</span>
            </div>
            <div className="text-center">
              <span className="text-lg">{healthRoute.duration} min</span>
            </div>
            <div className="text-center">
              <span className="text-lg">{fastRoute.duration} min</span>
              <span className="ml-2 text-xs text-[var(--color-success)]">(-5 min)</span>
            </div>
          </div>

          {/* Air Quality */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-[var(--color-gray-light)] items-center">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-[var(--color-text-secondary)]" />
              <span>Air Quality (AQI)</span>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"/>
                <span>{healthRoute.aqi}</span>
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">Good</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full"/>
                <span>{fastRoute.aqi}</span>
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">Unhealthy</div>
            </div>
          </div>

          {/* Crowd Level */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-[var(--color-gray-light)] items-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--color-text-secondary)]" />
              <span>Crowd Level</span>
            </div>
            <div className="text-center">
              <span className="text-lg">{healthRoute.crowdLevel}</span>
            </div>
            <div className="text-center">
              <span className="text-lg text-[var(--color-alert)]">{fastRoute.crowdLevel}</span>
            </div>
          </div>

          {/* Pollutants Inhaled */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 items-center bg-[var(--color-background)]">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-[var(--color-text-secondary)]" />
              <span>Est. Pollutants Inhaled</span>
            </div>
            <div className="text-center">
              <span className="text-lg text-[var(--color-success)]">Low</span>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">~250 μg</div>
            </div>
            <div className="text-center">
              <span className="text-lg text-[var(--color-alert)]">High</span>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">~{250 + pollutantDifference} μg</div>
            </div>
          </div>
        </div>

        {/* Health Impact Summary */}
        <div className="mt-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white rounded-3xl p-6">
          <h4 className="mb-3">💚 Health Impact</h4>
          <p className="text-sm opacity-90 mb-4">
            Choosing the Zen Route means you&#39;ll inhale approximately <strong>{pollutantDifference} μg less</strong> particulate matter 
            compared to the fast route. This is equivalent to breathing cleaner air for the entire journey.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-2xl p-4">
              <div className="text-2xl mb-1">{healthRoute.co2Saved}g</div>
              <div className="text-xs opacity-90">CO₂ Saved</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-2xl p-4">
              <div className="text-2xl mb-1">{healthRoute.caloriesBurned}</div>
              <div className="text-xs opacity-90">Calories Burned</div>
            </div>
          </div>
        </div>

        {/* Exposure Graph Comparison */}
        <div className="mt-8 bg-white rounded-3xl shadow-md p-6">
          <h4 className="mb-4">Exposure Throughout Journey</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Zen Route</span>
                <span className="text-xs text-[var(--color-text-secondary)]">Average: {Math.round(healthRoute.exposureLevel.reduce((a, b) => a + b) / healthRoute.exposureLevel.length)} AQI</span>
              </div>
              <div className="flex items-end gap-1 h-16 bg-[var(--color-background)] rounded-xl p-2">
                {healthRoute.exposureLevel.map((level, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t transition-all"
                    style={{
                      height: `${(level / 120) * 100}%`,
                      backgroundColor: '#48BB78',
                      opacity: 0.8
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Fast Route</span>
                <span className="text-xs text-[var(--color-text-secondary)]">Average: {Math.round(fastRoute.exposureLevel.reduce((a, b) => a + b) / fastRoute.exposureLevel.length)} AQI</span>
              </div>
              <div className="flex items-end gap-1 h-16 bg-[var(--color-background)] rounded-xl p-2">
                {fastRoute.exposureLevel.map((level, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t transition-all"
                    style={{
                      height: `${(level / 120) * 100}%`,
                      backgroundColor: '#F56565',
                      opacity: 0.8
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
