import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Shield, ArrowUp } from 'lucide-react';
import { siteContent } from '../content/site';

interface FooterProps {
  lang: 'en' | 'ta';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const b = siteContent.business;
  const t = siteContent.uiStrings[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] border-t border-[#D4AF37]/25 pt-20 pb-12 overflow-hidden text-[#F7F3EA]/80 font-manrope">
      {/* Top Gold Hairline Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_#D4AF37]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF37]/15">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#141416] border border-[#D4AF37] p-2 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <span className="font-cinzel font-black text-xl bg-gradient-to-r from-[#FFF0D0] to-[#D4AF37] bg-clip-text text-transparent">AB</span>
              </div>
              <div>
                <span className="font-cinzel font-bold text-xl tracking-[0.16em] text-[#F7F3EA] block">
                  AUTO BRIGHT
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                  CAR WASH &amp; DETAILING STUDIO
                </span>
              </div>
            </div>

            <p className="text-sm text-[#F7F3EA]/70 leading-relaxed mb-6 max-w-sm">
              {lang === 'en'
                ? 'Madurai’s premier royal automotive aesthetic destination. Specialising in 9H/10H ceramic quartz matrix, self-healing PPF, and swirl-free paint correction.'
                : 'மதுரையின் தலைசிறந்த கார் டீடெய்லிங் ஸ்டுடியோ. செராமிக் கோட்டிங் மற்றும் பி.பி.எஃப் சேவைகளில் தனித்துவம்.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141416] border border-[#D4AF37]/30 text-xs text-[#F1D27A]">
              <Shield className="w-4 h-4 text-[#FFC400]" />
              <span>4.8★ Google Rated · 100+ Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-sm font-bold text-[#F7F3EA] uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li><a href="#hero" className="hover:text-[#F1D27A] transition-colors">Home Showroom</a></li>
              <li><a href="#about" className="hover:text-[#F1D27A] transition-colors">About Studio</a></li>
              <li><a href="#services" className="hover:text-[#F1D27A] transition-colors">Core Services</a></li>
              <li><a href="#ceramic-ppf" className="hover:text-[#F1D27A] transition-colors">Ceramic vs PPF</a></li>
              <li><a href="#packages" className="hover:text-[#F1D27A] transition-colors">Royal Packages</a></li>
              <li><a href="#process" className="hover:text-[#F1D27A] transition-colors">5-Step Process</a></li>
              <li><a href="#before-after" className="hover:text-[#F1D27A] transition-colors">Before &amp; After</a></li>
              <li><a href="#gallery" className="hover:text-[#F1D27A] transition-colors">Studio Gallery</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="font-cinzel text-sm font-bold text-[#F7F3EA] uppercase tracking-wider mb-5">
              Specialist Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#services" className="hover:text-[#F1D27A] transition-colors">Ceramic Coating 9H / 10H</a></li>
              <li><a href="#services" className="hover:text-[#F1D27A] transition-colors">Paint Protection Film (PPF)</a></li>
              <li><a href="#services" className="hover:text-[#F1D27A] transition-colors">Paint Correction &amp; Swirl Removal</a></li>
              <li><a href="#services" className="hover:text-[#F1D27A] transition-colors">Premium Snow Foam Wash</a></li>
              <li><a href="#services" className="hover:text-[#F1D27A] transition-colors">Deep Interior Cabin Spa</a></li>
              <li><a href="#services" className="hover:text-[#F1D27A] transition-colors">Headlight Optical Restoration</a></li>
              <li><a href="#services" className="hover:text-[#F1D27A] transition-colors">Alloy Wheel Ceramic Dressing</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="font-cinzel text-sm font-bold text-[#F7F3EA] uppercase tracking-wider mb-5">
              Studio Concierge
            </h4>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-snug text-[#F7F3EA]/80">
                  {b.address.full}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${b.phonePrimary}`} className="font-mono hover:text-[#F1D27A] transition-colors">
                  {b.phonePrimary} / {b.phoneSecondary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{b.openingHoursFormattedEn}</span>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${b.whatsappNumber}?text=Hi%20Auto%20Bright,%20I'd%20like%20to%20book%20a%20car%20detailing%20slot`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141416] border border-[#D4AF37]/40 text-xs font-semibold text-[#F1D27A] hover:bg-[#D4AF37] hover:text-[#0A0A0B] transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat with Auto Bright</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F3EA]/60">
          <div>
            <span>{t.footerCopyright}</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#D4AF37]/80">
              Bagya Arcade · Iyer Bungalow · Madurai 625017
            </span>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-[#D4AF37]/35 bg-[#141416] text-[#F1D27A] hover:bg-[#D4AF37] hover:text-[#0A0A0B] flex items-center justify-center transition-all cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
