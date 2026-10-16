import React, { useState } from 'react';
import { Camera, Maximize2, X, PlusCircle } from 'lucide-react';
import { siteContent } from '../content/site';

interface GalleryLightboxProps {
  lang: 'en' | 'ta';
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Ceramic', 'PPF', 'Studio', 'Wash', 'Interior'];

  const filteredItems = activeCategory === 'All'
    ? siteContent.galleryItems
    : siteContent.galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#0A0A0B] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Studio Showcase</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {lang === 'en' ? 'Showroom Hall of Fame' : 'புகைப்பட கேலரி'}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {lang === 'en'
              ? 'Unfiltered reflections, hydrophobic angles, and surgical craftsmanship.'
              : 'எங்கள் ஸ்டுடியோவில் மெருகேற்றப்பட்ட வாகனங்களின் அற்புத தோற்றங்கள்.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-manrope font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F1D27A] text-[#0A0A0B] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#141416] border border-[#D4AF37]/25 text-[#F7F3EA]/70 hover:text-[#F1D27A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.image)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#141416] cursor-pointer shadow-lg hover:border-[#D4AF37] transition-all hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width="1200"
                height="900"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFC400] mb-1">
                  {item.category}
                </span>
                <h4 className="font-cinzel font-bold text-sm text-[#F7F3EA] mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </div>
              </div>
            </div>
          ))}

          {/* Dedicated Slot for Real Studio Photos */}
          <div className="relative h-64 sm:h-72 rounded-2xl border-2 border-dashed border-[#D4AF37]/50 bg-[#141416]/50 flex flex-col items-center justify-center p-6 text-center group hover:border-[#D4AF37] transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F1D27A] mb-3 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className="font-cinzel font-bold text-base text-[#F7F3EA] mb-1">
              Real Studio Photos Slot
            </h4>
            <p className="font-manrope text-xs text-[#D4AF37]/80 max-w-xs leading-normal">
              Slot reserved for customer vehicle deliveries and real workshop snaps in Madurai.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/80 text-[#F7F3EA] hover:text-[#D4AF37] border border-[#D4AF37]/50"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Auto Bright Enlarge Preview"
              className="w-full h-auto max-h-[85vh] object-contain bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
};
