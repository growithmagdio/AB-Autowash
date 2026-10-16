import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Reveal after drawing completes
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setRemoved(true);
        if (onComplete) onComplete();
      }, 700);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#0A0A0B] flex flex-col items-center justify-center transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Drawing Gold Ring around AB Emblem */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#1C1A14"
              strokeWidth="2.5"
            />
            {/* Drawing Gold Ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#loadingGold)"
              strokeWidth="3.5"
              strokeDasharray="276"
              strokeDashoffset="276"
              className="animate-[drawRing_1.8s_cubic-bezier(0.65,0,0.35,1)_forwards]"
            />
            <defs>
              <linearGradient id="loadingGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF0D0" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#FFC400" />
                <stop offset="100%" stopColor="#F1D27A" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Monogram AB Crest */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-cinzel text-3xl font-black bg-gradient-to-br from-[#FFF0D0] via-[#D4AF37] to-[#F1D27A] bg-clip-text text-transparent filter drop-shadow-[0_0_12px_rgba(212,175,55,0.7)]">
              AB
            </span>
            <div className="w-6 h-0.5 bg-[#D4AF37] mt-1 opacity-80" />
          </div>
        </div>

        {/* Text Details */}
        <div className="mt-8 text-center">
          <h2 className="font-cinzel font-bold text-lg sm:text-xl tracking-[0.22em] text-[#F7F3EA] uppercase">
            AUTO BRIGHT
          </h2>
          <p className="font-manrope text-xs tracking-[0.25em] text-[#D4AF37] uppercase mt-1 animate-pulse">
            Preparing your showroom…
          </p>
        </div>
      </div>

      <style>{`
        @keyframes drawRing {
          0% {
            stroke-dashoffset: 276;
            transform: rotate(-90deg);
          }
          100% {
            stroke-dashoffset: 0;
            transform: rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
};
