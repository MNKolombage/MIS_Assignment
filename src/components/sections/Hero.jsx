"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  // Local image set for the hero (public/ folder paths)
  const images = [
    '/Gallery/img1.jpg',
    '/Gallery/img2.jpg',
    '/Gallery/img3.jpg',
    '/Gallery/img4.jpg'
  ]

  const [currentImage, setCurrentImage] = useState(0)
  const [selectedVilla, setSelectedVilla] = useState('standard')

  // Auto-rotate hero images every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImage((i) => (i + 1) % images.length)
    }, 5000)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <section id="home" className="py-20 relative">
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={images[currentImage]}
          alt="Villa"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo Overlay 
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-light tracking-widest mb-2">NISALA</h1>
        </div>
      </div> */}

      {/* Nisala Villas Section with Sliding Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-light text-center mb-8 text-gray-500">Nisala villas</h2>

        {/* Sliding Toggle Button */}
        <div className="flex justify-center mb-12">
          <div className="relative bg-gray-100 rounded-full p-1 flex">
            <div
              className={`absolute top-1 bottom-1 bg-red-700 rounded-full transition-all duration-300 ease-in-out ${
                selectedVilla === 'standard' ? 'left-1 right-1/2' : 'left-1/2 right-1'
              }`}
            />
            <button
              onClick={() => setSelectedVilla('standard')}
              className={`relative z-10 pl-8 pr-16 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
                selectedVilla === 'standard' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Nisala Standard Villa
            </button>
            <button
              onClick={() => setSelectedVilla('suite')}
              className={`relative z-10 pl-8 pr-16 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
                selectedVilla === 'suite' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Nisala Suite
            </button>
          </div>
        </div>

        {/* Villa Details Grid */}
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          {/* Image */}
          <div>
            <img
              src={selectedVilla === 'standard' ? '/ns2.jpg' : '/Gallery/img6.jpg'}
              alt="Villa interior"
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-2xl font-light mb-2 text-gray-800">
              {selectedVilla === 'standard' ? 'Nisala Standard Villa' : 'Nisala Suite'}
            </h3>
            <p className="text-sm text-gray-500 mb-6 italic">Enjoy Your Stay</p>

            {selectedVilla === 'standard' ? (
              <>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Enter your private, gated oasis. Our villa, blending modern and elegant design,
                  features vast windows with panoramic views and abundant natural light.
                </p>

                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start"><span className="mr-2">•</span>Outdoor Private Plunge Pool</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Covered Outdoor Sitting / Dining Area</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Free Parking</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Free WiFi</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Free Toiletries</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Breakfast</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Adults Only</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Transportation Services Available</li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Experience ultimate luxury in our premium suite. Featuring expansive living spaces,
                  designer interiors, and exclusive amenities for the most discerning guests seeking
                  an elevated Balinese experience.
                </p>

                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start"><span className="mr-2">•</span>Large Private Infinity Pool</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Spacious Living Room & Dining Area</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Private Chef Services Available</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Premium Bathroom with Bathtub</li>
                  <li className="flex items-start"><span className="mr-2">•</span>King-Size Bedroom</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Free WiFi & Smart TV</li>
                  <li className="flex items-start"><span className="mr-2">•</span>24/7 Concierge Service</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
