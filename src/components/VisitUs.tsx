import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Accessibility } from 'lucide-react';
import { siteContent } from '../content/site';

interface VisitUsProps {
  lang: 'en' | 'ta';
}

export const VisitUs: React.FC<VisitUsProps> = ({ lang }) => {
  const t = siteContent.uiStrings[lang];
  const b = siteContent.business;

  return (
    <section id="visit-us" className="relative py-24 sm:py-32 bg-[#0A0A0B] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Madurai Studio Location</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {t.locationTitle}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {t.locationSubtitle}
          </p>
        </div>

        {/* Grid: Studio Coordinates Card on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Studio Coordinates & Contact Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#141416] border border-[#D4AF37]/35 p-8 sm:p-10 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#FFC400]" />
                <span className="font-cinzel font-bold text-lg text-[#F7F3EA]">
                  AUTO BRIGHT STUDIO
                </span>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#D4AF37]/15">
                <div className="w-10 h-10 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Studio Address
                  </h4>
                  <p className="font-manrope text-sm text-[#F7F3EA]/90 leading-relaxed">
                    {b.address.full}
                  </p>
                  <span className="text-xs font-mono text-[#D4AF37]/80 block mt-1">
                    Landmark: Bagya Arcade, Kumaran Street, Utchaparamedu
                  </span>
                </div>
              </div>

              {/* Contact Numbers (Both Phones) */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#D4AF37]/15">
                <div className="w-10 h-10 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                    {t.contactPhonesTitle}
                  </h4>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <a
                      href={`tel:${b.phonePrimary}`}
                      className="font-mono text-sm font-semibold text-[#F7F3EA] hover:text-[#F1D27A] transition-colors"
                    >
                      {b.phonePrimary} (Primary / WhatsApp)
                    </a>
                    <a
                      href={`tel:${b.phoneSecondary}`}
                      className="font-mono text-sm font-semibold text-[#F7F3EA] hover:text-[#F1D27A] transition-colors"
                    >
                      {b.phoneSecondary} (Concierge Desk)
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours with Placeholder Tag */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      {t.openingHoursTitle}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFC400]/15 text-[#FFC400] border border-[#FFC400]/30">
                      Placeholder: {b.openingHoursPlaceholder}
                    </span>
                  </div>
                  <p className="font-manrope text-sm font-semibold text-[#F7F3EA] mt-1">
                    {lang === 'en' ? b.openingHoursFormattedEn : b.openingHoursFormattedTa}
                  </p>
                  <p className="text-xs font-manrope text-[#F7F3EA]/60 mt-0.5">
                    Early vehicle drop-off and late delivery available by appointment.
                  </p>
                </div>
              </div>

              {/* Accessibility Feature */}
              <div className="p-3.5 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/20 flex items-center gap-3">
                <Accessibility className="w-4 h-4 text-[#FFC400] shrink-0" />
                <span className="text-xs font-manrope text-[#F7F3EA]/80">
                  {lang === 'en' ? b.accessibility : b.accessibilityTa}
                </span>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="pt-8">
              <a
                href={b.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F1D27A] text-[#0A0A0B] text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>{t.getDirections}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative min-h-[420px]">
            <iframe
              title="Auto Bright Car Wash & Detailing Studio Map Madurai"
              src={b.address.googleMapsEmbedUrl}
              className="w-full h-full min-h-[420px] border-0 filter grayscale-[25%] contrast-[110%]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0A0A0B]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-lg pointer-events-none">
              <span className="font-cinzel text-xs font-bold text-[#F1D27A] block">
                AUTO BRIGHT · MADURAI
              </span>
              <span className="text-[11px] font-manrope text-[#F7F3EA]/80">
                Utchaparamedu, Iyer Bungalow, 625017
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
