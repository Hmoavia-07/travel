'use client';

import React, { useState } from "react";
import Image from 'next/image';
import Header from "../components/header";
import { motion } from "framer-motion";

export default function Homepage() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="w-full min-h-screen bg-yellow-50 md:bg-white bg-[url('/images/Decore.png')] bg-cover bg-center flex flex-col">
      {/* Header at the top */}
      <Header />

      {/* Main Content Section */}
      <div className="flex-1 flex items-center justify-center py-6 md:py-12">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-12 lg:px-48 xl:px-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center md:text-left max-w-lg"
          >
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-orange-600 font-bold text-sm md:text-lg"
            >
              BEST DESTINATION AROUND THE WORLD
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-gray-900 font-bold py-3"
            >
              Travel, enjoy and live a new and full life
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="py-3 max-w-md text-sm md:text-base lg:text-lg text-gray-600"
            >
              Built Wicket longer admire do barton vanity itself do in it, Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
            </motion.p>

            {/* Button Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center md:justify-start items-center space-x-4 md:space-x-8 mt-2"
            >
              <a
                href="#services"
                className="bg-yellow-400 text-white hover:bg-yellow-600 rounded-md px-4 py-2 text-sm md:text-base font-medium shadow-md transition-colors"
              >
                Find out more
              </a>
              <button
                onClick={() => setShowDemoModal(true)}
                className="w-[110px] md:w-[140px] hover:opacity-80 transition-opacity"
                aria-label="Play Demo Video"
              >
                <Image
                  src="/images/Play Demo.png"
                  alt="Play Demo"
                  width={140}
                  height={40}
                  className="w-auto h-auto"
                />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[350px] md:w-[450px] md:h-[500px] lg:w-[550px] lg:h-[600px]"
          >
            <Image
              src="/images/2.png"
              alt="Traveler illustration"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Demo Video Modal */}
      {showDemoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowDemoModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Destination Demo Tour</h3>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
              <Image
                src="/images/destination-4.jpg"
                alt="Demo preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white text-base font-semibold bg-red-500/80 px-4 py-2 rounded-full">
                  ▶ Previewing Rome Tour
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Discover beautiful historic sites, personalized itinerary recommendations, and real-time guided booking with Jadoo.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDemoModal(false)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
