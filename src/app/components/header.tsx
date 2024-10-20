'use client'


import Link from "next/link";
import { useState } from "react"; // For mobile menu toggle

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div>
      <nav className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-48 py-3 sm:py-4 md:py-5">

          {/* Logo */}
          <Link href="/" className="w-[90px] sm:w-[140px] md:w-[145px] lg:w-[170px]">
            <img src="../images/logo.png" alt="" />
          </Link>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden flex items-center space-x-3 sm:space-x-7">
            <ul className=" flex justify-start space-x-2 sm:space-x-5">
            <li>
                <Link href="./Login" className="hover:underline hover:text-red-500 text-xs sm:text-lg">
                  Login
                </Link>
              </li>
              <li>
                <Link href="./SignUp" className="outline-none rounded-e outline-black hover:text-red-500 hover:outline-red-500 text-xs sm:text-lg">
                  Sign up
                </Link>
              </li>
            </ul>
            <button onClick={toggleMenu} className="text-2xl sm:text-3xl ">
              ☰
            </button>
          </div>

          {/* Nav Links */}
          <div className={`hidden  md:flex `}>
            <ul className="flex items-center space-x-8 md:space-x-8 lg:space-x-16">
              <li>
                <Link href="/pages/destination" className="hover:underline hover:text-red-500">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="./Hotels" className="hover:underline hover:text-red-500">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="./Flights" className="hover:underline hover:text-red-500">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="./Bookings" className="hover:underline hover:text-red-500">
                  Bookings
                </Link>
              </li>
              <li>
                <Link href="./Login" className="hover:underline hover:text-red-500">
                  Login
                </Link>
              </li>
              <li>
                <Link href="./SignUp" className="outline-none outline-black hover:text-red-500 hover:outline-red-500">
                  Sign up
                </Link>
                </li>
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-amber-100">
            <ul className="flex flex-col text-center space-y-4 p-4">
              <li>
                <Link href="./Destination" className="hover:underline hover:text-red-500">
                  Destination
                </Link>
              </li>
              <li>
                <Link href="./Hotels" className="hover:underline hover:text-red-500">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="./Flights" className="hover:underline hover:text-red-500">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="./Bookings" className="hover:underline hover:text-red-500">
                  Bookings
                </Link>
              </li>
          
              
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
