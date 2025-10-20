'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function PlanYourTrip() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            image: '/Ella.jpg',
            title: 'Ella',
            points: [
                "Hike Little Adam's Peak",
                'Visit the famous Nine Arch Bridge for sunrise',
                'Flying Ravana Zipline',
                'Take the train to Haputhale and Kandy',
                'Join a Sri Lankan cooking class',
                'Visit Ravana Falls',
                'Visit Lipton Seat',
                'Visit a Tea Factory'
            ]
        },
        {
            image: '/Sigiriya.png',
            title: 'Sigiriya',
            points: [
                'Nestled amidst the lush landscapes of central Sri Lanka, Sigiriya stands as an iconic testament to ancient ingenuity and architectural brilliance. Also known as the "Lion Rock," Sigiriya is a UNESCO World Heritage Site that beckons adventurers, history enthusiasts, and nature lovers alike',
                'Come & see this ancient stone fortress expressed as the eighth wonder of the world. Unbelievable technical, stone methods, wall Arts with beautiful environment shows you the unlimited talent of the Sri Lankan aborigines',
                'The palace is located in the heart of the island between Dambulla and Habarane on a massive rocky plateau 370 meters above sea level'
            ]
        },
        {
            image: '/Galle.jpg',
            title: 'Galle',
            points: [
                'The story of the Galle Dutch Fort; a UNESCO World Heritage Site reverberates through every traveller\'s photos and captions. Initially built by the Portuguese in the 16th century during their conquests, the fort was later fortified and conquered by the Dutch in the 17th century, until it later fell to the might of the British. The old town of Galle was once used as a trading port for spices and other goods for over 200 years. However, today, the fort has been transformed into a place of history, romance and beauty where travellers are warmly welcomed to dive head first into the exotic stories and be a part of this heritage site.'
            ]
        },
        {
            image: '/MaduGanga.jpg',
            title: 'Madu Ganga River Safari',
            points: [
                'The Madu River area surrounding the river are all swampy marshlands covered in mangrove forests.',
                'The forest covers over 61 hectares, that is over 150 acres. 14 of the 24 species of mangroves are found in this area',
                'There are also over 50 kinds of butterflies and 25 kinds of mollusks found in the Madu River zone.',
                'It is interesting to note that mangroves play a huge part in preventing erosion',
                'The large growths of mangrove trees have caused a chain of ecological gain. The soil protected by the mangrove trees is very fertile. This has caused a rich growth of other wetland plants.',
                'Ancient Buddhist Temples.',
				'Fish Massage Therapy.'
            ]
        },
        {
            image: '/Yala.jpg',
            title: 'Yala National Park',
            points: [
                'Yala combines a strict nature reserve with a national park. Divided into 5 blocks, the park has a protected area of nearly 130,000 hectares of land consisting of light forests, scrubs, grasslands, tanks and lagoons. Two blocks are currently opened to the public',
                'Situated in Sri Lanka\'s south-east hugging the panoramic Indian Ocean, Yala was designated a wildlife sanctuary in 1900 and was designated a national park in 1938. Ironically, the park was initially used as a hunting ground for the elite under British rule. Yala is home to 44 varieties of mammal and 215 bird species. Among its more famous residents are the world\'s biggest concentration of leopards, majestic elephants, sloth bears, sambars, jackals, spotted dear, peacocks, and crocodiles. The best time to visit Yala is between February and July when the water levels of the park are quite low, bringing animals into the open.'
            ]
        },
        {
            image: '/WhaleWatching.jpg',
            title: 'Whale Watching Mirissa',
            points: [
                'Go whale watching in Mirissa for a memorable and ethical experience!',
                'With luck, you might be an able to get a chance to see bright dolphin species as their pods leap and swim',
                'The engines of the boat are switched off to ensure a peaceful and a playful environment for the animals',
                'You can also see turtles and various species of fish, such as the Bluefin Tuna and Flying fish'
            ]
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [slides.length])

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-4xl font-bold mb-3 text-center uppercase">PLAN YOUR TRIP</h3>
                <p className="text-gray-600 text-center mb-8">Embark on a seamless adventure planning experience with NISALA VILLA. We understand that every traveler is unique, and so is their journey. Let us be your guide as you curate the perfect itinerary, unlocking a world of possibilities and unforgettable memories.</p>
            </div>
            <div className="relative w-full mt-8">
                <Image 
                    src="/SriLanka.jpg" 
                    alt="Sri Lanka" 
                    width={1920} 
                    height={600}
                    className="w-full h-[75vh] object-cover brightness-50"
                />
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative h-full flex items-center">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center absolute w-full transition-all duration-1000 ease-in-out ${
                                    index === currentSlide 
                                        ? 'opacity-100 translate-x-0' 
                                        : index < currentSlide 
                                        ? 'opacity-0 -translate-x-full' 
                                        : 'opacity-0 translate-x-full'
                                }`}
                            >
                                {/* Left side - the image */}
                                <div className="flex items-center justify-center">
                                    <div className="relative w-[500px] h-[400px]">
                                        <Image 
                                            src={slide.image} 
                                            alt={slide.title} 
                                            fill
                                            className="rounded-lg shadow-2xl object-cover transform transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                                
                                {/* Right side - Text content */}
                                <div className="text-white space-y-6">
                                    <h2 className="text-4xl font-bold uppercase transform transition-all duration-700 delay-100">{slide.title}</h2>
                                    
                                    <div className="space-y-4">
                                        {slide.points.map((point, pointIndex) => (
                                            <div 
                                                key={pointIndex} 
                                                className="flex items-start gap-3 transform transition-all duration-500"
                                                style={{ transitionDelay: `${pointIndex * 50}ms` }}
                                            >
                                                <span className="text-2xl">✓</span>
                                                <p className="text-lg">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Navigation */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
