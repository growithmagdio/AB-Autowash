import React from 'react';
import { Sparkles, CheckCircle2, Accessibility } from 'lucide-react';
import { siteContent } from '../content/site';

interface AboutStudioProps {
  lang: 'en' | 'ta';
}

export const AboutStudio: React.FC<AboutStudioProps> = ({ lang }) => {
  const t = siteContent.uiStrings[lang];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0A0A0B] overflow-hidden">
      {/* Background Subtle Hex Pattern */}
      <div className="absolute inset-0 hex-pattern-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Madurai's Detailing Sanctuary</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {t.aboutTitle}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Grid: Image on Left + Story on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-20">
          {/* Studio Image with Gold Frame & Honeycomb Reflection */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
              <img
                src="/images/studio-interior.webp"
                alt="Auto Bright luxury car detailing studio interior Madurai Utchaparamedu"
                className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width="1920"
                height="1080"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-80" />

              {/* Studio Badge Floating on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0A0A0B]/85 backdrop-blur-md border border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FFC400] animate-pulse" />
                  <div>
                    <h4 className="font-cinzel font-semibold text-sm text-[#F7F3EA]">
                      Honeycomb Detailing Bay
                    </h4>
                    <p className="text-xs font-manrope text-[#F1D27A]/80">
                      Iyer Bungalow, Madurai · Dust-Controlled Studio
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFC400]/15 border border-[#FFC400]/30 text-[11px] font-semibold text-[#FFC400]">
                  <Accessibility className="w-3.5 h-3.5" />
                  <span>{siteContent.business.accessibility}</span>
                </div>
              </div>
            </div>

            {/* Decorative Gold Corner Lines */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />
          </div>

          {/* Story & Differentiators */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="font-cinzel text-2xl font-bold text-[#F7F3EA] mb-4">
              Precision Crafted Under 6000K Honeycomb Light
            </h3>
            <p className="font-manrope text-sm sm:text-base text-[#F7F3EA]/75 leading-relaxed mb-6">
              {t.aboutStory}
            </p>

            {/* Studio Key Pillars */}
            <div className="space-y-4 mb-8">
              {[
                { title: 'True Swirl Removal', desc: 'No silicon fillers or temporary glazes; we measure clearcoat microns and perform permanent optical correction.' },
                { title: 'Certified Ceramic Matrix', desc: 'Authorized 9H/10H quartz coatings engineered to withstand Madurai’s harsh sun and airborne dust.' },
                { title: 'Surgical PPF Installation', desc: 'Self-healing optical TPU with edge-wrapped precision so the film remains virtually invisible.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#141416]/60 border border-[#D4AF37]/15">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-manrope font-bold text-sm text-[#F7F3EA]">{item.title}</h5>
                    <p className="font-manrope text-xs text-[#F7F3EA]/65 mt-0.5 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-manrope text-[#D4AF37]">
              <span className="font-mono bg-[#141416] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
                Studio Signature: Black Interior · Gold Crests · Yellow Floor Markings
              </span>
            </div>
          </div>
        </div>

        {/* Royal Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {siteContent.stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-[#141416] to-[#0E0E12] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all text-center group hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <div className="font-cinzel text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#FFF0D0] via-[#D4AF37] to-[#F1D27A] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="font-manrope font-semibold text-sm text-[#F7F3EA] mb-1">
                {lang === 'en' ? stat.labelEn : stat.labelTa}
              </div>
              <div className="font-manrope text-xs text-[#D4AF37]/80">
                {stat.sub}
              </div>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FFC400] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
