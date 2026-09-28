'use client';

import React, { useState } from "react";
import { IconType } from "react-icons";
import {
  FaAirbnb,
  FaHeart,
  FaLeaf,
  FaPlaneDeparture,
  FaCheck,
  FaShieldAlt,
  FaCreditCard,
  FaTimes,
  FaCalendarCheck,
  FaUserFriends,
  FaShareAlt,
  FaCheckCircle,
  FaTag
} from "react-icons/fa";
import {
  FaBridge,
  FaBuildingFlag,
  FaLandmarkDome,
  FaMoneyBillTransfer,
  FaCircleCheck,
  FaPlaneUp
} from "react-icons/fa6";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BookingStepItem {
  icon: IconType;
  color: string;
  title: string;
  description: string;
  badge: string;
  interactiveContent: {
    actionLabel: string;
    details: string;
    metrics: string;
  };
}

interface TripCardData {
  id: string;
  title: string;
  dates: string;
  organizer: string;
  image: string;
  price: number;
  formattedPrice: string;
  goingCount: number;
  completedPercent?: number;
  statusText?: string;
}

export default function Bookings() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [activeBadgeTooltip, setActiveBadgeTooltip] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<string>("Trip To Greece");
  const [selectedGuests, setSelectedGuests] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>("2026-06-14");
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string>("");

  const tripData: TripCardData[] = [
    {
      id: "greece",
      title: "Trip To Greece",
      dates: "14-27 June",
      organizer: "Robbin Flake",
      image: "/images/Rectangle 17.jpg",
      price: 3850,
      formattedPrice: "$3,850",
      goingCount: 24,
      statusText: "Verified Departure"
    },
    {
      id: "rome",
      title: "Trip To Rome",
      dates: "20-30 July",
      organizer: "Elena Rossi",
      image: "/images/destination-4.jpg",
      price: 4200,
      formattedPrice: "$4,200",
      goingCount: 31,
      completedPercent: 40,
      statusText: "Ongoing Voyage"
    }
  ];

  const currentMainTrip = tripData[activeCardIndex];
  const currentSubTrip = tripData[activeCardIndex === 0 ? 1 : 0];

  const steps: BookingStepItem[] = [
    {
      icon: FaLandmarkDome,
      color: "bg-yellow-500",
      title: "Choose Destination",
      description: "Select from our hand-picked collection of 120+ breathtaking global escapes.",
      badge: "Step 01",
      interactiveContent: {
        actionLabel: "Explore Top Sights",
        details: "Filter by climate, cultural landmarks, or coastal relaxation with tailored itineraries.",
        metrics: "120+ Destinations Verified"
      }
    },
    {
      icon: FaMoneyBillTransfer,
      color: "bg-red-500",
      title: "Make Payment",
      description: "Lock in unpublished alliance rates with encrypted checkout and zero hidden charges.",
      badge: "Step 02",
      interactiveContent: {
        actionLabel: "Zero-Risk Guarantee",
        details: "256-bit encryption with flexible split-pay & complimentary cancellation up to 24h prior.",
        metrics: "Visa, MC, Amex, Apple Pay"
      }
    },
    {
      icon: FaPlaneDeparture,
      color: "bg-cyan-700",
      title: "Reach Airport On Selected Date",
      description: "Receive your concierge flight dossier and arrive ready for a frictionless voyage.",
      badge: "Step 03",
      interactiveContent: {
        actionLabel: "Live Flight Concierge",
        details: "Digital mobile dossier with fast-track airport pass, gate alerts, and chauffeur pickup.",
        metrics: "24/7 Ground Assistance"
      }
    },
  ];

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const handleApplyPromo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "JADOO10" || promoCode.trim().toUpperCase() === "SUMMER") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'JADOO10' for 10% off");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setIsBookingModalOpen(false);
    }, 2800);
  };

  const calculateSubtotal = () => {
    const base = selectedDestination.includes("Rome") ? 4200 : selectedDestination.includes("Santorini") ? 4800 : selectedDestination.includes("Tokyo") ? 5600 : 3850;
    return base * selectedGuests;
  };

  const subtotal = calculateSubtotal();
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 450;
  const grandTotal = Math.max(1, subtotal - discount);

  return (
    <div id="bookings" className="px-4 sm:px-12 md:px-20 lg:px-48 py-10 sm:py-14 md:py-18 lg:py-24 bg-yellow-50 md:bg-white overflow-hidden relative">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 right-12 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Main Grid: Steps on Left, Signature Card on Right */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-16 xl:space-x-28 justify-between relative z-10">
        
        {/* Left Column: Heading, Interactive Steps & Trust Indicators */}
        <div className="lg:w-1/2 mb-12 lg:mb-0 w-full">
          {/* Signature Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-left mb-6"
          >
            <p className="text-sm sm:text-base font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Easy and Fast
            </p>
            <h2 className="lg:text-5xl text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight leading-tight">
              Book Your Next Trip in 3 Easy Steps
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Select any step below to explore how we curate each stage of your voyage.
            </p>
          </motion.div>

          {/* Interactive Steps List with Connected Timeline UX */}
          <div className="relative space-y-3.5 sm:space-y-4">
            {/* Visual connecting timeline track */}
            <div className="absolute left-[26px] sm:left-[30px] md:left-[32px] top-6 bottom-6 w-0.5 bg-slate-200 pointer-events-none -z-0 hidden sm:block" />

            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveStepIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStepIndex(idx);
                    }
                  }}
                  className={`relative z-10 p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-start space-x-3.5 sm:space-x-4 border select-none outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isActive
                      ? "bg-white shadow-md shadow-slate-200/70 border-amber-300 ring-1 ring-amber-400/30 -translate-y-0.5"
                      : "bg-transparent hover:bg-white/80 border-transparent hover:border-slate-200/80"
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Step Icon Badge */}
                  <div
                    className={`${step.color} w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 flex justify-center items-center rounded-2xl shadow-md shrink-0 transition-transform ${
                      isActive ? "scale-105 ring-4 ring-amber-100" : "hover:scale-105"
                    }`}
                  >
                    <Icon className="text-white text-lg sm:text-xl md:text-2xl" />
                  </div>

                  {/* Step Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`font-bold text-sm sm:text-base md:text-lg transition-colors ${
                        isActive ? "text-blue-950" : "text-slate-800"
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shrink-0 transition-colors ${
                        isActive ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-500"
                      }`}>
                        {step.badge}
                      </span>
                    </div>

                    <p className="text-slate-500 mt-1 font-normal text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Step Highlight Drawer when Active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-semibold text-amber-800 flex items-center gap-1.5">
                                <FaCheck className="text-emerald-500 text-[10px]" />
                                {step.interactiveContent.actionLabel}
                              </span>
                              <span className="font-medium text-slate-400 font-mono text-[10px]">
                                {step.interactiveContent.metrics}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-normal">
                              {step.interactiveContent.details}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Professional Trust Markers */}
          <div className="mt-6 pt-5 border-t border-slate-200/70 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
            <div className="flex flex-col items-center">
              <FaShieldAlt className="text-amber-500 text-sm mb-1" />
              <span className="font-semibold text-slate-700">100% Protected</span>
              <span className="text-[10px]">Secure Guarantee</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCreditCard className="text-amber-500 text-sm mb-1" />
              <span className="font-semibold text-slate-700">Zero Fees</span>
              <span className="text-[10px]">Transparent Rates</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCalendarCheck className="text-amber-500 text-sm mb-1" />
              <span className="font-semibold text-slate-700">Free Changes</span>
              <span className="text-[10px]">Up to 24h prior</span>
            </div>
          </div>
        </div>

        {/* Right Column: Signature Jadoo Floating Trip Card & Iconic Sub-Card */}
        <motion.div
          initial={{ opacity: 0, x: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 flex flex-col items-center lg:items-end w-full lg:pt-4"
        >
          {/* Card Anchor with relative positioning for the overlapping floating card */}
          <div className="relative">
            
            {/* Soft Ambient Radial Blur Behind the Card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-sky-400/20 via-blue-400/15 to-purple-400/20 rounded-[40px] blur-2xl -z-10" />

            {/* Main Signature Card */}
            <motion.div
              layout
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="w-72 sm:w-80 md:w-96 rounded-3xl p-4 sm:p-5 bg-white border border-gray-100 shadow-2xl shadow-blue-900/10 transition-all select-none"
            >
              {/* Destination Cover Image */}
              <div
                className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-4 group cursor-pointer"
                onClick={() => setIsBookingModalOpen(true)}
              >
                <Image
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  src={currentMainTrip.image}
                  alt={currentMainTrip.title}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 384px"
                  priority
                />

                {/* Subtle gradient overlay for badge readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                
                {/* Micro Live Status Tag */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentMainTrip.statusText || "Verified Departure"}</span>
                </div>

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-blue-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                  {currentMainTrip.formattedPrice}
                </div>

                {/* Bottom Quick-Action Overlay on Hover */}
                <div className="absolute bottom-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <span>Quick Book</span>
                  <FaPlaneUp className="text-[9px]" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div>
                <div className="flex items-center justify-between">
                  <h3
                    onClick={() => setIsBookingModalOpen(true)}
                    className="font-bold md:text-xl text-lg text-gray-900 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    {currentMainTrip.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Confirmed
                  </span>
                </div>

                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  {currentMainTrip.dates} | by {currentMainTrip.organizer}
                </p>

                {/* 3 Iconic Circular Action Badges with Interactive Micro-Tooltips */}
                <div className="relative mt-4">
                  <div className="flex justify-start space-x-3">
                    <button
                      type="button"
                      onClick={() => setActiveBadgeTooltip(activeBadgeTooltip === 'leaf' ? null : 'leaf')}
                      className={`p-2.5 rounded-full transition-all cursor-pointer ${
                        activeBadgeTooltip === 'leaf'
                          ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300"
                          : "bg-slate-100 hover:bg-amber-100 text-slate-500 hover:text-amber-700"
                      }`}
                      aria-label="Eco certified details"
                    >
                      <FaLeaf size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveBadgeTooltip(activeBadgeTooltip === 'bridge' ? null : 'bridge')}
                      className={`p-2.5 rounded-full transition-all cursor-pointer ${
                        activeBadgeTooltip === 'bridge'
                          ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300"
                          : "bg-slate-100 hover:bg-amber-100 text-slate-500 hover:text-amber-700"
                      }`}
                      aria-label="Historic excursions details"
                    >
                      <FaBridge size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveBadgeTooltip(activeBadgeTooltip === 'airbnb' ? null : 'airbnb')}
                      className={`p-2.5 rounded-full transition-all cursor-pointer ${
                        activeBadgeTooltip === 'airbnb'
                          ? "bg-rose-100 text-rose-700 ring-2 ring-rose-300"
                          : "bg-slate-100 hover:bg-amber-100 text-slate-500 hover:text-amber-700"
                      }`}
                      aria-label="Boutique villa details"
                    >
                      <FaAirbnb size={15} />
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={handleShareClick}
                      className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors ml-auto cursor-pointer"
                      title="Share or copy itinerary link"
                      aria-label="Share trip"
                    >
                      {copyFeedback ? <FaCheckCircle className="text-emerald-500 text-xs" /> : <FaShareAlt size={13} />}
                    </button>
                  </div>

                  {/* Micro Tooltip Card for Badges */}
                  <AnimatePresence>
                    {activeBadgeTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="mt-2.5 p-2 bg-slate-900 text-white rounded-xl text-[10px] leading-tight flex items-center justify-between"
                      >
                        <span>
                          {activeBadgeTooltip === 'leaf' && "🌱 Carbon-neutral flights & eco-certified hotel partner"}
                          {activeBadgeTooltip === 'bridge' && "🏛️ Licensed private historian & skip-the-line museum tickets"}
                          {activeBadgeTooltip === 'airbnb' && "🏡 Curated luxury boutique suites with private terrace"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveBadgeTooltip(null)}
                          className="ml-2 text-slate-400 hover:text-white"
                        >
                          ×
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Footer: Attendees Counter & Working Heart Wishlist */}
                <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100 text-xs">
                  <div className="items-center space-x-2 flex text-slate-600 font-medium">
                    <FaBuildingFlag className="text-slate-400" />
                    <span>{currentMainTrip.goingCount + (liked ? 1 : 0)} people going</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleLikeToggle}
                    className="p-1 rounded-full transition-transform active:scale-125 cursor-pointer"
                    title={liked ? "Saved to favorites" : "Save to favorites"}
                    aria-label="Favorite this trip"
                  >
                    <FaHeart
                      size={18}
                      className={`transition-colors ${
                        liked ? "text-rose-500 scale-110" : "text-gray-300 hover:text-rose-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Iconic Jadoo Overlapping Floating Sub-Card ("Trip to Rome / Ongoing") with Interactive Swap */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveCardIndex(activeCardIndex === 0 ? 1 : 0)}
              className="absolute -bottom-8 -right-3 sm:-bottom-9 sm:-right-8 md:-right-10 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-3 sm:p-4 w-52 sm:w-56 z-20 cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 group"
              title="Click to switch active trip preview"
            >
              <div className="flex items-start space-x-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-amber-200">
                  <Image
                    src={currentSubTrip.image}
                    alt={currentSubTrip.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Ongoing
                    </span>
                    <span className="text-[9px] text-amber-600 font-semibold group-hover:underline">
                      Swap ⇄
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {currentSubTrip.title}
                  </h4>
                  
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className="text-amber-600 font-bold">
                      {currentSubTrip.completedPercent || 40}% completed
                    </span>
                  </div>

                  {/* Gradient Progress Bar with delicate pulse */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentSubTrip.completedPercent || 40}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Interactive Trigger Button Below the Card */}
          <div className="mt-12 sm:mt-14 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-md shadow-amber-500/20 transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <FaCalendarCheck />
              <span>Instant Itinerary Booking</span>
            </button>
          </div>
        </motion.div>

      </div>

      {/* Professional Interactive Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsBookingModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.16 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close booking modal"
              >
                <FaTimes />
              </button>

              {/* Modal Header */}
              <div className="mb-5">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block mb-1">
                  Fast & Guaranteed Confirmation
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                  Instant Trip Reservation
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Secure your dates with zero upfront deposit and complimentary cancellation.
                </p>
              </div>

              {bookingConfirmed ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                    <FaCircleCheck />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Reservation Confirmed!</h4>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto">
                    Your itinerary voucher for <strong>{selectedDestination}</strong> has been issued. A concierge confirmation has been scheduled for your selected date.
                  </p>
                  <span className="inline-block text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                    BOOKING REF: #JD-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  {/* Destination selection */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Selected Itinerary
                    </label>
                    <select
                      value={selectedDestination}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="Trip To Greece">Trip To Greece (14 Days) · $3,850</option>
                      <option value="Trip To Rome">Trip To Rome, Italy (10 Days) · $4,200</option>
                      <option value="Trip To Santorini">Santorini Sunset Tour (8 Days) · $4,800</option>
                      <option value="Trip To Tokyo">Tokyo & Kyoto Cultural Escape (14 Days) · $5,600</option>
                    </select>
                  </div>

                  {/* Dates & Travelers Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Departure Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Travelers
                      </label>
                      <div className="relative">
                        <FaUserFriends className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          value={selectedGuests}
                          onChange={(e) => setSelectedGuests(Number(e.target.value))}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value={1}>1 Solo Explorer</option>
                          <option value={2}>2 Adults (Couple / Friends)</option>
                          <option value={3}>3 Travelers</option>
                          <option value={4}>4 Travelers (Family Package)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. JADOO10)"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError("");
                        }}
                        className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none uppercase"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      {promoApplied ? "Applied ✓" : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] text-rose-500">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="text-[10px] text-emerald-600 font-medium">✓ 10% promo discount applied to total</p>
                  )}

                  {/* Pricing Breakdown Card */}
                  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-gray-600">
                      <span>Base Itinerary ({selectedGuests} {selectedGuests > 1 ? 'travelers' : 'traveler'})</span>
                      <span className="font-semibold text-gray-900">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>{promoApplied ? "Promo Code (10% Off)" : "Alliance Group Discount"}</span>
                      <span>-${discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Concierge & Flight Support</span>
                      <span className="text-emerald-600 font-bold">Complimentary</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between text-xs font-bold text-gray-900">
                      <span>Estimated Total</span>
                      <span className="text-blue-950 font-black text-sm">
                        ${grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsBookingModalOpen(false)}
                      className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <FaCheck />
                      <span>Confirm & Lock Rate</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
