"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// --- Custom Colors ---
const BG_COLOR = '#FFFBF2';
const ACCENT_BUTTON = '#5F0606';
const ACCENT_TEXT = '#6B3A3A';

// --- Carousel Data ---
const diningExperiences = [
    {
        id: 0,
        title: "Private Chef Services",
        image: "/our_resturent/private_chef.jpg",
        content: "Immerse yourself in the luxury of having a private chef at your disposal. Our culinary maestros will craft culinary masterpieces right in the villa's kitchen, using locally sourced, fresh ingredients to ensure every bite is a delight. Your villa becomes your own private restaurant, delivering a level of service and quality that surpasses expectations.",
    },
    {
        id: 1,
        title: "Flexibility and Relaxation",
        image: "/our_resturent/relaxing_dining.jpg",
        content: "Escape the constraints of traditional dining schedules. At NISALA VILLA, you set the pace. Enjoy meals at your convenience, allowing for more flexibility during your stay. Whether it's a leisurely breakfast, a poolside lunch, or a candlelit dinner, every moment is yours to savor.",
    },
    {
        id: 2,
        title: "Wine and Beverage Selection",
        image: "/our_resturent/Wine_and_Beverage.jpg",
        content: "Elevate your dining experience with our curated selection of wines and beverages. Choose from an exquisite range to complement your meal and enhance the overall sensory experience. Our villa is equipped with a refined collection to satisfy even the most discerning palate",
    },
    {
        id: 3,
        title: "Celebrations Beyond Compare",
        image: "/our_resturent/celebrations.jpg",
        content: "Celebrate life's special moments in an extraordinary setting. NISALA VILLA is the perfect venue for birthdays, anniversaries, or intimate weddings. Our team will tailor the dining experience to suit your occasion, ensuring it becomes a cherished memory for years to come",
    },
];

export default function OurRestaurant() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState("next");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const transitionDuration = 400; // smoother

    const handleNext = () => {
        if (isTransitioning) return;
        setDirection("next");
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % diningExperiences.length);
            setTimeout(() => setIsTransitioning(false), transitionDuration);
        }, transitionDuration / 2);
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setDirection("prev");
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) =>
                (prev - 1 + diningExperiences.length) % diningExperiences.length
            );
            setTimeout(() => setIsTransitioning(false), transitionDuration);
        }, transitionDuration / 2);
    };

    const currentItem = diningExperiences[currentSlide];
    const totalSlides = diningExperiences.length;

    const CarouselArrow = ({ direction = "left", onClick }) => {
        const Icon = direction === "left" ? ArrowLeft : ArrowRight;
        return (
            <button
                aria-label={direction === "left" ? "Previous Image" : "Next Image"}
                onClick={onClick}
                style={{ backgroundColor: ACCENT_BUTTON }}
                className="w-14 h-14 md:w-16 md:h-16 p-2 rounded-full shadow-xl transition-all duration-300 flex justify-center items-center hover:scale-105 active:scale-95 z-40"
            >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </button>
        );
    };

    return (
        <section
            className="py-12 md:py-20"
            style={{ backgroundColor: BG_COLOR, fontFamily: "Inter, sans-serif" }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* --- HEADER --- */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        <span className="text-black">Dining at </span>
                        <span style={{ color: ACCENT_TEXT }}>Nisala</span>
                    </h2>
                    <div className="flex flex-col justify-center items-center mt-2 mb-6">
                        <div className="w-10 h-0.5" style={{ backgroundColor: ACCENT_TEXT }}></div>
                    </div>
                    <p className="max-w-3xl mx-auto text-base text-black font-normal leading-5 px-4">
                        Indulge in a culinary journey like no other at NISALA VILLA, where every
                        meal is a celebration of flavor, luxury, and the art of fine dining.
                        Nestled in HIKKADUWA, our private villa offers an exclusive and intimate
                        setting to savor delectable dishes curated just for you.
                    </p>
                </div>

                {/* --- CAROUSEL --- */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 mt-10">
                    {/* IMAGE + ARROWS */}
                    <div className="w-full lg:w-3/5 flex justify-center items-center gap-4 relative">
                        <div className="hidden md:block">
                            <CarouselArrow direction="left" onClick={handlePrev} />
                        </div>

                        <div
                            className={`relative h-[380px] sm:h-[420px] lg:h-[480px] w-full max-w-md mx-auto transition-all duration-${transitionDuration}`}
                        >
                            {/* Background stacked visuals */}
                            <div
                                className="hidden sm:block absolute inset-0 rounded-3xl transform rotate-3 -translate-x-4 -translate-y-4 shadow-xl border border-rose-200"
                                style={{ backgroundColor: "#A08983", opacity: 0.4 }}
                            ></div>
                            <div
                                className="hidden sm:block absolute inset-0 rounded-3xl transform -rotate-3 translate-x-4 translate-y-4 shadow-xl border border-rose-200"
                                style={{ backgroundColor: "#A08983", opacity: 0.2 }}
                            ></div>

                            {/* MAIN IMAGE */}
                            <div
                                key={currentItem.id}
                                className={`relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-rose-200 transition-all duration-${transitionDuration} ${
                                    isTransitioning
                                        ? direction === "next"
                                            ? "translate-x-10 opacity-0"
                                            : "-translate-x-10 opacity-0"
                                        : "translate-x-0 opacity-100"
                                }`}
                            >
                                <img
                                    src={currentItem.image}
                                    alt={currentItem.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <CarouselArrow direction="right" onClick={handleNext} />
                        </div>
                    </div>

                    {/* TEXT (unchanged) */}
                    <div
                        className={`w-full lg:w-2/5 flex flex-col justify-start items-start p-4 md:p-0 mt-8 lg:mt-0 transition-opacity duration-${transitionDuration} ${
                            isTransitioning ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        <h3 className="text-4xl font-semibold tracking-wide mb-1">
                            <span style={{ color: ACCENT_TEXT }}>
                                {currentItem.title.split(" ")[0]}
                            </span>
                            <span className="text-black">
                                {" "}
                                {currentItem.title.split(" ").slice(1).join(" ")}
                            </span>
                        </h3>
                        <div
                            className="w-20 h-0.5 mb-6"
                            style={{ backgroundColor: ACCENT_TEXT }}
                        ></div>
                        <p className="text-base font-normal leading-6 text-neutral-700 font-['Manrope']">
                            {currentItem.content}
                        </p>
                    </div>
                </div>

                {/* --- MOBILE CONTROLS --- */}
                <div className="flex justify-center items-center gap-6 mt-12 md:hidden">
                    <CarouselArrow direction="left" onClick={handlePrev} />
                    <span className="text-lg text-gray-700 font-medium">
                        {currentSlide + 1} / {totalSlides}
                    </span>
                    <CarouselArrow direction="right" onClick={handleNext} />
                </div>
            </div>
        </section>
    );
}
