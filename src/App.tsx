import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { X } from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { Marquee } from './components/Marquee';
import { AboutStudio } from './components/AboutStudio';
import { ServicesSection } from './components/ServicesSection';
import { CeramicPpfShowcase } from './components/CeramicPpfShowcase';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { PackagesSection } from './components/PackagesSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { GalleryLightbox } from './components/GalleryLightbox';
import { BookingForm } from './components/BookingForm';
import { VisitUs } from './components/VisitUs';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { LoadingScreen } from './components/LoadingScreen';
import type { PackageItem } from './content/site';

export function App() {
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [modalOpen, setModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');

  // Smooth Scrolling with Lenis
  useEffect(() => {
    // Check if prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      const animId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(animId);
        lenis.destroy();
      };
    } catch (e) {
      console.warn('Lenis smooth scroll skipped:', e);
    }
  }, []);

  const handleOpenBooking = (serviceName?: string) => {
    setPrefilledService(serviceName || '');
    setModalOpen(true);
  };

  const handleSelectPackage = (pkg: PackageItem) => {
    setPrefilledService(`${pkg.name} (${pkg.tier} Tier)`);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-[#F7F3EA] selection:bg-[#D4AF37]/30 selection:text-[#F1D27A]">
      {/* 1. Loading Screen */}
      <LoadingScreen />

      {/* 2. Global Sticky Glass Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main>
        {/* 3. 3D Hero Showroom */}
        <Hero3D
          lang={lang}
          onOpenBooking={() => handleOpenBooking('Ceramic Coating 9H / 10H')}
        />

        {/* 4. Gold Trust Marquee */}
        <Marquee lang={lang} />

        {/* 5. About the Studio */}
        <AboutStudio lang={lang} />

        {/* 6. Core Services Grid */}
        <ServicesSection
          lang={lang}
          onSelectService={(svcName) => handleOpenBooking(svcName)}
        />

        {/* 7. Ceramic & PPF Interactive Showcase & Matrix */}
        <CeramicPpfShowcase
          lang={lang}
          onBookProtection={(type) => handleOpenBooking(type)}
        />

        {/* 8. Before & After Draggable Slider */}
        <BeforeAfterSlider lang={lang} />

        {/* 9. Royal Packages */}
        <PackagesSection
          lang={lang}
          onSelectPackage={handleSelectPackage}
        />

        {/* 10. 5-Stage Detailing Process */}
        <ProcessTimeline lang={lang} />

        {/* 11. Google Customer Reviews Carousel */}
        <ReviewsCarousel lang={lang} />

        {/* 12. Studio Gallery with Lightbox */}
        <GalleryLightbox lang={lang} />

        {/* 13. Direct In-Page Booking Bay */}
        <BookingForm
          lang={lang}
          prefilledService={prefilledService}
        />

        {/* 14. Location & Contact Map */}
        <VisitUs lang={lang} />
      </main>

      {/* 15. Royal Footer */}
      <Footer lang={lang} />

      {/* 16. Floating WhatsApp, Mobile Quick Actions & Custom Cursor */}
      <FloatingWidgets onOpenBooking={() => handleOpenBooking()} />

      {/* 17. Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#141416] border-2 border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.4)]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#0A0A0B] text-[#F7F3EA] hover:text-[#D4AF37] border border-[#D4AF37]/40 cursor-pointer"
              aria-label="Close Booking Modal"
            >
              <X className="w-5 h-5" />
            </button>
            <BookingForm
              lang={lang}
              prefilledService={prefilledService}
              isModal={true}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
