import React, { useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { siteContent } from '../content/site';

interface CeramicPpfShowcaseProps {
  lang: 'en' | 'ta';
  onBookProtection: (type: string) => void;
}

export const CeramicPpfShowcase: React.FC<CeramicPpfShowcaseProps> = ({ lang, onBookProtection }) => {
  const [activeMode, setActiveMode] = useState<'ceramic' | 'ppf' | 'raw'>('ceramic');
  const [waterBeadSim] = useState(true);

  const t = siteContent.uiStrings[lang];
  const comp = siteContent.comparisonCeramicVsPpf;

  return (
    <section id="ceramic-ppf" className="relative py-24 sm:py-32 bg-[#0E0E12] overflow-hidden">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.comparisonBadge}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {lang === 'en' ? comp.titleEn : comp.titleTa}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {lang === 'en' ? comp.subtitleEn : comp.subtitleTa}
          </p>
        </div>

        {/* Interactive Live Transformation Simulator */}
        <div className="mb-20 rounded-3xl bg-[#141416] border border-[#D4AF37]/30 p-6 sm:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8 pb-6 border-b border-[#D4AF37]/20">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Live Coating &amp; Protection Simulator
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-[#F7F3EA] mt-1">
                Visualise the Surface Transformation
              </h3>
            </div>

            {/* Mode Selector Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30">
              <button
                onClick={() => setActiveMode('raw')}
                className={`px-4 py-2 rounded-lg text-xs font-manrope font-bold transition-all cursor-pointer ${
                  activeMode === 'raw'
                    ? 'bg-[#2A2A30] text-[#F7F3EA] shadow-md'
                    : 'text-[#F7F3EA]/60 hover:text-[#F7F3EA]'
                }`}
              >
                Unprotected (Swirls)
              </button>
              <button
                onClick={() => setActiveMode('ceramic')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-manrope font-bold transition-all cursor-pointer ${
                  activeMode === 'ceramic'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F1D27A] text-[#0A0A0B] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'text-[#F1D27A] hover:bg-[#D4AF37]/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>9H Ceramic Quartz</span>
              </button>
              <button
                onClick={() => setActiveMode('ppf')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-manrope font-bold transition-all cursor-pointer ${
                  activeMode === 'ppf'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F1D27A] text-[#0A0A0B] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'text-[#F1D27A] hover:bg-[#D4AF37]/10'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Self-Healing PPF</span>
              </button>
            </div>
          </div>

          {/* Interactive Simulation Viewport */}
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#D4AF37]/30 group">
            {/* Background Texture Depending on Mode */}
            <img
              src={
                activeMode === 'raw'
                  ? '/images/before.webp'
                  : activeMode === 'ceramic'
                  ? '/images/svc-ceramic.webp'
                  : '/images/svc-ppf.webp'
              }
              alt="Coating surface simulation"
              className="w-full h-full object-cover transition-all duration-700 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-black/40" />

            {/* Hydrophobic Water Beads Particle Simulation Overlay */}
            {waterBeadSim && activeMode !== 'raw' && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                  {[...Array(14)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white/40 backdrop-blur-[1px] border border-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"
                      style={{
                        width: `${8 + (i % 5) * 4}px`,
                        height: `${8 + (i % 5) * 4}px`,
                        top: `${15 + (i * 19) % 70}%`,
                        left: `${10 + (i * 23) % 80}%`,
                        transform: `translateY(${Math.sin(i) * 20}px)`,
                        transition: 'all 1s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Surface Status Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#0A0A0B]/85 backdrop-blur-md border border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFC400]" />
                  <h4 className="font-cinzel text-lg font-bold text-[#F7F3EA]">
                    {activeMode === 'raw'
                      ? 'Dull Factory Paint (Pre-Correction)'
                      : activeMode === 'ceramic'
                      ? 'Certified 9H/10H Nano Ceramic Glass Matrix'
                      : 'Military-Grade Self-Healing Optical PPF'}
                  </h4>
                </div>
                <p className="text-xs font-manrope text-[#F1D27A]/90 mt-1 max-w-xl">
                  {activeMode === 'raw'
                    ? 'Exposed to Madurai UV heat, acidic bird droppings, swirl trails, and oxidation. Low contact angle causes mineral water spots.'
                    : activeMode === 'ceramic'
                    ? 'Hydrophobic water contact angle > 110°. Liquid beads roll off instantly, taking road grime along. Extreme mirror reflection.'
                    : '200-micron elastomeric TPU absorbs stone chips. Micro-scratches automatically self-heal under heat in minutes.'}
                </p>
              </div>

              <button
                onClick={() => onBookProtection(activeMode === 'ppf' ? 'Paint Protection Film (PPF)' : 'Ceramic Coating')}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F1D27A] text-[#0A0A0B] text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer hover:scale-105 transition-all"
              >
                Inquire This Protection
              </button>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#141416]/90 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="p-6 bg-gradient-to-r from-[#1E1E24] via-[#141416] to-[#1E1E24] border-b border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-[#F7F3EA]">
                Head-to-Head Specification Matrix
              </h3>
              <p className="text-xs font-manrope text-[#D4AF37]">
                Compare the performance metrics between Ceramic Coating and PPF
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#F1D27A]">
              <span>★ Auto Bright Studio Standard</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D4AF37]/20 bg-[#0A0A0B]/60 text-xs font-cinzel font-bold text-[#D4AF37] uppercase tracking-wider">
                  <th className="py-4 px-6 w-1/4">Evaluation Criteria</th>
                  <th className="py-4 px-6 w-3/8 text-[#F1D27A]">9H / 10H Ceramic Coating</th>
                  <th className="py-4 px-6 w-3/8 text-[#FFC400]">Paint Protection Film (PPF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10 text-xs sm:text-sm font-manrope">
                {comp.criteria.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#D4AF37]/5 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-[#F7F3EA] bg-[#0A0A0B]/30">
                      {lang === 'en' ? item.feature : item.featureTa}
                    </td>
                    <td className="py-4 px-6 text-[#F7F3EA]/85">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{lang === 'en' ? item.ceramic : item.ceramicTa}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#F7F3EA]/85">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                        <span>{lang === 'en' ? item.ppf : item.ppfTa}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
