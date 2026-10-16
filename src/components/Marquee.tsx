import React from 'react';
import { siteContent } from '../content/site';

interface MarqueeProps {
  lang: 'en' | 'ta';
}

export const Marquee: React.FC<MarqueeProps> = ({ lang }) => {
  const items = lang === 'en' ? siteContent.trustMarquee : siteContent.trustMarqueeTa;

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#0E0E12] via-[#16161A] to-[#0E0E12] py-4 border-y border-[#D4AF37]/30 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
      {/* Side Vignettes for Infinite Smooth Blend */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-5">
            <span className="font-cinzel text-sm sm:text-base font-semibold tracking-[0.2em] uppercase bg-gradient-to-r from-[#FDF0CD] via-[#D4AF37] to-[#F1D27A] bg-clip-text text-transparent">
              {item}
            </span>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#FFC400] shadow-[0_0_8px_#FFC400]" />
          </div>
        ))}
      </div>
    </div>
  );
};
