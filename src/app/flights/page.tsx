'use client';

import Header from "@/app/components/header";
import { FaPlaneDeparture, FaClock, FaSuitcase } from "react-icons/fa";
import { useTravel } from "@/app/context/TravelContext";

export default function FlightsPage() {
  const { openBookingModal } = useTravel();

  const flights = [
    {
      airline: "Emirates",
      flightNo: "EK-204",
      from: "New York (JFK)",
      to: "Rome (FCO)",
      depTime: "10:30 PM",
      arrTime: "12:15 PM (+1)",
      duration: "7h 45m",
      stops: "Direct",
      price: "$680",
      numericPrice: 680,
    },
    {
      airline: "Air France",
      flightNo: "AF-007",
      from: "New York (JFK)",
      to: "Paris (CDG)",
      depTime: "06:15 PM",
      arrTime: "07:30 AM (+1)",
      duration: "7h 15m",
      stops: "Direct",
      price: "$720",
      numericPrice: 720,
    },
    {
      airline: "Singapore Airlines",
      flightNo: "SQ-322",
      from: "London (LHR)",
      to: "Singapore (SIN)",
      depTime: "08:20 PM",
      arrTime: "04:55 PM (+1)",
      duration: "12h 35m",
      stops: "Direct",
      price: "$890",
      numericPrice: 890,
    },
    {
      airline: "Japan Airlines",
      flightNo: "JL-005",
      from: "San Francisco (SFO)",
      to: "Tokyo (HND)",
      depTime: "11:45 AM",
      arrTime: "03:10 PM (+1)",
      duration: "11h 25m",
      stops: "Direct",
      price: "$950",
      numericPrice: 950,
    },
  ];

  const handleSelectFlight = (flight: typeof flights[0]) => {
    openBookingModal({
      destination: `${flight.airline} ${flight.flightNo} (${flight.from} → ${flight.to})`,
      basePrice: flight.numericPrice
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-yellow-50 py-10 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Find Best Flight Deals</h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Compare top airlines, discover flexible itineraries, and secure guaranteed best fares with zero hidden charges.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48 py-12">
        <div className="space-y-6">
          {flights.map((flight, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                  <FaPlaneDeparture />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{flight.airline}</h3>
                  <span className="text-xs text-gray-500">{flight.flightNo} • Economy</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 sm:space-x-12 text-center">
                <div>
                  <p className="text-xl font-bold text-gray-800">{flight.depTime}</p>
                  <p className="text-xs text-gray-500">{flight.from}</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><FaClock /> {flight.duration}</span>
                  <div className="w-24 h-0.5 bg-yellow-400 my-1 relative">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 absolute -top-0.5 right-0"></div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">{flight.stops}</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">{flight.arrTime}</p>
                  <p className="text-xs text-gray-500">{flight.to}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-900">{flight.price}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 justify-end"><FaSuitcase /> Baggage inc.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectFlight(flight)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
