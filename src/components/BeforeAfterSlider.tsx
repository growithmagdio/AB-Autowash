import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { siteContent } from '../content/site';

interface BeforeAfterSliderProps {
  lang: 'en' | 'ta';
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ lang }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const t = siteContent.uiStrings[lang];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="before-after" className="relative py-24 sm:py-32 bg-[#0A0A0B] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Royal Transformation</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {lang === 'en' ? 'Before & After Studio Correction' : 'முன் மற்றும் பின் ஒப்பீடு'}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {t.sliderHelp}
          </p>
        </div>

        {/* Draggable Slider Frame */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className="relative h-[380px] sm:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_15px_60px_rgba(0,0,0,0.9)] select-none cursor-ew-resize"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={(e) => handleMove(e.clientX)}
          >
            {/* After Image (Full background layer) */}
            <img
              src="/images/after.webp"
              alt="After paint correction ceramic coating - Auto Bright Madurai"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width="1920"
              height="1080"
            />

            {/* Before Image (Clipped layer on the left) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/images/before.webp"
                alt="Before paint correction with swirl marks"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%'
                }}
                loading="lazy"
                width="1920"
                height="1080"
              />
            </div>

            {/* Badges on Top Left & Top Right */}
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#0A0A0B]/85 backdrop-blur-md border border-white/20 text-xs font-cinzel font-bold tracking-wider text-[#F7F3EA] pointer-events-none">
              {t.beforeLabel}
            </div>
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[#0A0A0B]/85 backdrop-blur-md border border-[#D4AF37] text-xs font-cinzel font-bold tracking-wider text-[#F1D27A] shadow-[0_0_15px_rgba(212,175,55,0.4)] pointer-events-none">
              {t.afterLabel}
            </div>

            {/* Draggable Divider Line & Golden Circular Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFF0D0] via-[#D4AF37] to-[#F1D27A] shadow-[0_0_15px_rgba(212,175,55,0.8)]"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0A0A0B] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.8)] flex items-center justify-center text-[#F1D27A] hover:scale-110 active:scale-95 transition-transform">
                <MoveHorizontal className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Interactive Bottom Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] font-mono text-[#F1D27A] pointer-events-none">
              <span>{Math.round(sliderPosition)}% Correction Split</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between text-xs font-manrope text-[#F7F3EA]/60 px-2">
            <span>Stage 1: Multi-stage polishing eliminates swirls &amp; spider webs</span>
            <span className="text-[#D4AF37]">Stage 2: 9H Ceramic layer seals permanent wet gloss</span>
          </div>
        </div>
      </div>
    </section>
  );
};
