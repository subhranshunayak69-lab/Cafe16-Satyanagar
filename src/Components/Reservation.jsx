import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle, Sparkles, Send, Phone } from 'lucide-react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    time: '07:00 PM',
    seatingArea: 'Garden Lawn (Fairy Lights)',
    specialRequest: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const seatingOptions = [
    'Garden Lawn (Fairy Lights)',
    'Indoor Vintage Lounge',
    'Mini-Library Reading Nook',
    'Veranda Balcony',
  ];

  const timeSlots = [
    '11:00 AM', '12:30 PM', '02:00 PM', '04:00 PM', 
    '05:30 PM', '07:00 PM', '08:30 PM', '09:15 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) return;

    // Generate pseudo-random reference code
    const randomRef = 'C16-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(randomRef);
    setIsSubmitted(true);
  };

  const handleWhatsAppConfirm = () => {
    const text = encodeURIComponent(
      `Hello Cafe 16 Satyanagar! I would like to confirm my table reservation:\n\n*Ref:* ${bookingRef}\n*Name:* ${formData.name}\n*Guests:* ${formData.guests}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Seating:* ${formData.seatingArea}`
    );
    window.open(`https://wa.me/917978060887?text=${text}`, '_blank');
  };

  return (
    <section className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      
      {/* SECTION HEADER */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
          Reserve Your Experience
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          Book a Garden or Lounge Table
        </h2>
        <p className="text-stone-400 text-sm max-w-xl mx-auto font-light">
          Enjoy intimate candle-lit evenings in our outdoor bungalow garden or cozy up inside our literary lounge.
        </p>
      </div>

      {isSubmitted ? (
        /* CONFIRMATION CARD */
        <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
              Reservation Received
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">
              We Look Forward to Welcoming You!
            </h3>
            <p className="text-stone-400 text-sm mt-2">
              Your booking reference is <strong className="text-amber-400">{bookingRef}</strong>.
            </p>
          </div>

          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-left max-w-md mx-auto text-xs space-y-2 text-stone-300">
            <div className="flex justify-between">
              <span className="text-stone-500">Guest Name:</span>
              <span className="font-semibold text-white">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Party Size:</span>
              <span className="font-semibold text-white">{formData.guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Date & Time:</span>
              <span className="font-semibold text-white">{formData.date} at {formData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Preferred Area:</span>
              <span className="font-semibold text-amber-400">{formData.seatingArea}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleWhatsAppConfirm}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 text-xs transition-all shadow-lg active:scale-95"
            >
              <Send className="w-4 h-4" /> Confirm via WhatsApp
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full sm:w-auto border border-stone-800 text-stone-300 hover:text-white px-6 py-3 rounded-full text-xs transition-colors"
            >
              Book Another Table
            </button>
          </div>
        </div>
      ) : (
        /* RESERVATION FORM */
        <form
          onSubmit={handleSubmit}
          className="bg-stone-900/80 border border-stone-800/80 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* FULL NAME */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Subhranshu Nayak"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* PHONE NUMBER */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* GUESTS */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Number of Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3-4 Guests</option>
                <option>5-8 Guests (Group)</option>
                <option>9+ Guests (Private Lawn)</option>
              </select>
            </div>

            {/* DATE */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Date *
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* TIME SLOT */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Preferred Time
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* SEATING AREA */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Seating Ambience
              </label>
              <select
                name="seatingArea"
                value={formData.seatingArea}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              >
                {seatingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* SPECIAL REQUESTS */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
              Special Requests or Birthday/Anniversary Setup
            </label>
            <textarea
              name="specialRequest"
              value={formData.specialRequest}
              onChange={handleChange}
              rows={3}
              placeholder="e.g., Anniversary arrangement, quiet corner near library..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-4 rounded-xl text-base transition-all shadow-xl shadow-amber-500/20 active:scale-98"
          >
            Confirm Reservation
          </button>
        </form>
      )}

    </section>
  );
}