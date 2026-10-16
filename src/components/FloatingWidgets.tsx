import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { siteContent } from '../content/site';

interface FloatingWidgetsProps {
  onOpenBooking: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ onOpenBooking }) => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const b = siteContent.business;
  const whatsappUrl = `https://wa.me/${b.whatsappNumber}?text=${encodeURIComponent(
    "Hi Auto Bright, I'd like to book a car detailing slot"
  )}`;

  useEffect(() => {
    // Detect touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Smooth trailing ring loop
    let animationId: number;
    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.18,
        y: prev.y + (cursorPos.y - prev.y) * 0.18
      }));
      animationId = requestAnimationFrame(followCursor);
    };
    animationId = requestAnimationFrame(followCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [cursorPos.x, cursorPos.y]);

  return (
    <>
      {/* 1. Custom Desktop Gold Cursor Ring */}
      {!isTouchDevice && (
        <>
          {/* Inner Sharp Dot */}
          <div
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D9B544] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#D9B544]"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          />

          {/* Smooth Trailing Gold Ring */}
          <div
            className={`fixed top-0 left-0 rounded-full border border-[#D9B544] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out ${
              isHovered
                ? 'w-12 h-12 bg-[#D9B544]/15 border-[#FFC400] scale-125 shadow-[0_0_20px_rgba(217,181,68,0.5)]'
                : 'w-7 h-7 bg-transparent border-[#D9B544]/60'
            }`}
            style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
          />
        </>
      )}

      {/* 2. Floating WhatsApp Concierge Button (Desktop & Tablet) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2 group">
        {/* Tooltip bubble on hover */}
        <div className="px-3.5 py-1.5 rounded-xl bg-[#121214]/95 border border-[#D9B544]/40 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-xs font-manrope font-semibold text-[#F0D478] whitespace-nowrap">
            Book on WhatsApp (+91 86105 49845)
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_4px_35px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/20"
          aria-label="Chat with Auto Bright on WhatsApp"
        >
          {/* Subtle Royal Halo */}
          <span className="absolute inset-0 rounded-full border-2 border-[#D9B544] animate-ping opacity-60 pointer-events-none" />
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </div>

      {/* 3. Mobile Bottom Action Bar (Fixed for quick click-to-call & booking) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090909]/95 backdrop-blur-xl border-t border-[#D9B544]/30 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
        <a
          href={`tel:${b.phonePrimary}`}
          className="flex-1 py-3 px-3 rounded-xl bg-[#121214] border border-[#D9B544]/40 text-[#F7F4ED] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:bg-[#D9B544]/20"
        >
          <Phone className="w-4 h-4 text-[#D9B544]" />
          <span>Call Now</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#D9B544] to-[#F0D478] text-[#090909] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(217,181,68,0.4)] active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="w-12 h-12 rounded-xl bg-[#1A1A1E] border border-[#D9B544]/50 text-[#F0D478] flex items-center justify-center shrink-0 active:scale-95"
          aria-label="Book Bay"
        >
          <Calendar className="w-5 h-5 text-[#D9B544]" />
        </button>
      </div>
    </>
  );
};
