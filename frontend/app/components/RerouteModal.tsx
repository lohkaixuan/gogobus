import React from 'react';
import { RerouteOption } from '../types';
import { Bike, Bus, X, TrendingDown, Users, Clock } from 'lucide-react';

interface RerouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: RerouteOption[];
  onSelectOption: (optionId: string) => void;
}

export const RerouteModal: React.FC<RerouteModalProps> = ({ 
  isOpen, 
  onClose, 
  options, 
  onSelectOption 
}) => {
  if (!isOpen) return null;

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'scooter':
        return <Bike className="w-8 h-8" />;
      case 'bus':
        return <Bus className="w-8 h-8" />;
      default:
        return <Bike className="w-8 h-8" />;
    }
  };

  const getStressColor = (level: number) => {
    if (level <= 3) return '#48BB78';
    if (level <= 6) return '#ECC94B';
    return '#F56565';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-modal-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-[var(--color-gray-light)] rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white px-6 py-6">
          <div className="text-sm opacity-90 mb-1">Transit Update</div>
          <h3>Bus 404 is stuck in traffic.</h3>
          <p className="text-sm opacity-90 mt-2">Let&apos;s adjust for lower stress.</p>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                option.type === 'health'
                  ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white shadow-lg'
                  : 'bg-[var(--color-gray-light)] hover:bg-gray-200'
              }`}
            >
              {/* Tag */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-3 ${
                option.type === 'health'
                  ? 'bg-white bg-opacity-20'
                  : option.crowdLevel === 'High'
                  ? 'bg-[var(--color-alert)] text-white'
                  : 'bg-white'
              }`}>
                {option.details}
              </div>

              {/* Content */}
              <div className="flex gap-4">
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                  option.type === 'health'
                    ? 'bg-white bg-opacity-20'
                    : 'bg-white'
                }`}>
                  <div className={option.type === 'health' ? 'text-white' : 'text-[var(--color-primary)]'}>
                    {getIcon(option.icon)}
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className={`mb-2 ${option.type === 'health' ? 'text-white' : ''}`}>
                    {option.name}
                  </h4>
                  <p className={`text-sm mb-3 ${
                    option.type === 'health' ? 'text-white text-opacity-90' : 'text-[var(--color-text-secondary)]'
                  }`}>
                    {option.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Clock className={`w-4 h-4 ${option.type === 'health' ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                      <span>+{option.delay} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className={`w-4 h-4 ${option.type === 'health' ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                      <span>{option.crowdLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stress Thermometer */}
              <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`flex items-center gap-1 ${option.type === 'health' ? 'text-white text-opacity-90' : 'text-[var(--color-text-secondary)]'}`}>
                    <TrendingDown className="w-3 h-3" />
                    Stress Level
                  </span>
                  <span>{option.stressLevel}/10</span>
                </div>
                <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(option.stressLevel / 10) * 100}%`,
                      backgroundColor: option.type === 'health' ? 'rgba(255, 255, 255, 0.9)' : getStressColor(option.stressLevel)
                    }}
                  />
                </div>
              </div>

              {/* Illustration hint */}
              {option.type === 'health' && (
                <div className="absolute bottom-4 right-4 text-4xl opacity-20">
                  🚴💨😊
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="bg-[var(--color-background)] px-6 py-4 text-center">
          <p className="text-xs text-[var(--color-text-secondary)]">
            Tap an option to adjust your route
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modal-up {
          animation: modal-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
