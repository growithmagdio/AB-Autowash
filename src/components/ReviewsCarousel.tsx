import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { siteContent } from '../content/site';

interface ReviewsCarouselProps {
  lang: 'en' | 'ta';
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = siteContent.reviews;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-[#0E0E12] overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
            <Star className="w-3.5 h-3.5 fill-[#FFC400] text-[#FFC400]" />
            <span>4.8★ Rated on Google (100+ Reviews)</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
            {lang === 'en' ? 'Stories from Madurai Motorists' : 'வாடிக்கையாளர் அனுபவங்கள்'}
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
            {lang === 'en'
              ? 'Real words from luxury sedan and SUV owners treated at Auto Bright.'
              : 'எங்கள் சேவையை அனுபவித்த மதுரை வாடிக்கையாளர்களின் கருத்துக்கள்.'}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative rounded-3xl bg-[#141416] border border-[#D4AF37]/35 p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Quote Icon Backdrop */}
            <Quote className="absolute top-6 right-8 w-24 h-24 text-[#D4AF37]/10 pointer-events-none" />

            {/* Placeholder Indicator Note */}
            <div className="inline-block px-3 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[10px] font-mono text-[#F1D27A] mb-6">
              {reviews[currentIndex].isPlaceholderNote}
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1.5 mb-6 text-[#FFC400]">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 text-xs font-mono font-bold text-[#F7F3EA]">
                5.0 / 5.0
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="font-manrope text-base sm:text-xl text-[#F7F3EA] leading-relaxed mb-8 italic">
              "{lang === 'en' ? reviews[currentIndex].comment : reviews[currentIndex].commentTa}"
            </p>

            {/* Author Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-[#D4AF37]/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#141416] p-0.5 flex items-center justify-center font-cinzel font-bold text-lg text-[#0A0A0B]">
                  {reviews[currentIndex].author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-cinzel font-bold text-base text-[#F7F3EA]">
                      {reviews[currentIndex].author}
                    </h4>
                    <CheckCircle className="w-4 h-4 text-[#FFC400]" />
                  </div>
                  <p className="text-xs font-mono text-[#D4AF37]">
                    {reviews[currentIndex].carModel} · {reviews[currentIndex].date}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-[#D4AF37]/35 bg-[#0A0A0B] text-[#F1D27A] hover:bg-[#D4AF37] hover:text-[#0A0A0B] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-xs font-mono text-[#D4AF37]/80">
                  {currentIndex + 1} / {reviews.length}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-[#D4AF37]/35 bg-[#0A0A0B] text-[#F1D27A] hover:bg-[#D4AF37] hover:text-[#0A0A0B] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === i
                    ? 'w-8 bg-[#D4AF37]'
                    : 'w-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
