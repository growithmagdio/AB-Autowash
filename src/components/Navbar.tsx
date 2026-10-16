import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Sparkles, Globe } from 'lucide-react';
import { siteContent } from '../content/site';

interface NavbarProps {
  lang: 'en' | 'ta';
  setLang: (lang: 'en' | 'ta') => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = siteContent.uiStrings[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: t.navHome },
    { href: '#about', label: t.navAbout },
    { href: '#services', label: t.navServices },
    { href: '#ceramic-ppf', label: t.navCeramicPpf },
    { href: '#packages', label: t.navPackages },
    { href: '#process', label: t.navProcess },
    { href: '#before-after', label: t.navBeforeAfter },
    { href: '#gallery', label: t.navGallery },
    { href: '#reviews', label: t.navReviews },
    { href: '#visit-us', label: t.navContact }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#090909]/92 backdrop-blur-xl border-b border-[#D9B544]/25 shadow-[0_4px_30px_rgba(0,0,0,0.85)] py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-[#090909]/95 via-[#090909]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Crest */}
          <a href="#hero" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#18181C] to-[#090909] border border-[#D9B544]/50 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(217,181,68,0.25)] group-hover:border-[#D9B544] transition-all">
              <span className="font-cinzel font-black text-lg bg-gradient-to-r from-[#FFF6DD] via-[#D9B544] to-[#F0D478] bg-clip-text text-transparent">
                AB
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel font-bold text-base sm:text-lg tracking-[0.18em] text-[#F7F4ED] group-hover:text-[#D9B544] transition-colors leading-tight">
                  AUTO BRIGHT
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFC400]"></span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-manrope font-semibold tracking-[0.24em] text-[#D9B544]/80">
                Madurai · Detailing Studio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Responsive from lg 1024px+) */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] xl:text-xs uppercase tracking-[0.14em] font-manrope font-medium text-[#B8B5B0] hover:text-[#D9B544] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#D9B544] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#121214] border border-[#D9B544]/35 text-xs font-semibold text-[#F0D478] hover:bg-[#D9B544]/15 transition-all cursor-pointer"
              title="Toggle Language / மொழியை மாற்றுக"
            >
              <Globe className="w-3.5 h-3.5 text-[#D9B544]" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Call Button (Desktop) */}
            <a
              href={`tel:${siteContent.business.phonePrimary}`}
              className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#D9B544]/30 text-xs font-medium text-[#F7F4ED] hover:border-[#D9B544] hover:text-[#D9B544] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#D9B544]" />
              <span className="font-mono">{siteContent.business.phonePrimary}</span>
            </a>

            {/* Book Now Button */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D9B544] via-[#F0D478] to-[#D9B544] text-[#090909] text-xs font-bold uppercase tracking-[0.15em] shadow-[0_0_20px_rgba(217,181,68,0.35)] hover:shadow-[0_0_30px_rgba(217,181,68,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#090909]" />
              <span>{t.bookNow}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#121214] border border-[#D9B544]/35 text-[#D9B544] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#090909]/98 backdrop-blur-2xl border-b border-[#D9B544]/35 animate-in fade-in duration-200">
          {/* Header inside Drawer */}
          <div className="flex items-center justify-between p-5 border-b border-[#D9B544]/20">
            <div className="flex items-center gap-2.5">
              <span className="font-cinzel font-bold text-lg tracking-wider text-[#F7F4ED]">
                AUTO BRIGHT
              </span>
              <span className="text-[10px] uppercase font-mono text-[#D9B544]">
                MADURAI
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-[#121214] border border-[#D9B544]/30 text-[#D9B544]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-3 p-6 overflow-y-auto max-h-[65vh]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-cinzel font-semibold tracking-wider text-[#F7F4ED] hover:text-[#D9B544] border-b border-[#1A1A1E] pb-2.5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#D9B544]/50">→</span>
              </a>
            ))}
          </div>

          <div className="mt-auto p-6 pt-2 flex flex-col gap-3 border-t border-[#D9B544]/20 bg-[#090909]">
            <a
              href={`tel:${siteContent.business.phonePrimary}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#D9B544]/40 text-xs font-bold uppercase tracking-wider text-[#F7F4ED]"
            >
              <Phone className="w-4 h-4 text-[#D9B544]" />
              <span>Call: {siteContent.business.phonePrimary}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D9B544] via-[#F0D478] to-[#D9B544] text-[#090909] text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(217,181,68,0.45)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.bookNow}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
