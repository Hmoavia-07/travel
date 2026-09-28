'use client';

import Header from "@/app/components/header";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaCoffee } from "react-icons/fa";

export default function HotelsPage() {
  const hotels = [
    {
      name: "Grand Hotel De La Ville",
      city: "Rome, Italy",
      image: "/images/destination-4.jpg",
      rating: 4.9,
      price: "$240",
      reviews: 320,
    },
    {
      name: "Le Meurice Palace Suites",
      city: "Paris, France",
      image: "/images/destination-6.jpg",
      rating: 4.8,
      price: "$310",
      reviews: 410,
    },
    {
      name: "The Peninsula Riverside",
      city: "Shanghai, China",
      image: "/images/destination-1.jpg",
      rating: 4.7,
      price: "$190",
      reviews: 280,
    },
    {
      name: "Santorini Cliff Luxury Villas",
      city: "Santorini, Greece",
      image: "/images/destination-2.jpg",
      rating: 5.0,
      price: "$350",
      reviews: 520,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-yellow-50 py-10 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Luxury &amp; Boutique Hotels</h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Hand-picked premium hotels and stays for unforgettable vacations worldwide.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col sm:flex-row"
            >
              <div className="relative w-full sm:w-1/2 h-52 sm:h-auto">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
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
                  <div className="flex space-x-3 text-gray-400 text-sm mt-3">
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
                  <Link
                    href="/#bookings"
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors"
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
