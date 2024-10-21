
import React from "react";
import Image from 'next/image';
import Header from "../components/header";

export default function Homepage() {
  return (
    <div className="lg:h-screen lg:w-screen bg-yellow-50 md:bg-white bg-[url('/images/Decore.png')] bg-cover bg-center flex flex-col ">
      {/* Header at the top */}
      <Header />

      {/* Main Content Section */}
      <div className=" flex items-center justify-center "> {/* Flexbox for centering content */}
        <div className="w-full max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-12 lg:px-48 xl:px-16">
          {/* Left Content */}
          <div className="text-center md:text-left max-w-lg   ">
            <h1 className="text-orange-600 font-bold text-sm md:text-lg ">
              BEST DESTINATION AROUND THE WORLD
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-gray-900 font-bold py-3">
              Travel, enjoy and live a new and full life
            </h2>
            <p className="py-3 max-w-md text-sm md:text-base lg:text-lg">
              Built Wicket longer admire do barton vanity itself do in it, Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
            </p>

            {/* Button Container */}
            <div className=" flex justify-center md:justify-start space-x-4 md:space-x-8"> {/* Stack buttons vertically on small screens */}
            <button className="bg-yellow-400 text-white hover:bg-yellow-600 rounded-md px-3 py-1 md:px-4 md:py-2">
                Find out more
              </button>
            <button className="w-[110px] md:w-[140px]">
             <img src="./images/Play Demo.png" alt="" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[350px] md:w-[450px] md:h-[500px] lg:w-[550px] lg:h-[600px] ">
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
