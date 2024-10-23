'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronRight } from 'react-icons/fa';
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

  // Wrap nextTestimonial in useCallback to memoize it
  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]); // Add nextTestimonial as a dependency to useEffect

  return (
    <div className="bg-yellow-50 md:bg-white px-4 sm:px-12 md:px-32 lg:px-48 py-16 flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-16 justify-between">
      {/* Left Section */}
      <div className="lg:w-1/3">
        <h1 className="text-slate-600 font-semibold text-sm sm:text-lg tracking-wide text-center sm:text-left">TESTIMONIALS</h1>
        <h2 className="text-2xl sm:text-3xl text-center sm:text-left md:text-5xl font-bold mt-2 sm:mt-3 md:mt-4 text-gray-800 leading-tight">
          What People Say About Us.
        </h2>
        <p className="mt-2 sm:mt-3 md:mt-5 lg:mt-6 text-gray-600 text-center sm:text-left text-sm sm:text-lg">
          Discover why our clients love working with us. Read their experiences and see how we&apos;ve helped them achieve their goals.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className="relative w-full lg:w-2/3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-yellow-50 md:bg-white shadow-xl sm:shadow-2xl rounded-lg p-2 sm:p-4 md:p-6 lg:p-8 relative"
          >
            <FaQuoteLeft className="text-xl sm:text-2xl md:text-3xl text-red-100 md:text-slate-200 absolute top-4 left-4 " />
            <Image
              src={testimonials[activeTestimonial].image}
              alt={testimonials[activeTestimonial].name}
              width={96} // specify width
              height={96} // specify height
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-red-100 md:border-slate-100 shadow-lg mb-6 mx-auto object-cover"
            />
            <p className="text-gray-700 font-medium text-sm sm:text-lg text-center mb-3 sm:mb-4 md:mb-6">
              &quot;{testimonials[activeTestimonial].feedback}&quot;
            </p>
            <div className="text-center">
              <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800">{testimonials[activeTestimonial].name}</h2>
              <p className="text-slate-500 text-sm sm:text-lg">{testimonials[activeTestimonial].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute w-full transform -translate-y-1/2 px-4">
          <button
            onClick={prevTestimonial}
            className="p-2 sm:p-3 md:p-5 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            aria-label="Previous testimonial"
          >
            <FaChevronRight className="text-zinc-700" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-3 mt-3 sm:mt-5 md:mt-6 lg:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-5 h-1 sm:w-6 sm:h-2 rounded-full transition-all duration-300 ${
                activeTestimonial === index ? 'bg-slate-500 w-6' : 'bg-gray-300'
              }`}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
