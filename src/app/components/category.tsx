'use client';

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCloudSun, faPlane, faCalendarAlt, faCog, faCheck, faArrowRight, faTimes, faSun, faCloudRain, faWind, faCompass, faTicketAlt } from "@fortawesome/free-solid-svg-icons";

interface ServiceData {
  id: string;
  icon: IconDefinition;
  image?: string;
  badge: string;
  badgeColor: string;
  glowColor: string;
  accentBg: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  stats: { label: string; value: string };
  modalDetails: {
    headline: string;
    description: string;
    highlights: { title: string; desc: string }[];
    interactiveType: 'weather' | 'flights' | 'events' | 'customizer';
  };
}

export default function Category() {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [activeWeatherCity, setActiveWeatherCity] = useState<'rome' | 'paris' | 'tokyo' | 'bali'>('rome');
  const [customStyle, setCustomStyle] = useState('Luxury Escape');
  const [customDuration, setCustomDuration] = useState('10 Days');
  const [customSubmitted, setCustomSubmitted] = useState(false);

  const services: ServiceData[] = [
    {
      id: "weather",
      icon: faCloudSun,
      image: "/images/service-icon-1.svg",
      badge: "Real-time Climate",
      badgeColor: "bg-orange-50 text-orange-600 border-orange-200",
      glowColor: "from-amber-400/20 via-orange-300/10 to-transparent",
      accentBg: "from-amber-500 to-orange-500",
      title: "Calculated Weather",
      subtitle: "Predictive Meteorological Intelligence",
      desc: "Experience accurate, multi-satellite weather forecasting tailored to your exact travel dates and destinations.",
      features: ["7-Day Predictive Radar", "Optimal Season Advisor", "Microclimate Alerts"],
      stats: { label: "Accuracy", value: "99.4%" },
      modalDetails: {
        headline: "Real-Time Climate & Travel Intelligence",
        description: "Never pack the wrong wardrobe or get caught in unexpected monsoon rains. Our travel platform computes hyper-local climate models across 120+ destinations.",
        highlights: [
          { title: "Precision Microclimate Forecasts", desc: "Monitors historical precipitation, wind chill, and hourly temperature shifts for every excursion." },
          { title: "Smart Seasonal Matching", desc: "Recommends the exact weeks of the year with the highest sunny days and lowest humidity." },
          { title: "Active Departure Alerts", desc: "Automated weather updates sent straight to your phone 48 hours before boarding." },
        ],
        interactiveType: 'weather',
      },
    },
    {
      id: "flights",
      icon: faPlane,
      image: "/images/service-icon-2.svg",
      badge: "Guaranteed Lowest Fares",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
      glowColor: "from-blue-400/20 via-cyan-300/10 to-transparent",
      accentBg: "from-blue-600 to-cyan-500",
      title: "Best Flights",
      subtitle: "Global Carrier Network",
      desc: "Unlock negotiated partner rates on premium airlines with flexible rebooking and included baggage allowances.",
      features: ["Direct Flight Prioritization", "Price Drop Protection", "Free Seat Selection"],
      stats: { label: "Avg. Savings", value: "$320/trip" },
      modalDetails: {
        headline: "Seamless Flight Booking & Fare Defense",
        description: "We partner directly with leading airline alliances (SkyTeam, Star Alliance, Oneworld) to secure unpublished group fares and prime departure times.",
        highlights: [
          { title: "Dynamic Route Optimization", desc: "Algorithms match the shortest flight paths and minimal layover durations." },
          { title: "Zero Hidden Surcharges", desc: "Taxes, baggage fees, and cabin baggage are always clearly accounted for upfront." },
          { title: "24/7 Disruption Assist", desc: "Immediate rebooking support in case of airline schedule delays or weather cancellations." },
        ],
        interactiveType: 'flights',
      },
    },
    {
      id: "events",
      icon: faCalendarAlt,
      image: "/images/service-icon-3.svg",
      badge: "Curated Experiences",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      glowColor: "from-emerald-400/20 via-teal-300/10 to-transparent",
      accentBg: "from-emerald-500 to-teal-500",
      title: "Local Events",
      subtitle: "Cultural VIP Access",
      desc: "Immerse yourself in authentic regional culture with guaranteed access to seasonal festivals, shows, and culinary fairs.",
      features: ["Skip-the-Line Museum Passes", "Private Local Guides", "Exclusive Gala Invitations"],
      stats: { label: "Curated Events", value: "450+ Monthly" },
      modalDetails: {
        headline: "Exclusive Access to Festivals & Cultural Milestones",
        description: "Travel isn't just about landmarks—it's about living the culture. We curate tickets and private passes to the world's most breathtaking annual spectacles.",
        highlights: [
          { title: "Sold-Out Event Reservations", desc: "Priority allocation for Venice Carnival masquerades, Kyoto Cherry Blossom galas, and Broadway premieres." },
          { title: "Verified Local Storytellers", desc: "Licensed resident historians and food connoisseurs guiding your small group tours." },
          { title: "Bespoke Culinary Tastings", desc: "Reservations at Michelin-starred restaurants and hidden vineyard cellars." },
        ],
        interactiveType: 'events',
      },
    },
    {
      id: "customization",
      icon: faCog,
      image: "/images/exp-shape.svg",
      badge: "Tailored to You",
      badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
      glowColor: "from-purple-400/20 via-pink-300/10 to-transparent",
      accentBg: "from-purple-600 to-indigo-600",
      title: "Customization",
      subtitle: "Bespoke Concierge Design",
      desc: "Every traveler is unique. Build a fully custom, day-by-day travel plan designed around your pacing, passions, and budget.",
      features: ["Private Concierge Manager", "Adaptive Daily Pacing", "Flexible On-Trip Changes"],
      stats: { label: "Satisfaction", value: "99.8%" },
      modalDetails: {
        headline: "Personalized Travel Architecture Built Around You",
        description: "No cookie-cutter tour buses. Our senior travel designers map every hotel stay, private car transfer, and relaxing afternoon to your exact rhythm.",
        highlights: [
          { title: "Dedicated Trip Concierge", desc: "One direct point of contact from your initial discovery call through your return home." },
          { title: "Adaptive Itinerary App", desc: "Instant mobile updates with voucher barcodes, offline maps, and dining reservations." },
          { title: "Unrestricted Flexibility", desc: "Want to sleep in or swap tomorrow's museum for a catamaran cruise? We handle the rebooking effortlessly." },
        ],
        interactiveType: 'customizer',
      },
    },
  ];

  const cityWeather = {
    rome: { temp: "24°C", condition: "Sunny & Pleasant", humidity: "42%", wind: "12 km/h", icon: faSun, note: "Best season: April - June & Sept - Oct" },
    paris: { temp: "19°C", condition: "Partly Cloudy", humidity: "56%", wind: "15 km/h", icon: faCloudSun, note: "Best season: May - September" },
    tokyo: { temp: "22°C", condition: "Clear Skies", humidity: "48%", wind: "9 km/h", icon: faSun, note: "Best season: March - May & Oct - Nov" },
    bali: { temp: "28°C", condition: "Warm Tropical", humidity: "65%", wind: "14 km/h", icon: faCloudRain, note: "Best season: May - August" },
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-yellow-50/60 via-white to-white relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-12 right-0 -mr-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-0 -ml-20 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100/60 border border-orange-200/80 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-orange-600 uppercase">
              CATEGORY &bull; WHAT WE OFFER
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight leading-tight">
            We Offer Best Services
          </h2>

          <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            From algorithmic weather planning to bespoke concierge itineraries, every service is crafted to make your global voyage smooth, inspiring, and stress-free.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 items-stretch">
          {services.map((service, index) => {
            const isFeatured = service.id === "flights"; // Signature Jadoo highlight card

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group h-full flex flex-col"
              >
                {/* Jadoo Signature Hover/Active Corner Accent */}
                <div
                  className={`absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br ${service.accentBg} rounded-tl-3xl rounded-br-3xl -z-10 transition-all duration-300 ${
                    isFeatured
                      ? "opacity-90 scale-100"
                      : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                  }`}
                />

                {/* Main Card Surface */}
                <div
                  className={`h-full flex flex-col justify-between p-7 sm:p-8 rounded-[32px] bg-white transition-all duration-300 border ${
                    isFeatured
                      ? "border-orange-200/90 shadow-2xl shadow-orange-500/10 -translate-y-2"
                      : "border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 hover:border-orange-200/60"
                  }`}
                >
                  {/* Top: Icon container & Badge */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${service.badgeColor}`}>
                        {service.badge}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Icon with ambient backdrop glow */}
                    <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${service.glowColor} blur-xl group-hover:scale-125 transition-transform duration-300`} />
                      
                      {service.image ? (
                        <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.accentBg} text-white flex items-center justify-center text-2xl shadow-md transition-transform duration-300 group-hover:scale-110`}>
                          <FontAwesomeIcon icon={service.icon} />
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-1 group-hover:text-blue-950 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[12px] font-medium text-orange-500 text-center mb-3">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed text-center mb-6">
                      {service.desc}
                    </p>

                    {/* Feature Pills */}
                    <ul className="space-y-2 pt-2 border-t border-gray-100 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center text-xs text-gray-600">
                          <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] mr-2 shrink-0">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom: Stats & Interactive Explore CTA */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{service.stats.label}</p>
                      <p className="text-sm font-bold text-blue-950">{service.stats.value}</p>
                    </div>

                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-yellow-400/90 hover:bg-yellow-500 text-white text-xs font-semibold shadow-sm hover:shadow transition-all group-hover:bg-yellow-500 cursor-pointer"
                      aria-label={`Explore details for ${service.title}`}
                    >
                      <span>Explore</span>
                      <FontAwesomeIcon icon={faArrowRight} className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Senior Web Dev: Interactive Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedService.accentBg} text-white flex items-center justify-center text-2xl shadow-lg shrink-0`}>
                  <FontAwesomeIcon icon={selectedService.icon} />
                </div>
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${selectedService.badgeColor}`}>
                    {selectedService.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {selectedService.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {selectedService.modalDetails.description}
              </p>

              {/* Interactive Module for this Service */}
              {selectedService.modalDetails.interactiveType === 'weather' && (
                <div className="bg-yellow-50/70 border border-yellow-200/80 rounded-2xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faSun} className="text-amber-500" />
                      Live Climate Radar Preview
                    </span>
                    <span className="text-xs text-gray-500">Updated hourly</span>
                  </div>

                  {/* Destination Tabs */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {(['rome', 'paris', 'tokyo', 'bali'] as const).map((city) => (
                      <button
                        key={city}
                        onClick={() => setActiveWeatherCity(city)}
                        className={`py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                          activeWeatherCity === city
                            ? 'bg-yellow-400 text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-yellow-100/60 border border-gray-200/60'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>

                  {/* Weather Snapshot */}
                  <div className="bg-white rounded-xl p-4 border border-yellow-200/60 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl text-amber-500">
                        <FontAwesomeIcon icon={cityWeather[activeWeatherCity].icon} />
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-gray-900">{cityWeather[activeWeatherCity].temp}</p>
                        <p className="text-xs font-medium text-gray-600">{cityWeather[activeWeatherCity].condition}</p>
                      </div>
                    </div>

                    <div className="text-right text-xs text-gray-500 space-y-1">
                      <p className="flex items-center gap-1 justify-end"><FontAwesomeIcon icon={faWind} className="text-gray-400" /> Wind: {cityWeather[activeWeatherCity].wind}</p>
                      <p className="flex items-center gap-1 justify-end"><FontAwesomeIcon icon={faCloudRain} className="text-gray-400" /> Humidity: {cityWeather[activeWeatherCity].humidity}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2 italic text-center">
                    💡 {cityWeather[activeWeatherCity].note}
                  </p>
                </div>
              )}

              {selectedService.modalDetails.interactiveType === 'flights' && (
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faPlane} className="text-blue-600" />
                      Partner Airlines &amp; Fare Defense
                    </span>
                    <span className="text-xs text-green-700 font-semibold bg-green-100 px-2 py-0.5 rounded-full">
                      Avg. -$320 Below Public Rates
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="bg-white p-3 rounded-xl border border-blue-100">
                      <p className="font-bold text-gray-800">Emirates</p>
                      <p className="text-gray-500 text-[11px]">Free seat &amp; meals</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100">
                      <p className="font-bold text-gray-800">Air France</p>
                      <p className="text-gray-500 text-[11px]">Direct European routes</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-100">
                      <p className="font-bold text-gray-800">Singapore Air</p>
                      <p className="text-gray-500 text-[11px]">5-Star Asian service</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedService.modalDetails.interactiveType === 'events' && (
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faTicketAlt} className="text-emerald-600" />
                      Featured Seasonal Events (VIP Included)
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-800">Venice Masked Carnival &amp; Grand Canal Gala</p>
                        <p className="text-gray-500 text-[11px]">Includes private gondola transfer &amp; costume rental</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">Feb - Mar</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-800">Kyoto Spring Cherry Blossom Night Illumination</p>
                        <p className="text-gray-500 text-[11px]">Private temple garden access before public gates open</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">Apr - May</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedService.modalDetails.interactiveType === 'customizer' && (
                <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faCompass} className="text-purple-600" />
                      Quick Itinerary Estimator
                    </span>
                  </div>

                  {customSubmitted ? (
                    <div className="bg-white p-4 rounded-xl border border-purple-200 text-center">
                      <p className="text-sm font-bold text-purple-950">Draft Blueprint Created!</p>
                      <p className="text-xs text-gray-600 mt-1">
                        A personalized {customDuration} {customStyle} proposal has been forwarded to our concierge team.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-1">Travel Style</label>
                          <select
                            value={customStyle}
                            onChange={(e) => setCustomStyle(e.target.value)}
                            className="w-full bg-white border border-purple-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                          >
                            <option>Luxury Escape</option>
                            <option>Adventure &amp; Hiking</option>
                            <option>Cultural Immersion</option>
                            <option>Family Fun</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-1">Duration</label>
                          <select
                            value={customDuration}
                            onChange={(e) => setCustomDuration(e.target.value)}
                            className="w-full bg-white border border-purple-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                          >
                            <option>7 Days</option>
                            <option>10 Days</option>
                            <option>14 Days</option>
                            <option>3 Weeks+</option>
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={() => setCustomSubmitted(true)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                      >
                        Generate Custom Plan
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Key Service Highlights */}
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
                Key Service Pillars
              </h4>
              <div className="space-y-3 mb-6">
                {selectedService.modalDetails.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs mt-0.5 shrink-0">
                      ✓
                    </span>
                    <div>
                      <strong className="text-gray-900 block font-semibold">{item.title}</strong>
                      <span className="text-gray-600 text-xs leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <a
                  href="#destinations"
                  onClick={() => setSelectedService(null)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md"
                >
                  View Applicable Destinations
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-800 text-sm font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
