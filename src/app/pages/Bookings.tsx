import React from "react";
import { IconType } from "react-icons";
import { FaAirbnb, FaHeart, FaLeaf, FaPlaneDeparture } from "react-icons/fa";
import {
  FaBridge,
  FaBuildingFlag,
  FaLandmarkDome,
  FaMoneyBillTransfer,
} from "react-icons/fa6";

interface BookingStepProps {
  icon: IconType;
  color: string;
  title: string;
  description: string;
}

const BookingStep: React.FC<BookingStepProps> = ({
  icon: Icon,
  color,
  title,
  description,
}) => (
  <div className="text-left mt-4 sm:mt-8 flex justify-start md:space-x-4 space-x-2 sm:space-x-3">
    <div
      className={`${color} md:w-16 md:h-16 w-12 h-10 flex justify-center items-center rounded-md`}
    >
      <Icon size={30} className="text-white" />
    </div>
    <div>
      <h3 className="md:text-xl text-sm font-semibold text-blue-950">
        {title}
      </h3>
      <p className="text-gray-600 mt-1 font-normal">{description}</p>
    </div>
  </div>
);

const TripCard = () => (
  <div className="md:w-96 sm:w-80 w-60 shadow-2xl rounded-3xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 shadow-blue-300">
    <img
      className="md:w-96 sm:w-80 w-60"
      src="/images/Rectangle 17.jpg"
      alt="Trip to Greece"
    />
    <div>
      <h3 className="font-semibold md:text-xl text-lg">Trip To Greece</h3>
      <p className="mt-1 sm:mt-2 text-sm md:text-lg text-slate-500">
        14-27 June | by Robbin Flake
      </p>
      <div className="flex justify-start space-x-4 mt-4 sm:mt-5">
        <div className="md:bg-slate-100 bg-orange-100 p-1 sm:p-2 rounded-full">
          <FaLeaf size={20} className="text-slate-400" />
        </div>
        <div className="md:bg-slate-100 bg-orange-100 p-1 sm:p-2 rounded-full">
          <FaBridge size={20} className="text-slate-400" />
        </div>
        <div className="md:bg-slate-100 bg-orange-100 p-1 sm:p-2 rounded-full">
          <FaAirbnb size={20} className="text-slate-400" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 sm:mt-5 ">
        <div className="items-center space-x-2 sm:space-x-3 flex justify-start">
        <FaBuildingFlag className="text-slate-400 " />
        <p className="text-sm md:text-lg text-slate-600">24 people going</p>
        </div>
        <div>
        <FaHeart
          size={22}
          className="text-blue-600 hover:text-red-500 transition-transform duration-300 ease-in-out transform hover:scale-125  "
        />
        </div>
      </div>
    </div>
  </div>
);

export default function Bookings() {
  return (
    <div className="px-4 sm:px-12 md:px-20 lg:px-48 py-4 sm:py-9 md:py-14 lg:py-20 bg-yellow-50 md:bg-white">
      {/* Flex container for layout */}
      <div className="flex flex-col lg:flex-row items-start lg:space-x-28">
        {/* Booking Steps on the left */}
        <div className="lg:w-1/2 mb-8">
          {/* Heading */}
          <div className="text-left mb-8 mt-8">
            <h2 className="md:text-xl text-sm font-semibold text-slate-700">
              Easy and Fast
            </h2>
            <h1 className="lg:text-5xl text-2xl sm:text-3xl font-bold text-slate-800">
              Book Your Next Trip in 3 Easy Steps
            </h1>
          </div>

          {/* Booking Steps */}
          <BookingStep
            icon={FaLandmarkDome}
            color="bg-yellow-500"
            title="Choose Destination"
            description="Select from our wide range of exciting travel destinations."
          />
          <BookingStep
            icon={FaMoneyBillTransfer}
            color="bg-red-500"
            title="Make Payment"
            description="Secure your booking with our quick and easy payment options."
          />
          <BookingStep
            icon={FaPlaneDeparture}
            color="bg-cyan-700"
            title="Reach Airport On Selected Date"
            description="Get ready for your journey and arrive at the airport on time."
          />
        </div>

        {/* TripCard on the right */}
        <div className="lg:w-1/2 lg:mt-16 mt-8 ">
          <TripCard />
        </div>
      </div>
    </div>
  );
}
