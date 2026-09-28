'use client';

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faCloudSun,
  faPlane,
  faCalendarAlt,
  faSlidersH,
  faSun,
  faCloudRain,
  faCompass,
  faCheck,
  faArrowRight,
  faTimes,
  faTicketAlt
} from "@fortawesome/free-solid-svg-icons";

interface ServiceData {
  id: string;
  icon: IconDefinition;
  image?: string;
  categoryNumber: string;
  accentGradient: string;
  glowColor: string;
  title: string;
  shortDesc: string;
  keyFeature: string;
  stats: string;
  details: {
    headline: string;
    description: string;
    highlights: string[];
  };
}

export default function Category() {
  const [activeTab, setActiveTab] = useState<string>("weather");
  const [activeWeatherCity, setActiveWeatherCity] = useState<'rome' | 'paris' | 'tokyo' | 'bali'>('rome');
  const [flightOrigin, setFlightOrigin] = useState('New York (JFK)');
  const [customStyle, setCustomStyle] = useState('Luxury Discovery');
  const [customDays, setCustomDays] = useState('10 Days');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customPlanSaved, setCustomPlanSaved] = useState(false);

  const services: ServiceData[] = [
    {
      id: "weather",
      icon: faCloudSun,
      image: "/images/service-icon-1.svg",
      categoryNumber: "01",
      accentGradient: "from-amber-500 to-orange-500",
      glowColor: "bg-amber-400/20",
      title: "Calculated Weather",
      shortDesc: "Predictive multi-satellite climate models for optimal departure dates.",
      keyFeature: "Microclimate Alerts",
      stats: "99.4% Accuracy",
      details: {
        headline: "Predictive Meteorological Intelligence",
        description: "Accurate climate modeling across 120+ destinations ensures you avoid monsoon shifts, heatwaves, and seasonal rain.",
        highlights: [
          "7-Day hyper-local radar forecasts",
          "Seasonal optimal month recommendations",
          "Automated weather alerts 48h prior to departure"
        ]
      }
    },
    {
      id: "flights",
      icon: faPlane,
      image: "/images/service-icon-2.svg",
      categoryNumber: "02",
      accentGradient: "from-sky-500 to-blue-600",
      glowColor: "bg-sky-400/20",
      title: "Best Flights",
      shortDesc: "Negotiated alliance fares with zero hidden fees and free seat selection.",
      keyFeature: "Direct Route Priority",
      stats: "$320 Avg. Savings",
      details: {
        headline: "Global Partner Airline Network",
        description: "Direct partnerships with Star Alliance, SkyTeam, and Oneworld bring unpublished group rates and priority rebooking.",
        highlights: [
          "Shortest layover route optimization",
          "Baggage and cabin allowances included upfront",
          "24/7 proactive flight disruption assistance"
        ]
      }
    },
    {
      id: "events",
      icon: faCalendarAlt,
      image: "/images/service-icon-3.svg",
      categoryNumber: "03",
      accentGradient: "from-emerald-500 to-teal-600",
      glowColor: "bg-emerald-400/20",
      title: "Local Events",
      shortDesc: "VIP passes to sold-out regional festivals, culinary fairs, and private galas.",
      keyFeature: "Skip-the-Line Passes",
      stats: "450+ Monthly Events",
      details: {
        headline: "Immersive Cultural Access",
        description: "Experience authentic regional life with curated tickets, licensed historian guides, and culinary vineyard tours.",
        highlights: [
          "Sold-out festival reservation allocations",
          "Private local storytellers & food guides",
          "Priority reservations at Michelin-starred spots"
        ]
      }
    },
    {
      id: "customization",
      icon: faSlidersH,
      image: "/images/exp-shape.svg",
      categoryNumber: "04",
      accentGradient: "from-purple-500 to-indigo-600",
      glowColor: "bg-purple-400/20",
      title: "Customization",
      shortDesc: "Bespoke day-by-day itineraries tailored to your rhythm, passions, and budget.",
      keyFeature: "Adaptive Daily Pacing",
      stats: "99.8% Satisfaction",
      details: {
        headline: "Tailored Concierge Travel Design",
        description: "Every trip is unique. From private drivers to flexible on-trip adjustments, your itinerary flows seamlessly.",
        highlights: [
          "Single dedicated trip concierge point-of-contact",
          "Mobile itinerary app with offline access",
          "Effortless on-the-fly schedule swaps"
        ]
      }
    }
  ];

  const cityWeather = {
    rome: { temp: "24°C", condition: "Sunny & Mild", humidity: "42%", wind: "12 km/h", icon: faSun, season: "Peak Sun: Apr - Jun" },
    paris: { temp: "19°C", condition: "Partly Cloudy", humidity: "56%", wind: "15 km/h", icon: faCloudSun, season: "Peak Sun: May - Sep" },
    tokyo: { temp: "22°C", condition: "Clear Skies", humidity: "48%", wind: "9 km/h", icon: faSun, season: "Peak Sun: Mar - May" },
    bali: { temp: "28°C", condition: "Warm Tropical", humidity: "65%", wind: "14 km/h", icon: faCloudRain, season: "Peak Sun: May - Aug" }
  };

  const sampleFlights = [
    { dest: "Rome, Italy", route: "Direct · 8h 15m", price: "$485", tag: "Lowest 30 Days" },
    { dest: "Tokyo, Japan", route: "1 Stop · 13h 40m", price: "$720", tag: "Popular Route" },
    { dest: "Paris, France", route: "Direct · 7h 20m", price: "$430", tag: "Hot Deal" }
  ];

  const sampleEvents = [
    { title: "Venice Masquerade Gala", date: "April 18, 2026", access: "VIP Private Access", location: "Grand Canal, Venice" },
    { title: "Kyoto Cherry Blossom Night", date: "March 29, 2026", access: "Guaranteed Pass", location: "Maruyama Park, Kyoto" },
    { title: "Amalfi Coast Vineyard Tasting", date: "Weekly · Thursdays", access: "Sommelier Guided", location: "Ravello, Italy" }
  ];

  const currentService = services.find((s) => s.id === activeTab) || services[0];

  const handleCustomPlanSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomPlanSaved(true);
    setTimeout(() => setCustomPlanSaved(false), 2500);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-amber-50/40 via-white to-slate-50/50 relative overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-100/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact, Refined Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-2">
            CATEGORY · WHAT WE OFFER
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            We Offer Best Services
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Tailored travel architecture designed for seamless voyages across 120+ destinations.
          </p>
        </div>

        {/* 4 Compact Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {services.map((service) => {
            const isActive = activeTab === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveTab(service.id)}
                className={`relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col justify-between group outline-none ${
                  isActive
                    ? "bg-white border-amber-400 shadow-md shadow-amber-500/10 -translate-y-1"
                    : "bg-white/80 hover:bg-white border-slate-200/80 hover:border-amber-300 shadow-sm hover:shadow"
                }`}
              >
                {/* Active Indicator Top Accent Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-b"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <div>
                  {/* Top Bar: Icon + Category Number */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="relative w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                      {service.image ? (
                        <div className="relative w-7 h-7">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <FontAwesomeIcon icon={service.icon} className="text-slate-700 text-sm" />
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-slate-300 font-mono">
                      {service.categoryNumber}
                    </span>
                  </div>

                  {/* Title & Concise Summary */}
                  <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-amber-600' : 'text-slate-800 group-hover:text-slate-900'}`}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Row: Key Tag + Action Cue */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">
                    {service.stats}
                  </span>

                  <span className={`font-semibold flex items-center gap-1 transition-colors ${isActive ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-700'}`}>
                    <span>{isActive ? 'Active' : 'Preview'}</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={`text-[9px] transition-transform ${isActive ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                    />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Unique Feature: Interactive Live Service Console */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h4 className="text-sm font-bold text-slate-900">
                Interactive Console: {currentService.title}
              </h4>
              <span className="text-xs text-slate-400 hidden sm:inline">· Live Widget</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Full Details</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </button>
            </div>
          </div>

          {/* Dynamic Console Tool based on Active Service */}
          <AnimatePresence mode="wait">
            
            {/* 1. WEATHER RADAR CONSOLE */}
            {activeTab === "weather" && (
              <motion.div
                key="weather"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                    {(['rome', 'paris', 'tokyo', 'bali'] as const).map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setActiveWeatherCity(city)}
                        className={`px-3 py-1 font-semibold rounded-md capitalize transition-all cursor-pointer ${
                          activeWeatherCity === city
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>

                  <div className="text-slate-500 text-[11px]">
                    Multi-satellite radar updated moments ago
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Temperature</span>
                    <span className="text-xl font-bold text-slate-900 mt-0.5 block flex items-center gap-1.5">
                      <FontAwesomeIcon icon={cityWeather[activeWeatherCity].icon} className="text-amber-500 text-sm" />
                      {cityWeather[activeWeatherCity].temp}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Condition</span>
                    <span className="text-xs font-semibold text-slate-800 mt-1 block">
                      {cityWeather[activeWeatherCity].condition}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Humidity / Wind</span>
                    <span className="text-xs font-semibold text-slate-800 mt-1 block">
                      {cityWeather[activeWeatherCity].humidity} · {cityWeather[activeWeatherCity].wind}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Seasonal Window</span>
                    <span className="text-xs font-semibold text-amber-700 mt-1 block">
                      {cityWeather[activeWeatherCity].season}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. BEST FLIGHTS CONSOLE */}
            {activeTab === "flights" && (
              <motion.div
                key="flights"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-600">
                    Departure origin: <strong className="text-slate-900">{flightOrigin}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFlightOrigin(flightOrigin === 'New York (JFK)' ? 'London (LHR)' : 'New York (JFK)')}
                      className="text-xs font-medium text-amber-600 hover:text-amber-700 underline cursor-pointer"
                    >
                      Swap Departure City
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {sampleFlights.map((flight, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:border-slate-300 transition-colors text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faPlane} className="text-sky-500 text-[10px]" />
                          <span className="font-bold text-slate-900">{flight.dest}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">{flight.route}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-sm text-slate-900 block">{flight.price}</span>
                        <span className="text-[10px] font-medium text-emerald-600">{flight.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. LOCAL EVENTS CONSOLE */}
            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"
              >
                {sampleEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:border-slate-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
                        <span>{evt.location}</span>
                        <FontAwesomeIcon icon={faTicketAlt} className="text-amber-500" />
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs">{evt.title}</h5>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{evt.date}</span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-emerald-600">{evt.access}</span>
                      <span className="text-amber-600 font-semibold">Reserve Pass</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 4. CUSTOMIZATION CONSOLE */}
            {activeTab === "customization" && (
              <motion.div
                key="customization"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <form onSubmit={handleCustomPlanSave} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Travel Style</label>
                    <select
                      value={customStyle}
                      onChange={(e) => setCustomStyle(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option>Luxury Discovery</option>
                      <option>Relaxed Coastal</option>
                      <option>Cultural Heritage</option>
                      <option>Nature & Trekking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Trip Duration</label>
                    <select
                      value={customDays}
                      onChange={(e) => setCustomDays(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option>7 Days (Essential)</option>
                      <option>10 Days (Recommended)</option>
                      <option>14 Days (In-depth)</option>
                      <option>21+ Days (Grand Voyage)</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {customPlanSaved ? (
                        <>
                          <FontAwesomeIcon icon={faCheck} />
                          <span>Plan Generated!</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faCompass} />
                          <span>Generate Custom Blueprint</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {customPlanSaved && (
                  <p className="text-[11px] text-emerald-600 font-medium">
                    ✓ Custom {customDays} {customStyle} blueprint saved to your session. Concierge advisor notified.
                  </p>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Clean Modal for In-Depth Service Details */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="mb-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  Service Specifications
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {currentService.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentService.details.headline}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {currentService.details.description}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 mb-5">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Guaranteed Standards
                </span>
                {currentService.details.highlights.map((h, i) => (
                  <div key={i} className="flex items-center text-xs text-slate-700 gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="#bookings"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-xs transition-colors"
                >
                  Book with This Service
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
