import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"; // Import the icon
import React from "react";
import Image from 'next/image';
import Header from "../components/header";

export default function Homepage() {
  return (
    <div className="h-screen w-screen lg:bg-[url('/images/herobg.jpg')] bg-cover bg-center flex flex-col bg-gray-100 sm:bg-gray-100">
      {/* Header at the top */}
      <Header />

      {/* Main Content Section */}
      <div className="flex-grow flex items-center justify-center"> {/* Flexbox for centering content */}
        <div className="w-full max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-20 lg:px-32">
          {/* Left Content */}
          <div className="text-center max-w-lg  ">
            <h1 className="text-orange-600 font-bold text-lg">
              BEST DESTINATION AROUND THE WORLD
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-gray-900 font-bold leading-tight py-3">
              Travel, enjoy and live a new and full life
            </h2>
            <p className="py-3 max-w-md text-sm md:text-base lg:text-lg">
              Built Wicket longer admire do barton vanity itself do in it, Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
            </p>

            {/* Button Container */}
            <div className="flex flex-col md:flex-row justify-center items-center"> {/* Stack buttons vertically on small screens */}
              <button className="bg-yellow-400 text-white hover:bg-yellow-600 rounded-md px-4 py-2 text-sm md:text-base mx-2 my-2">
                Find out more
              </button>
              <button className="flex items-center bg-transparent hover:text-gray-700 text-sm md:text-base mx-2 my-2">
                <FontAwesomeIcon icon={faPlayCircle} className="mr-2 text-red-500 hover:text-red-700" /> 
                <span>Play Demo</span>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
            <Image
              src="/images/2.png"
              alt="Description of image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
