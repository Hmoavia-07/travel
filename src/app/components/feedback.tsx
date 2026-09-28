'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Image from 'next/image';

export default function Feedback() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 0,
      name: "Mike Taylor",
      location: "Paris, London",
      image: "/images/rev-thumb-3.png",
      feedback: "The service was amazing! They really went above and beyond to ensure my experience was great.",
    },
    {
      id: 1,
      name: "Alixa Mess",
      location: "Tokyo, Japan",
      image: "/images/rev-thumb-1.png",
      feedback: "I was impressed with how professional and friendly the team was. Will definitely recommend.",
    },
    {
      id: 2,
      name: "Emilie Can",
      location: "Tokyo, Japan",
      image: "/images/rev-thumb-2.png",
      feedback: "From start to finish, the experience was seamless. Great communication and timely service!",
    },
  ];

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <div className="bg-yellow-50 md:bg-white px-4 sm:px-12 md:px-32 lg:px-48 py-16 flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-16 justify-between overflow-hidden">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="lg:w-1/3"
      >
        <h1 className="text-slate-600 font-semibold text-sm sm:text-lg tracking-wide text-center sm:text-left">
          TESTIMONIALS
        </h1>
        <h2 className="text-2xl sm:text-3xl text-center sm:text-left md:text-5xl font-bold mt-2 sm:mt-3 md:mt-4 text-gray-800 leading-tight">
          What People Say About Us.
        </h2>
        <p className="mt-2 sm:mt-3 md:mt-5 lg:mt-6 text-gray-600 text-center sm:text-left text-sm sm:text-lg">
          Discover why our clients love working with us. Read their experiences and see how we&apos;ve helped them achieve their goals.
        </p>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full lg:w-2/3"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="bg-yellow-50 md:bg-white shadow-xl sm:shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 relative border border-gray-100"
          >
            <FaQuoteLeft className="text-xl sm:text-2xl md:text-3xl text-red-200 md:text-slate-200 absolute top-4 left-4" />
            <Image
              src={testimonials[activeTestimonial].image}
              alt={testimonials[activeTestimonial].name}
              width={96}
              height={96}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-red-100 md:border-slate-100 shadow-lg mb-6 mx-auto object-cover"
            />
            <p className="text-gray-700 font-medium text-sm sm:text-lg text-center mb-3 sm:mb-4 md:mb-6 max-w-xl mx-auto">
              &quot;{testimonials[activeTestimonial].feedback}&quot;
            </p>
            <div className="text-center">
              <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800">
                {testimonials[activeTestimonial].name}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm md:text-base">
                {testimonials[activeTestimonial].location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-200 text-zinc-700 hover:text-black cursor-pointer"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-200 text-zinc-700 hover:text-black cursor-pointer"
            aria-label="Next testimonial"
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2.5 mt-4 sm:mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeTestimonial === index ? 'bg-slate-700 w-8' : 'bg-gray-300 w-2.5'
              }`}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
