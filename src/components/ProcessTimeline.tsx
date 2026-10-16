import React from 'react';
import { Sparkles, Search, Droplets, Magnet, Compass, ShieldCheck } from 'lucide-react';
import { siteContent } from '../content/site';

interface ProcessTimelineProps {
  lang: 'en' | 'ta';
}

const STEP_ICONS = [Search, Droplets, Magnet, Compass, ShieldCheck];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ lang }) => {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#0A0A0B] overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <img
          src="/images/process-bg.webp"
          alt="Auto Bright process background"
          className="w-full h-full object-cover"
          loading="lazy"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-[#0A0A0B] via-[#0A0A0B]/85 to-[#0A0A0B]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The 5-Stage Royal Protocol</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {lang === 'en' ? 'Our Detailing Process' : 'எங்கள் 5-படிமுறை செய்முறை'}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {lang === 'en'
              ? 'No shortcuts. Surgical precision at every milestone under 6000K daylight simulation.'
              : 'எந்தவித சமரசமும் இன்றி ஒவ்வொரு படிநிலையிலும் செய்யப்படும் அதிநுட்பமான வேலைப்பாடு.'}
          </p>
        </div>

        {/* Desktop Connected Line + 5 Step Cards */}
        <div className="relative">
          {/* Golden Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-8 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-0 opacity-60" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {siteContent.processSteps.map((step, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];

              return (
                <div
                  key={step.stepNumber}
                  className="group relative rounded-2xl p-6 bg-[#141416]/85 backdrop-blur-md border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                >
                  {/* Step Number & Glowing Icon Header */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-cinzel text-3xl font-black bg-gradient-to-r from-[#D4AF37] to-[#F1D27A] bg-clip-text text-transparent opacity-80 group-hover:opacity-100 transition-opacity">
                        {step.stepNumber}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/40 flex items-center justify-center text-[#F1D27A] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all">
                        <Icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                    </div>

                    <h3 className="font-cinzel text-lg font-bold text-[#F7F3EA] group-hover:text-[#F1D27A] transition-colors mb-2">
                      {lang === 'en' ? step.title : step.titleTa}
                    </h3>

                    <p className="font-manrope text-xs text-[#F7F3EA]/75 leading-relaxed mb-4">
                      {lang === 'en' ? step.desc : step.descTa}
                    </p>
                  </div>

                  {/* Micro Detail Pill */}
                  <div className="pt-4 border-t border-[#D4AF37]/15">
                    <span className="text-[11px] font-manrope text-[#D4AF37]/90 leading-tight block">
                      {step.detail}
                    </span>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FFC400] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
