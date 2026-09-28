'use client';

import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function DestinationsSection() {
  const destinations = [
    { name: 'Rome, Italy', price: '$4.2k', duration: '10 days trip', image: '/images/destination-4.jpg' },
    { name: 'Paris, London', price: '$5.2k', duration: '18 days trip', image: '/images/destination-6.jpg' },
    { name: 'Shanghai, China', price: '$3.5k', duration: '12 days trip', image: '/images/destination-1.jpg' },
    { name: 'Santorini, Greece', price: '$4.8k', duration: '8 days trip', image: '/images/destination-2.jpg' },
    { name: 'Tokyo, Japan', price: '$5.6k', duration: '14 days trip', image: '/images/destination-3.jpg' },
    { name: 'London, UK', price: '$4.1k', duration: '7 days trip', image: '/images/destination-5.jpg' },
  ];

  return (
    <div className="py-16 sm:py-10 md:py-7 lg:py-20 bg-yellow-50 md:bg-white">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h1 className="text-lg font-semibold text-gray-600 mb-2">
          Top Selling
        </h1>
        <h2 className="text-4xl font-bold text-gray-800">Top Destinations</h2>
      </motion.div>

      {/* Cards */}
      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 flex flex-col"
            >
              <div className="relative h-60 sm:h-64 md:h-72 w-full">
                <Image
                  src={destination.image}
                  alt={`${destination.name} tour image`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="rounded-t-2xl object-cover"
                />
              </div>
              <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{destination.name}</h3>
                  <span className="text-base font-bold text-blue-900">{destination.price}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FaCalendarAlt className="mr-2 text-yellow-500" />
                  <span>{destination.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
