'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaLocationArrow,
  FaTimes,
  FaCheck,
  FaArrowRight,
  FaSearch,
  FaSuitcaseRolling,
  FaMapMarkerAlt,
  FaClock,
  FaCompass
} from 'react-icons/fa';

type CategoryFilter = 'all' | 'europe' | 'asia' | 'trending';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'duration';

interface DestinationItem {
  id: string;
  name: string;
  country: string;
  region: 'europe' | 'asia';
  price: string;
  numericPrice: number;
  duration: string;
  days: number;
  image: string;
  rating: number;
  reviewsCount: number;
  tag?: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  inclusions: string[];
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: 'rome',
    name: 'Rome, Italy',
    country: 'Italy',
    region: 'europe',
    price: '$4.2k',
    numericPrice: 4200,
    duration: '10 days trip',
    days: 10,
    image: '/images/destination-4.jpg',
    rating: 4.9,
    reviewsCount: 148,
    tag: 'Best Seller',
    highlights: ['Vatican & Colosseum VIP Access', 'Private Tuscan Winery Tour', 'Sunset Cruise on the Tiber'],
    itinerary: [
      { day: 'Day 1-3', title: 'Historic Heart of Rome', desc: 'Private guided Colosseum tour, Trevi Fountain, and Pantheon.' },
      { day: 'Day 4-6', title: 'Vatican & Roman Gastronomy', desc: 'Sistine Chapel morning access followed by authentic Trastevere culinary walk.' },
      { day: 'Day 7-10', title: 'Tuscan Hill Country', desc: 'Day trip to Montepulciano vineyards and scenic countryside villa stay.' }
    ],
    inclusions: ['4-Star Luxury Boutique Hotel', 'Daily Artisan Breakfast', 'Express Train Tickets', 'English Historian Guides']
  },
  {
    id: 'paris',
    name: 'Paris & London',
    country: 'France & UK',
    region: 'europe',
    price: '$5.2k',
    numericPrice: 5200,
    duration: '18 days trip',
    days: 18,
    image: '/images/destination-6.jpg',
    rating: 4.8,
    reviewsCount: 192,
    tag: 'Grand Tour',
    highlights: ['Louvre After-Hours Viewing', 'Eurostar Premier Class', 'London West End Theatre Pass'],
    itinerary: [
      { day: 'Day 1-8', title: 'Romantic Paris', desc: 'Eiffel Tower summit dining, Montmartre art tour, and Seine river cruise.' },
      { day: 'Day 9', title: 'Eurostar Under the Channel', desc: 'High-speed business premier journey direct into St Pancras.' },
      { day: 'Day 10-18', title: 'Royal London & Thames', desc: 'Tower of London crown jewels, Buckingham Palace, and historic Cotswolds day excursion.' }
    ],
    inclusions: ['Centrally Located 5-Star Accommodations', 'Eurostar High-Speed Crossing', 'VIP Museum Skip-the-Line', 'Dedicated Concierge']
  },
  {
    id: 'shanghai',
    name: 'Shanghai, China',
    country: 'China',
    region: 'asia',
    price: '$3.5k',
    numericPrice: 3500,
    duration: '12 days trip',
    days: 12,
    image: '/images/destination-1.jpg',
    rating: 4.7,
    reviewsCount: 96,
    tag: 'Culture & Modernity',
    highlights: ['The Bund Skyline Private Yacht', 'Yu Garden Tea Master Ceremony', 'Zhujiajiao Water Town Gondola'],
    itinerary: [
      { day: 'Day 1-4', title: 'Futuristic Shanghai', desc: 'Sky-high dining at Shanghai Tower and evening lights on the Bund.' },
      { day: 'Day 5-8', title: 'Ancient Traditions', desc: 'Quiet jade temples, authentic street food walk, and silk market.' },
      { day: 'Day 9-12', title: 'Water Villages & Gardens', desc: 'Canals of ancient Zhujiajiao and modern art galleries at M50.' }
    ],
    inclusions: ['High-Floor Riverview Rooms', 'Private Airport Transfers', 'Daily Guided Excursions', 'All Regional Bullet Train Passes']
  },
  {
    id: 'santorini',
    name: 'Santorini, Greece',
    country: 'Greece',
    region: 'europe',
    price: '$4.8k',
    numericPrice: 4800,
    duration: '8 days trip',
    days: 8,
    image: '/images/destination-2.jpg',
    rating: 5.0,
    reviewsCount: 210,
    tag: 'Top Rated',
    highlights: ['Caldera Sunset Catamaran Charter', 'Oia Cliffside Infinity Suites', 'Akrotiri Prehistoric Ruins Tour'],
    itinerary: [
      { day: 'Day 1-3', title: 'Oia Cliffside Living', desc: 'Check in to iconic cave suite, caldera sunset wine tasting, and cliff walk.' },
      { day: 'Day 4-6', title: 'Aegean Waters & Volcanic Beaches', desc: 'Private catamaran charter to Red Beach, hot springs, and fresh seafood barbecue.' },
      { day: 'Day 7-8', title: 'Pyrgos & Farewell Feast', desc: 'Traditional village exploration, organic olive farm, and rooftop celebration.' }
    ],
    inclusions: ['Caldera-View Luxury Cave Suite', 'Private Airport Welcome Transfer', 'Catamaran Cruise with Chef BBQ', 'Complimentary Champagne']
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    country: 'Japan',
    region: 'asia',
    price: '$5.6k',
    numericPrice: 5600,
    duration: '14 days trip',
    days: 14,
    image: '/images/destination-3.jpg',
    rating: 4.9,
    reviewsCount: 184,
    tag: 'Trending',
    highlights: ['Shinkansen Bullet Train to Kyoto', 'Tsukiji Outer Market Culinary Walk', 'TeamLab Borderless VIP Pass'],
    itinerary: [
      { day: 'Day 1-5', title: 'Neon & Heritage Tokyo', desc: 'Shibuya crossing, Asakusa Senso-ji temple, and Akihabara tech district.' },
      { day: 'Day 6-10', title: 'Kyoto Cultural Heart', desc: 'Fushimi Inari torii gates, Arashiyama bamboo grove, and private tea ceremony.' },
      { day: 'Day 11-14', title: 'Mount Fuji & Onsen Retreat', desc: 'Hakone hot spring ryokan with traditional kaiseki multi-course dinner.' }
    ],
    inclusions: ['Deluxe City & Ryokan Accommodations', '7-Day Unlimited JR Rail Pass', 'English Speaking Local Expert', 'Pocket Wi-Fi & IC Card']
  },
  {
    id: 'london',
    name: 'London, UK',
    country: 'UK',
    region: 'europe',
    price: '$4.1k',
    numericPrice: 4100,
    duration: '7 days trip',
    days: 7,
    image: '/images/destination-5.jpg',
    rating: 4.8,
    reviewsCount: 130,
    tag: 'Classic Escape',
    highlights: ['Tower of London Private Early Access', 'Afternoon Tea at The Savoy', 'Greenwich Thames Cruise'],
    itinerary: [
      { day: 'Day 1-3', title: 'Westminster & Royalty', desc: 'Big Ben, Westminster Abbey, and Buckingham Palace Changing of the Guard.' },
      { day: 'Day 4-5', title: 'Culture, Arts & Theatre', desc: 'British Museum highlights tour and evening seats at a West End musical.' },
      { day: 'Day 6-7', title: 'Cotswolds & Windsor', desc: 'Charming stone cottages, countryside pub lunch, and royal Windsor Castle.' }
    ],
    inclusions: ['4-Star Historic Mayfair Hotel', 'London Underground Oyster Pass', 'West End Musical Ticket', 'Daily Traditional English Breakfast']
  },
];

export default function DestinationsSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [wishlist, setWishlist] = useState<string[]>(['rome', 'santorini']);
  const [activeDestination, setActiveDestination] = useState<DestinationItem | null>(null);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic
  const filteredDestinations = useMemo(() => {
    const list = DESTINATIONS.filter((dest) => {
      // Category filter
      if (selectedCategory === 'europe' && dest.region !== 'europe') return false;
      if (selectedCategory === 'asia' && dest.region !== 'asia') return false;
      if (selectedCategory === 'trending' && !['Best Seller', 'Top Rated', 'Trending'].includes(dest.tag || '')) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesCountry = dest.country.toLowerCase().includes(query);
        if (!matchesName && !matchesCountry) return false;
      }
      return true;
    });

    // Sorting
    const sorted = [...list];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === 'duration') {
      sorted.sort((a, b) => a.days - b.days);
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div id="destinations-container" className="py-16 sm:py-12 md:py-10 lg:py-24 bg-yellow-50 md:bg-white relative">
      
      {/* Decorative Jadoo Style Decore / Glow */}
      <div className="absolute top-10 right-8 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-8 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Main Header (Preserves original typography & visual identity) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8 sm:mb-10 px-4"
      >
        <p className="text-sm sm:text-base font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Top Selling
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Top Destinations
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          Handcrafted immersive voyages across the world&apos;s most captivating historical cities and coastal wonders.
        </p>
      </motion.div>

      {/* Interactive Controls Bar: Segmented Categories + Search & Sort */}
      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48 mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-gray-200/80 shadow-xs">
          
          {/* Segmented Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            {(
              [
                { id: 'all', label: 'All Destinations' },
                { id: 'europe', label: 'Europe' },
                { id: 'asia', label: 'Asia' },
                { id: 'trending', label: 'Trending Escapes' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-48">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="py-1.5 px-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Shortest Duration</option>
            </select>
          </div>

        </div>
      </div>

      {/* Destination Cards Grid (Exact signature card architecture, upgraded with professional interactions) */}
      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48">
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <FaCompass className="text-4xl text-amber-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-gray-800">No destinations match your criteria</h4>
            <p className="text-xs text-gray-500 mt-1">Try resetting your filters or search keywords.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-amber-500 rounded-xl hover:bg-amber-600 transition-colors"
            >
              View All Destinations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {filteredDestinations.map((destination, index) => {
              const isWishlisted = wishlist.includes(destination.id);

              return (
                <motion.div
                  key={destination.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 3) * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col group cursor-pointer"
                  onClick={() => setActiveDestination(destination)}
                >
                  {/* Card Image Banner */}
                  <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={`${destination.name} tour image`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="rounded-t-3xl object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Top Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10 pointer-events-none" />

                    {/* Top Row Badges: Tag + Wishlist Button */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      {destination.tag ? (
                        <span className="text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          {destination.tag}
                        </span>
                      ) : (
                        <span />
                      )}

                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(destination.id, e)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
                          isWishlisted
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 hover:bg-white text-gray-700 hover:text-rose-500'
                        }`}
                        title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
                        aria-label="Wishlist toggle"
                      >
                        {isWishlisted ? <FaHeart className="text-sm" /> : <FaRegHeart className="text-sm" />}
                      </button>
                    </div>

                    {/* Bottom Floating Rating on Image */}
                    <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1.5 text-xs text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
                      <FaStar className="text-amber-400 text-xs" />
                      <span className="font-bold">{destination.rating.toFixed(1)}</span>
                      <span className="text-white/80 text-[10px]">({destination.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Card Bottom Body (Exact signature layout from Jadoo) */}
                  <div className="p-5 sm:p-6 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Price */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {destination.name}
                        </h3>
                        <span className="text-base sm:text-lg font-extrabold text-blue-950 font-sans shrink-0 ml-2">
                          {destination.price}
                        </span>
                      </div>

                      {/* Highlights Pill Preview */}
                      <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                        {destination.highlights.join(' · ')}
                      </p>
                    </div>

                    {/* Duration with Iconic Jadoo Navigation Arrow */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FaLocationArrow className="text-amber-500 text-xs -rotate-45" />
                        <span className="font-semibold text-gray-700 capitalize">{destination.duration}</span>
                      </div>

                      <span className="text-amber-600 font-semibold group-hover:underline flex items-center gap-1 text-[11px]">
                        <span>View Plan</span>
                        <FaArrowRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Unique Quick Preview & Itinerary Modal */}
      <AnimatePresence>
        {activeDestination && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setActiveDestination(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.16 }}
              className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Image */}
              <div className="relative h-52 sm:h-60 w-full shrink-0">
                <Image
                  src={activeDestination.image}
                  alt={activeDestination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveDestination(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <FaTimes className="text-xs" />
                </button>

                <div className="absolute bottom-4 left-5 right-5 text-white flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-md">
                        {activeDestination.tag || 'Featured'}
                      </span>
                      <div className="flex items-center gap-1 text-xs">
                        <FaStar className="text-amber-400 text-xs" />
                        <span className="font-bold">{activeDestination.rating.toFixed(1)}</span>
                        <span className="text-white/70 text-[11px]">({activeDestination.reviewsCount} verified reviews)</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-extrabold">{activeDestination.name}</h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-white/80 block">All-inclusive from</span>
                    <span className="text-2xl font-black text-amber-400">{activeDestination.price}</span>
                  </div>
                </div>
              </div>

              {/* Modal Body with Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs text-gray-700 scrollbar-thin">
                
                {/* Quick Meta */}
                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Duration</span>
                    <span className="font-bold text-gray-900 mt-0.5 block flex items-center justify-center gap-1">
                      <FaClock className="text-amber-500 text-[10px]" />
                      {activeDestination.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Destination</span>
                    <span className="font-bold text-gray-900 mt-0.5 block flex items-center justify-center gap-1">
                      <FaMapMarkerAlt className="text-amber-500 text-[10px]" />
                      {activeDestination.country}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Pacing</span>
                    <span className="font-bold text-gray-900 mt-0.5 block flex items-center justify-center gap-1">
                      <FaSuitcaseRolling className="text-amber-500 text-[10px]" />
                      Curated Leisure
                    </span>
                  </div>
                </div>

                {/* Day-by-Day Highlight Timeline */}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-3">
                    Curated Itinerary Breakdown
                  </h4>
                  <div className="space-y-2.5 border-l-2 border-amber-300 ml-2 pl-4 py-1">
                    {activeDestination.itinerary.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white" />
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-amber-700 text-[11px] font-mono">{step.day}:</span>
                          <span className="font-bold text-gray-900">{step.title}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included in this trip */}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2.5">
                    What&apos;s Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeDestination.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100 text-[11px]">
                        <FaCheck className="text-emerald-500 text-xs shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveDestination(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>

                <a
                  href="#bookings"
                  onClick={() => setActiveDestination(null)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Book This Destination</span>
                  <FaArrowRight className="text-[10px]" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
