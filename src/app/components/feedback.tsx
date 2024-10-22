'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 sm:px-12 md:px-24 py-16 flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-16 justify-between bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Left Section */}
      <div className="lg:w-1/3">
        <h1 className="text-blue-600 font-semibold text-lg tracking-wide">TESTIMONIALS</h1>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800 leading-tight">
          What People Say About Us.
        </h2>
        <p className="mt-6 text-gray-600">
          Discover why our clients love working with us. Read their experiences and see how we've helped them achieve their goals.
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
            className="bg-white shadow-2xl rounded-lg p-8 relative"
          >
            <FaQuoteLeft className="text-4xl text-blue-200 absolute top-4 left-4" />
            <img 
              src={testimonials[activeTestimonial].image} 
              alt={testimonials[activeTestimonial].name} 
              className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-lg mb-6 mx-auto object-cover"
            />
            <p className="text-gray-700 font-medium text-lg text-center mb-6">
              "{testimonials[activeTestimonial].feedback}"
            </p>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">{testimonials[activeTestimonial].name}</h2>
              <p className="text-blue-500">{testimonials[activeTestimonial].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex justify-between absolute top-1/2 w-full transform -translate-y-1/2 px-4">
          <button 
            onClick={prevTestimonial} 
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-blue-500" />
          </button>
          <button 
            onClick={nextTestimonial} 
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-blue-500" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeTestimonial === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
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
