'use client';

import Header from "@/app/components/header";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaCoffee, FaHeart, FaRegHeart } from "react-icons/fa";
import { useTravel } from "@/app/context/TravelContext";

export default function HotelsPage() {
  const { openBookingModal, isInWishlist, toggleWishlist } = useTravel();

  const hotels = [
    {
      id: "hotel-rome-ville",
      name: "Grand Hotel De La Ville",
      city: "Rome, Italy",
      image: "/images/destination-4.jpg",
      rating: 4.9,
      price: "$240",
      numericPrice: 240,
      reviews: 320,
    },
    {
      id: "hotel-paris-meurice",
      name: "Le Meurice Palace Suites",
      city: "Paris, France",
      image: "/images/destination-6.jpg",
      rating: 4.8,
      price: "$310",
      numericPrice: 310,
      reviews: 410,
    },
    {
      id: "hotel-shanghai-peninsula",
      name: "The Peninsula Riverside",
      city: "Shanghai, China",
      image: "/images/destination-1.jpg",
      rating: 4.7,
      price: "$190",
      numericPrice: 190,
      reviews: 280,
    },
    {
      id: "hotel-santorini-villas",
      name: "Santorini Cliff Luxury Villas",
      city: "Santorini, Greece",
      image: "/images/destination-2.jpg",
      rating: 5.0,
      price: "$350",
      numericPrice: 350,
      reviews: 520,
    },
  ];

  const handleReserveHotel = (hotel: typeof hotels[0]) => {
    openBookingModal({
      destination: `${hotel.name} (${hotel.city})`,
      basePrice: hotel.numericPrice * 5
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-yellow-50 py-10 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Luxury &amp; Boutique Hotels</h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Hand-picked premium hotels and suites for unforgettable vacations worldwide.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hotels.map((hotel) => {
            const isSaved = isInWishlist(hotel.id);

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col sm:flex-row group"
              >
                <div className="relative w-full sm:w-1/2 h-52 sm:h-auto overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleWishlist(hotel.id)}
                    className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-rose-500 shadow-sm transition-colors cursor-pointer"
                    aria-label="Save hotel"
                  >
                    {isSaved ? <FaHeart className="text-rose-500 text-xs" /> : <FaRegHeart className="text-xs" />}
                  </button>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-yellow-500 text-sm mb-1">
                      <FaStar className="mr-1" />
                      <span className="font-bold text-gray-800">{hotel.rating}</span>
                      <span className="text-gray-400 ml-1">({hotel.reviews} reviews)</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <FaMapMarkerAlt className="mr-1 text-red-400" />
                      <span>{hotel.city}</span>
                    </div>
                    <div className="flex space-x-3 text-gray-400 text-xs mt-3">
                      <span title="Free Wi-Fi" className="flex items-center gap-1"><FaWifi /> Wi-Fi</span>
                      <span title="Pool" className="flex items-center gap-1"><FaSwimmingPool /> Pool</span>
                      <span title="Breakfast included" className="flex items-center gap-1"><FaCoffee /> Breakfast</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{hotel.price}</span>
                      <span className="text-gray-500 text-xs"> / night</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleReserveHotel(hotel)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors shadow-xs cursor-pointer"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
