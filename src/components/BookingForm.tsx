import React, { useState } from 'react';
import { Calendar, Car, Phone, User, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../content/site';

interface BookingFormProps {
  lang: 'en' | 'ta';
  prefilledService?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  lang,
  prefilledService = '',
  isModal = false,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    service: prefilledService || 'Ceramic Coating 9H / 10H',
    dateTime: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const t = siteContent.uiStrings[lang];

  const servicesList = [
    'Premium Car Wash',
    'Detailing Perfection',
    'Ceramic Coating (9H/10H)',
    'Paint Protection Film (PPF)',
    'Paint Correction & Swirl Removal',
    'Royal Interior Detailing',
    'Headlight Restoration',
    'Wheel & Tyre Detailing',
    'Silver Royal Wash Package',
    'Gold Detailing & Polish Package',
    'Royal Ceramic & PPF Suite'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.carModel) {
      alert(lang === 'en' ? 'Please fill in your name, phone, and car model.' : 'தயவுசெய்து உங்கள் பெயர், தொலைபேசி மற்றும் கார் மாடலை நிரப்பவும்.');
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D9B544', '#F0D478', '#A78320', '#F7F4ED']
      });
    } catch {}

    setSubmitted(true);

    const message = `*AUTO BRIGHT BOOKING ENQUIRY*
━━━━━━━━━━━━━━━━━━
👑 *Client Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
🚗 *Vehicle:* ${formData.carModel}
✨ *Requested Service:* ${formData.service}
🗓 *Preferred Schedule:* ${formData.dateTime || 'Earliest Available Bay'}
📝 *Special Instructions:* ${formData.notes || 'None'}
━━━━━━━━━━━━━━━━━━
_Sent via Auto Bright Royal Web App (Madurai)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteContent.business.whatsappNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      if (onClose) onClose();
    }, 900);
  };

  return (
    <section id="book-slot" className={`relative ${isModal ? 'p-0' : 'py-24 sm:py-32 bg-[#0E0E12]'}`}>
      <div className={`relative max-w-4xl mx-auto ${isModal ? 'p-6 sm:p-8' : 'px-4 sm:px-6 lg:px-8'}`}>
        {!isModal && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141416] border border-[#D4AF37]/30 text-xs font-semibold tracking-[0.2em] uppercase text-[#F1D27A] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Priority Studio Reservation</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F3EA] mb-4">
              {t.bookingTitle}
            </h2>
            <p className="font-cormorant italic text-lg sm:text-xl text-[#D4AF37]">
              {t.bookingSubtitle}
            </p>
          </div>
        )}

        <div className="rounded-3xl bg-[#141416] border-2 border-[#D4AF37]/40 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Subtle Studio Hexagon Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-[#F1D27A] mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#FFC400]" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-[#F7F3EA] mb-2">
                Connecting to Auto Bright WhatsApp...
              </h3>
              <p className="font-manrope text-sm text-[#D4AF37]">
                Your booking details have been formatted. Click below if WhatsApp did not open automatically.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                    {t.nameLabel} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vignesh Sundar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 text-sm text-[#F7F3EA] placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                    {t.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 text-sm text-[#F7F3EA] placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Car Make & Model */}
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                    {t.carModelLabel} *
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyundai Creta / BMW 3 Series"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 text-sm text-[#F7F3EA] placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Desired Service Selection */}
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                    {t.serviceLabel} *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 text-sm text-[#F7F3EA] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    >
                      {servicesList.map((svc) => (
                        <option key={svc} value={svc} className="bg-[#141416] text-[#F7F3EA]">
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div>
                <label className="block text-xs font-cinzel font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                  {t.dateLabel}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow at 10:30 AM"
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 text-sm text-[#F7F3EA] placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-cinzel font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                  {t.notesLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention paint swirls, leather stains, or specific requests..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-[#D4AF37]/30 text-sm text-[#F7F3EA] placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F1D27A] to-[#D4AF37] text-[#0A0A0B] text-sm font-bold uppercase tracking-[0.18em] shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t.submitBooking}</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#D4AF37]/80 text-center">
                <span>Direct WhatsApp to +91 86105 49845</span>
                <span>•</span>
                <span>Instant Confirmation</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
