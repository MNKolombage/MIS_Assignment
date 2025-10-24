"use client"

import React from 'react';
const BG_COLOR = '#FFFBF2';
const ACCENT_BUTTON = '#5F0606';
const ACCENT_TEXT = '#6B3A3A';
// --- MOCK DATA ---
const reviews = [
  {
    id: 1,
    rating: 5,
    text: "Beautiful Property in the middle of a green setting.. Beautifully done interiors and most helpful staff. The rooms very large and spacious and the pool was also a very good size... Breakfast was given in our rooms or outside and was really good as well.",
    author: 'Mahtab',
    title: 'Frequent Traveler',
    image: '/review section/profile1.jpg',
  },
  {
    id: 2,
    rating: 4,
    text: 'NISALA VILLAS is a collection of just 3 luxury pool villas in a lovely setting in the heart of the countryside.The staff are the most wonderful people who gaveus a very warm welcome and were waiting at the door for us when we arrived',
    author: 'Sabrina',
    title: 'Loyal Guest',
    image: '/review section/profile2.jpg',
  },
  {
    id: 3,
    rating: 5,
    text: 'We had the most AMAZING stay at this villa I did not want to leave! Hashan looked after us during our stay and was so friendly and helpful he sorted out everything we needed, literally anything we asked. Just wow!',
    author: 'Lauren Hughes',
    title: 'Regular customer',
    image: '/review section/profile3.jpg',
  },
  {
    id: 4,
    rating: 4,
    text: 'Superb Place to stay.. Everything is so great. Nice and friendly staff. Foods also very tasty.. / will definitely come again.. Thanks for making our honeymoon beautiful.',
    author: 'Tharaka Lakmal',
    title: 'Premium customer',
    image: '/review section/profile4.jpg',
  },
  {
    id: 5,
    rating: 5,
    text: 'NISALA VILLAS is a collection of just 3 luxury pool villas in a lovely setting in the heart of the countryside.The staff are the most wonderful people who gave us a very warm welcome and were waiting at the door for us when we arrived',
    author: 'Mazzapn',
    title: 'Business Traveller',
    image: '/review section/profile5.jpg',
  },
];

const StarIcon = ({ fill }) => (
  <svg className={`w-6 h-6 ${fill}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const ReviewCard = React.memo(({ review }) => {
  const activeStarColor = "text-red-900";
  const inactiveStarColor = "text-rose-200";
  const cardBgColor = "bg-[#FFFBF2]";

  return (
    <div
      className={`w-[90vw] md:w-[600px] lg:w-[calc(50vw-2rem)] xl:w-[570px] flex-shrink-0 p-6 ${cardBgColor}
        rounded-xl shadow-lg flex flex-col md:flex-row justify-start items-center gap-4 overflow-hidden`}
    >
      <div className="flex-1 flex flex-col justify-start items-start gap-4 order-2 md:order-1 w-full">
        <div className="flex justify-start items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} fill={i < review.rating ? activeStarColor : inactiveStarColor} />
          ))}
        </div>

        <p className="text-zinc-800 text-sm leading-relaxed italic">
          "{review.text}"
        </p>

        <div className="mt-2">
          <div className="text-red-950 text-xl font-semibold">{review.author}</div>
          <div className="text-neutral-500 text-sm">{review.title}</div>
        </div>
      </div>

      <img
        className="w-full md:w-auto md:max-w-xs flex-1 rounded-md order-1 md:order-2 object-cover aspect-square"
        src={review.image}
        alt={review.author}
        loading="lazy"
      />
    </div>
  );
});

export default function Review() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const cardRefs = React.useRef([]);
  const carouselRef = React.useRef(null);
  const reviewsCount = reviews.length;
  const mounted = React.useRef(false);

  // ✅ Scroll to top once
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Auto-slide only the carousel horizontally (centered)
  React.useEffect(() => {
    mounted.current = true;
    const interval = setInterval(() => {
      if (!mounted.current || !carouselRef.current) return;

      setActiveIndex((prev) => {
        const next = (prev + 1) % reviewsCount;
        const container = carouselRef.current;
        const nextCard = cardRefs.current[next];

        if (nextCard && container) {
          const containerCenter = container.clientWidth / 2;
          const cardCenter =
            nextCard.offsetLeft - container.offsetLeft + nextCard.clientWidth / 2;
          const scrollLeft = cardCenter - containerCenter;

          container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          });
        }

        return next;
      });
    }, 2500);

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [reviewsCount]);

  // ✅ Manual dot click scroll (centered)
  const scrollToCard = (index) => {
    const container = carouselRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const containerCenter = container.clientWidth / 2;
      const cardCenter =
        card.offsetLeft - container.offsetLeft + card.clientWidth / 2;
      const scrollLeft = cardCenter - containerCenter;

      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  return (
    <section 
      className="w-full py-14 bg-white" 
      style={{ fontFamily: "Inter, sans-serif" }} // 👈 ADDED FONT STYLE HERE
    >
      <div className="max-w-7xl mx-auto px-0 sm:px-10 lg:px-20 flex flex-col items-center gap-10">
        {/* Header */}
        <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        <span className="text-black">Customer </span>
                        <span style={{ color: ACCENT_TEXT }}>Feedback</span>
                    </h2>
                    <div className="flex flex-col justify-center items-center mt-2 mb-6">
                        <div className="w-10 h-0.5" style={{ backgroundColor: ACCENT_TEXT }}></div>
                    </div>
                    
                </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="w-full flex justify-start gap-8 px-6 sm:px-0 overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
          style={{
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {reviews.map((r, i) => (
            <div
              key={r.id}
              className="snap-center pt-2 pb-6"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <ReviewCard review={r} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex gap-4 justify-center">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`w-3 h-3 rounded-full border border-red-800 transition-all duration-300 ${
                i === activeIndex ? "bg-red-800 w-4 h-4" : "opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}