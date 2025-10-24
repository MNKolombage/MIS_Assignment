"use client"

import React, { useState, useEffect, useRef } from 'react';

const BG_COLOR = '#FFFBF2';
const ACCENT_BUTTON = '#5F0606';
const ACCENT_TEXT = '#6B3A3A';


// --- Image Data using the User's Local Paths ---
const galleryImages = [
    { id: 1, url: '/Gallery/img1.jpg', alt: 'Luxury Poolside Villa' },
    { id: 2, url: '/Gallery/img2.jpg', alt: 'Lush Garden View' },
    { id: 3, url: '/Gallery/img3.jpg', alt: 'Bedroom Interior' },
    { id: 4, url: '/Gallery/img4.jpg', alt: 'Private Pool Area' },
    { id: 5, url: '/Gallery/img5.jpg', alt: 'Interior Lounge' },
    { id: 6, url: '/Gallery/img6.jpg', alt: 'Outdoor Seating' },
    { id: 7, url: '/Gallery/img7.jpg', alt: 'Spacious Living Room' },
    { id: 8, url: '/Gallery/img8.jpg', alt: 'Ocean View Balcony' },
    { id: 9, url: '/Gallery/img9.jpg', alt: 'Modern Bathroom' },
    { id: 10, url: '/Gallery/img10.jpg', alt: 'Dining Area' },
];

// Mock Image component to replace next/image for canvas environment compatibility
const MockImage = ({ src, alt, layout, objectFit, className, ...props }) => {
    // Style props to simulate layout="fill" and objectFit="cover"
    const style = layout === 'fill' ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: objectFit || 'cover',
    } : {};

    // *** FIX: Using the user's provided local path directly ***
    return <img src={src} alt={alt} className={className} style={style} {...props} />;
};

// Reusable component for the small thumbnail image
const Thumbnail = ({ image, isSelected, onClick, thumbnailRef }) => (
    <div
        ref={thumbnailRef} // Attach ref for auto-scrolling
        className={`group flex-shrink-0 w-36 h-20 sm:w-44 sm:h-24 rounded-lg overflow-hidden snap-start cursor-pointer 
            transition-all duration-300 ease-in-out relative
            ${isSelected 
                ? 'border-4 border-[#6B3A3A] scale-[1.03] shadow-xl shadow-[#6B3A3A]/50' 
                : 'border-2 border-transparent opacity-80 hover:opacity-100 hover:scale-[1.01]'}
            shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-200/80
            `}
        onClick={onClick}
    >
        <MockImage 
            src={image.url} 
            alt={image.alt} 
            layout="fill" 
            objectFit="cover"
        />
    </div>
);


// Main Gallery Component
const App = () => {
    // Stores the index of the currently displayed main image
    const [currentIndex, setCurrentIndex] = useState(0);
    const mainImage = galleryImages[currentIndex];
    // Ref for the horizontally scrollable div
    const carouselRef = useRef(null); 
    // Array of refs for each individual thumbnail
    const thumbnailRefs = useRef([]); 

    // --- EFFECT: Auto-advance the slideshow every 2 minutes (120,000 ms) ---
    useEffect(() => {
        // The interval time in milliseconds (2 minutes)
        // I've kept it at 2 seconds for easy testing. Change to 120 * 1000 for 2 minutes.
        const INTERVAL_MS = 2 * 1000; 

        // Function to advance to the next image
        const advanceSlideshow = () => {
            setCurrentIndex(prevIndex => 
                (prevIndex + 1) % galleryImages.length // Loop back to 0 when reaching the end
            );
        };

        // Set up the interval timer
        const timerId = setInterval(advanceSlideshow, INTERVAL_MS);

        // Clean up the interval when the component unmounts or the effect re-runs
        return () => clearInterval(timerId);
    }, []); 

    // --- EFFECT: Scroll the thumbnail carousel when the main image changes ---
    useEffect(() => {
        const selectedThumbnail = thumbnailRefs.current[currentIndex];
        const carousel = carouselRef.current;

        if (selectedThumbnail && carousel) {
            // Calculate the position needed to center the thumbnail in the carousel view
            const scrollOffset = 
                selectedThumbnail.offsetLeft - 
                carousel.offsetWidth / 2 + 
                selectedThumbnail.offsetWidth / 2;

            // Use smooth scrolling within the carousel container itself
            carousel.scrollTo({
                left: scrollOffset,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]); 


    // Function to handle thumbnail click
    const handleThumbnailClick = (index) => {
        // When the user clicks a thumbnail, they manually select the image,
        // which resets the position for the auto-advancing logic.
        setCurrentIndex(index);
    };

    return (
        // Main container
        <section 
            style={{ fontFamily: 'Inter, sans-serif' }}
            className="w-full py-10 relative bg-[#FFFBF2] flex flex-col justify-center items-center gap-8 overflow-hidden min-h-[600px] 
                        // Custom decorative background elements (simplified for safety)
                        after:content-[''] after:absolute after:w-48 after:h-48 after:top-12 after:left-0 after:bg-red-950/20 after:rounded-[40%_60%_70%_30%_/_30%_30%_70%_70%] after:blur-3xl
                        before:content-[''] before:absolute before:w-48 before:h-48 before:bottom-10 before:right-0 before:bg-yellow-300/20 before:rounded-[60%_40%_30%_70%_/_60%_60%_40%_40%] before:blur-3xl
                        "
        >
            
            {/* --- Header Section --- */}
            <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        <span className="text-black">Our </span>
                        <span style={{ color: ACCENT_TEXT }}>Gallery</span>
                    </h2>
                    <div className="flex flex-col justify-center items-center mt-2 mb-6">
                        <div className="w-10 h-0.5" style={{ backgroundColor: ACCENT_TEXT }}></div>
                    </div>
                    
                </div>

            {/* --- Main Image Area --- */}
            <div className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
                {/* Main Image Container */}
                <div className="w-full h-[280px] sm:h-[400px] lg:h-[500px] rounded-[20px] overflow-hidden 
                            shadow-[0px_76px_250px_0px_rgba(162,167,78,0.30)] 
                            border-8 border-white">
                    <MockImage 
                        key={mainImage.id} 
                        src={mainImage.url} 
                        alt={mainImage.alt} 
                        layout="fill" 
                        objectFit="cover" 
                        className="transition-opacity duration-500"
                    />
                </div>
                
            </div>

            {/* --- Horizontal Scrollable Thumbnail Carousel (The Strip) --- */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-4 z-10">
                <div 
                    ref={carouselRef}
                    className="flex overflow-x-scroll space-x-4 md:space-x-6 pb-2 
                               snap-x snap-mandatory scroll-smooth"
                    // Custom CSS for scrollbar on Webkit (Chrome/Safari)
                    style={{
                        '--webkit-scrollbar-track-bg': 'transparent',
                        '--webkit-scrollbar-thumb-bg': '#D9D9D9',
                        scrollbarWidth: 'thin', // Firefox
                    }}
                >
                    {galleryImages.map((image, index) => (
                        <Thumbnail
                            key={image.id}
                            image={image}
                            isSelected={index === currentIndex}
                            onClick={() => handleThumbnailClick(index)}
                            // Set up the ref for the thumbnail element
                            thumbnailRef={el => thumbnailRefs.current[index] = el}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default App;
