'use client';

import React from "react";
import { IconType } from "react-icons";
import { FaAirbnb, FaHeart, FaLeaf, FaPlaneDeparture } from "react-icons/fa";
import { FaBridge, FaBuildingFlag, FaLandmarkDome, FaMoneyBillTransfer } from "react-icons/fa6";
import Image from "next/image";
import { motion } from "framer-motion";

interface BookingStepProps {
  icon: IconType;
  color: string;
  title: string;
  description: string;
  index: number;
}

const BookingStep: React.FC<BookingStepProps> = ({
  icon: Icon,
  color,
  title,
  description,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -25 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    className="text-left mt-4 sm:mt-8 flex justify-start md:space-x-4 space-x-2 sm:space-x-3"
  >
    <div className={`${color} md:w-16 md:h-16 w-12 h-10 flex justify-center items-center rounded-2xl shadow-md shrink-0`}>
      <Icon size={26} className="text-white" />
    </div>
    <div>
      <h3 className="md:text-xl text-sm font-semibold text-blue-950">{title}</h3>
      <p className="text-gray-600 mt-1 font-normal text-xs sm:text-sm md:text-base">{description}</p>
    </div>
  </motion.div>
);

const TripCard = () => (
  <motion.div
    whileHover={{ y: -8, transition: { duration: 0.25 } }}
    className="md:w-96 sm:w-80 w-60 shadow-2xl rounded-3xl p-4 sm:p-5 bg-white border border-gray-100 shadow-blue-200/50"
  >
    <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-4">
      <Image
        className="object-cover"
        src="/images/Rectangle 17.jpg"
        alt="Trip to Greece"
        fill
        sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, 384px"
      />
    </div>
    <div>
      <h3 className="font-semibold md:text-xl text-lg text-gray-900">Trip To Greece</h3>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-500">14-27 June | by Robbin Flake</p>
      <div className="flex justify-start space-x-3 mt-4 sm:mt-5">
        <div className="bg-slate-100 hover:bg-orange-100 transition-colors p-2.5 rounded-full">
          <FaLeaf size={16} className="text-slate-500" />
        </div>
        <div className="bg-slate-100 hover:bg-orange-100 transition-colors p-2.5 rounded-full">
          <FaBridge size={16} className="text-slate-500" />
        </div>
        <div className="bg-slate-100 hover:bg-orange-100 transition-colors p-2.5 rounded-full">
          <FaAirbnb size={16} className="text-slate-500" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100">
        <div className="items-center space-x-2 flex">
          <FaBuildingFlag className="text-slate-400" />
          <p className="text-xs sm:text-sm text-slate-600">24 people going</p>
        </div>
        <div>
          <FaHeart
            size={20}
            className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
          />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Bookings() {
  const steps = [
    {
      icon: FaLandmarkDome,
      color: "bg-yellow-500",
      title: "Choose Destination",
      description: "Select from our wide range of exciting travel destinations.",
    },
    {
      icon: FaMoneyBillTransfer,
      color: "bg-red-500",
      title: "Make Payment",
      description: "Secure your booking with our quick and easy payment options.",
    },
    {
      icon: FaPlaneDeparture,
      color: "bg-cyan-700",
      title: "Reach Airport On Selected Date",
      description: "Get ready for your journey and arrive at the airport on time.",
    },
  ];

  return (
    <div className="px-4 sm:px-12 md:px-20 lg:px-48 py-8 sm:py-12 md:py-16 lg:py-24 bg-yellow-50 md:bg-white overflow-hidden">
      {/* Flex container for layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-24 xl:space-x-32 justify-between">
        {/* Booking Steps on the left */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 w-full">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-left mb-6"
          >
            <h2 className="md:text-lg text-sm font-semibold text-slate-600">Easy and Fast</h2>
            <h1 className="lg:text-5xl text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Book Your Next Trip in 3 Easy Steps
            </h1>
          </motion.div>

          {/* Booking Steps */}
          <div className="space-y-2">
            {steps.map((step, idx) => (
              <BookingStep
                key={step.title}
                index={idx}
                icon={step.icon}
                color={step.color}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>

        {/* TripCard on the right */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 flex justify-center lg:justify-end w-full lg:pt-8"
        >
          <TripCard />
        </motion.div>
      </div>
    </div>
  );
}
