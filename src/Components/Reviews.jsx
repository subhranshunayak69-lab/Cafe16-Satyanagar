import React, { useState } from 'react';
import { Star, MessageSquareQuote, ThumbsUp, Sparkles, CheckCircle2, User, Send } from 'lucide-react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: 'Ananya Pattnaik',
      rating: 5,
      date: '2 days ago',
      comment:
        'The vintage bungalow vibe is unmatched in Bhubaneswar! Sitting under the fairy lights on the lawn with an Iced Caramel Macchiato and their Iranian Chelo Kababs was pure perfection.',
      likes: 12,
      verifiedGuest: true,
      tag: 'Garden Seating',
    },
    {
      id: 2,
      name: 'Rohan Senapati',
      rating: 5,
      date: '1 week ago',
      comment:
        'Love the Bakul Foundation mini-library integration. Spent a peaceful Sunday afternoon reading with a hot drip coffee and a fresh Nutella brownie. Highly recommend!',
      likes: 8,
      verifiedGuest: true,
      tag: 'Library Lounge',
    },
    {
      id: 3,
      name: 'Siddharth & Dipika',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'Cafe 16 is our favorite aesthetic spot in Satyanagar. Very pet-friendly, peaceful ambiance, and the staff is super warm. The Peri Peri Fries and Cappuccino are top notch.',
      likes: 15,
      verifiedGuest: true,
      tag: 'Pet Friendly',
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    tag: 'Garden Seating',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleRatingClick = (stars) => {
    setNewReview((prev) => ({ ...prev, rating: stars }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const addedReview = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      likes: 0,
      verifiedGuest: true,
      tag: newReview.tag,
    };

    setReviewsList([addedReview, ...reviewsList]);
    setNewReview({ name: '', rating: 5, comment: '', tag: 'Garden Seating' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleLike = (id) => {
    setReviewsList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-12">
      
      {/* SECTION HEADER & OVERALL RATING BANNER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Guest Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            Stories & Reviews
          </h2>
          <p className="text-stone-400 text-sm mt-1 font-light">
            Read what visitors love about our heritage bungalow, garden ambiance, and brews.
          </p>
        </div>

        {/* GOOGLE & OVERALL SCORE STAT */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex items-center gap-4 shrink-0">
          <div className="text-center pr-4 border-r border-stone-800">
            <span className="font-serif text-3xl font-bold text-amber-400 block leading-none">
              4.8
            </span>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider block mt-1">
              Out of 5.0
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-stone-300 font-medium block mt-1">
              Based on 450+ Google Reviews
            </span>
          </div>
        </div>
      </div>

      {/* REVIEWS GRID & LEAVE REVIEW FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REVIEWS LIST (2 COLUMNS) */}
        <div className="lg:col-span-2 space-y-4">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="bg-stone-900/80 border border-stone-800/80 rounded-2xl p-6 space-y-4 hover:border-amber-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white text-sm">
                        {review.name}
                      </h4>
                      {review.verifiedGuest && (
                        <span className="text-[10px] bg-stone-800 text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-stone-700">
                          <CheckCircle2 className="w-3 h-3 text-amber-400" /> Verified Guest
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 block">
                      {review.date} • {review.tag}
                    </span>
                  </div>
                </div>

                {/* STAR RATING */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                "{review.comment}"
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-800/60">
                <button
                  onClick={() => handleLike(review.id)}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.likes})
                </button>
                <span className="text-[10px] text-stone-600">Cafe 16 Satyanagar</span>
              </div>
            </div>
          ))}
        </div>

        {/* WRITE A REVIEW FORM (1 COLUMN) */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 h-fit shadow-xl">
          <div>
            <h3 className="font-serif font-bold text-lg text-white">
              Share Your Experience
            </h3>
            <p className="text-stone-400 text-xs font-light mt-1">
              Did you enjoy the coffee, food, or garden lawn? Let us know!
            </p>
          </div>

          {showSuccess && (
            <div className="bg-green-950/80 border border-green-800 p-3 rounded-xl text-green-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-400" />
              <span>Thank you! Your review has been submitted successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                placeholder="e.g. Subhranshu Nayak"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* RATING STARS SELECTION */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="p-1 text-amber-400 transition-transform active:scale-125"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= newReview.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* AMBIENCE TAG */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block">
                Favorite Spot
              </label>
              <select
                value={newReview.tag}
                onChange={(e) => setNewReview({ ...newReview, tag: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option>Garden Seating</option>
                <option>Library Lounge</option>
                <option>Indoor Vintage</option>
                <option>Veranda Balcony</option>
              </select>
            </div>

            {/* REVIEW COMMENT */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block">
                Review Comments *
              </label>
              <textarea
                required
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="How was the food, coffee, or service?..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" /> Submit Review
            </button>
          </form>
        </div>

      </div>

    </section>
  );
}