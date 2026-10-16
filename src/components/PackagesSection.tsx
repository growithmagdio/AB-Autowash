import React from 'react';
import { Crown, Sparkles, Check, MessageCircle } from 'lucide-react';
import { siteContent, type PackageItem } from '../content/site';

interface PackagesSectionProps {
  lang: 'en' | 'ta';
  onSelectPackage: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ lang, onSelectPackage }) => {
  const t = siteContent.uiStrings[lang];

  return (
    <section id="packages" className="relative py-24 sm:py-32 bg-[#0E0E12] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Royal Detailing Packages</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {lang === 'en' ? 'Curated Investment in Perfection' : 'பிரத்யேக பராமரிப்பு பேக்கேஜ்கள்'}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {lang === 'en'
              ? 'Tailored maintenance suites for every automobile, from regular hygiene to heirloom protection.'
              : 'அடிப்படை வாஷ் முதல் முழு கவச பாதுகாப்பு வரையிலான பிரத்யேக திட்டங்கள்.'}
          </p>
        </div>

        {/* 3 Royal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {siteContent.packages.map((pkg) => {
            const isPopular = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#1C1A14] via-[#141416] to-[#0A0A0B] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.3)] lg:-translate-y-4'
                    : 'bg-[#141416] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Most Popular Floating Crown Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFC400] to-[#D4AF37] text-[#0A0A0B] text-xs font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 fill-current" />
                    <span>{t.popularBadge}</span>
                  </div>
                )}

                <div>
                  {/* Card Title & Tier */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                      {pkg.tier} Tier
                    </span>
                    <Sparkles className={`w-5 h-5 ${isPopular ? 'text-[#FFC400]' : 'text-[#D4AF37]/60'}`} />
                  </div>

                  <h3 className="font-cinzel text-2xl font-bold text-[#F7F3EA] mb-2">
                    {lang === 'en' ? pkg.name : pkg.nameTa}
                  </h3>

                  <p className="font-manrope text-xs sm:text-sm text-[#F7F3EA]/70 mb-6 min-h-[40px]">
                    {lang === 'en' ? pkg.desc : pkg.descTa}
                  </p>

                  {/* Price Tag with Placeholder Notice */}
                  <div className="py-4 px-5 rounded-2xl bg-[#0A0A0B]/80 border border-[#D4AF37]/20 mb-8">
                    <div className="font-cinzel text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#FFF0D0] via-[#D4AF37] to-[#F1D27A] bg-clip-text text-transparent">
                      {pkg.pricePlaceholder}
                    </div>
                    <span className="text-[11px] font-manrope text-[#D4AF37]/80 block mt-1">
                      *Price varies with hatchback / sedan / SUV segment
                    </span>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-cinzel font-bold text-[#F7F3EA] uppercase tracking-wider block mb-2">
                      Package Inclusions:
                    </span>
                    {(lang === 'en' ? pkg.features : pkg.featuresTa).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-manrope text-[#F7F3EA]/85">
                        <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#F1D27A]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isPopular
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#D4AF37] text-[#0A0A0B] shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-[1.02]'
                      : 'bg-[#1E1E24] hover:bg-[#D4AF37] text-[#F7F3EA] hover:text-[#0A0A0B] border border-[#D4AF37]/40'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.selectPackage}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Footnote about prices */}
        <div className="text-center mt-12 text-xs font-manrope text-[#F1D27A]/60">
          <span>{t.placeholdersNotice}</span>
        </div>
      </div>
    </section>
  );
};
