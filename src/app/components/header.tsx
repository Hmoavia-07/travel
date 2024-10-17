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
      <nav className="flex justify-between items-center px-8 sm:px-8 lg:px-32 py-5">

          {/* Logo */}
          <Link href="/" className="font-extrabold text-4xl">
            jaadoo
          </Link>

          {/* Hamburger menu for mobile */}
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="text-3xl">
              ☰
            </button>
          </div>

          {/* Nav Links */}
          <div className={`hidden sm:flex space-x-12`}>
            <ul className="flex items-center space-x-8">
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
          <div className="sm:hidden bg-amber-100">
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
        )}
      </div>
    </header>
  );
}
