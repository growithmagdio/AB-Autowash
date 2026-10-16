import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowUpRight, Check, X } from 'lucide-react';
import { siteContent, type ServiceItem } from '../content/site';

interface ServicesSectionProps {
  lang: 'en' | 'ta';
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const t = siteContent.uiStrings[lang];

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#0A0A0B] overflow-hidden">
      {/* Decorative Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/35 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Mastercraft Automotive Spa</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {lang === 'en' ? 'Our Detailing Services' : 'எங்கள் சிறப்பு சேவைகள்'}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {lang === 'en'
              ? 'Surgical perfection for the exterior, interior, and mechanical heart of your machine.'
              : 'உங்கள் காரின் வெளிப்புறம், உட்புறம் மற்றும் இயந்திர பாகங்களுக்கான நுட்பமான பராமரிப்பு.'}
          </p>
        </div>

        {/* Services Cards Grid with 3D Tilt Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.services.map((svc) => (
            <div
              key={svc.id}
              className="group relative rounded-2xl bg-gradient-to-b from-[#141416] via-[#111114] to-[#0A0A0B] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-500 flex flex-col overflow-hidden hover:shadow-[0_0_35px_rgba(212,175,55,0.28)] hover:-translate-y-1.5"
            >
              {/* Image Container with Zoom & Badge */}
              <div className="relative h-56 sm:h-60 overflow-hidden">
                <img
                  src={svc.image}
                  alt={`${svc.name} - Auto Bright Madurai Detailing`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width="1200"
                  height="900"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/30 to-transparent" />

                {/* Tag Badge */}
                {svc.tag && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0A0A0B]/80 backdrop-blur-md border border-[#D4AF37]/50 text-[10px] font-bold uppercase tracking-wider text-[#F1D27A]">
                    {svc.tag}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[#F7F3EA] group-hover:text-[#F1D27A] transition-colors mb-2">
                    {lang === 'en' ? svc.name : svc.nameTa}
                  </h3>
                  <p className="font-manrope text-xs sm:text-sm text-[#F7F3EA]/70 mb-5 line-clamp-2">
                    {lang === 'en' ? svc.shortDesc : svc.shortDescTa}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    {(lang === 'en' ? svc.highlights : svc.highlightsTa).map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-manrope text-[#D4AF37]/90">
                        <Check className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalService(svc)}
                    className="text-xs font-manrope font-semibold text-[#F7F3EA]/70 hover:text-[#F1D27A] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{t.viewDetails}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>

                  <button
                    onClick={() => onSelectService(svc.name)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F1D27A] text-[#0A0A0B] text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.enquireNow}</span>
                  </button>
                </div>
              </div>

              {/* Accent Line on Bottom */}
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF37] via-[#FFC400] to-[#F1D27A] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-2xl w-full rounded-2xl bg-[#141416] border border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.3)] overflow-hidden">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0A0A0B]/80 text-[#F7F3EA] hover:text-[#D4AF37] border border-[#D4AF37]/40"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64">
              <img
                src={activeModalService.image}
                alt={activeModalService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="inline-block px-3 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-mono text-[#F1D27A] mb-3">
                {activeModalService.tag}
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-[#F7F3EA] mb-3">
                {lang === 'en' ? activeModalService.name : activeModalService.nameTa}
              </h3>
              <p className="font-manrope text-sm text-[#F7F3EA]/80 leading-relaxed mb-6">
                {lang === 'en' ? activeModalService.fullDesc : activeModalService.fullDescTa}
              </p>

              <div className="bg-[#0A0A0B] p-4 rounded-xl border border-[#D4AF37]/20 mb-6">
                <h4 className="font-cinzel text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                  Service Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-manrope text-[#F7F3EA]/80">
                  {(lang === 'en' ? activeModalService.highlights : activeModalService.highlightsTa).map((hl, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FFC400]" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-5 py-2.5 rounded-lg border border-white/20 text-xs font-manrope font-semibold text-[#F7F3EA]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = activeModalService.name;
                    setActiveModalService(null);
                    onSelectService(name);
                  }}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F1D27A] text-[#0A0A0B] text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  Book on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
