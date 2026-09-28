'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { FaUser, FaSignOutAlt, FaChevronDown, FaSuitcase, FaCheckCircle } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setIsOpen(false);
  };

  // User initial
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="relative z-40">
      <div>
        <nav className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-48 py-3 sm:py-4 md:py-5">
          {/* Logo */}
          <Link href="/" className="w-[90px] sm:w-[140px] md:w-[145px] lg:w-[170px]">
            <Image
              src="/images/logo.png"
              alt="Jadoo"
              width={170}
              height={40}
              className="w-auto h-auto"
              priority
            />
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 md:space-x-8 lg:space-x-12">
            <ul className="flex items-center space-x-6 md:space-x-8 lg:space-x-10">
              <li>
                <Link href="/destination" className="hover:underline hover:text-red-500 font-medium text-gray-700">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:underline hover:text-red-500 font-medium text-gray-700">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/flights" className="hover:underline hover:text-red-500 font-medium text-gray-700">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="/#bookings" className="hover:underline hover:text-red-500 font-medium text-gray-700">
                  Bookings
                </Link>
              </li>
            </ul>

            {/* Auth State (Desktop): If logged in, REMOVE login/signup buttons and show user profile */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pl-2.5 pr-3 rounded-full bg-yellow-50 hover:bg-yellow-100/80 border border-yellow-200 transition-all cursor-pointer shadow-sm"
                  aria-label="User Account Menu"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-400 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {userInitial}
                  </div>
                  <span className="font-semibold text-sm text-gray-800 max-w-[120px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <FaChevronDown className={`text-xs text-gray-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 py-3 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <div className="flex items-center space-x-2">
                        <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                        <FaCheckCircle className="text-yellow-500 text-xs" title="Verified Member" />
                      </div>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Member since {user.memberSince || '2024'}
                      </span>
                    </div>

                    <ul className="text-sm text-gray-700">
                      <li>
                        <Link
                          href="/#bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
                        >
                          <FaSuitcase className="mr-3 text-gray-400" />
                          <span>My Bookings</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/destination"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
                        >
                          <FaUser className="mr-3 text-gray-400" />
                          <span>Explore Trips</span>
                        </Link>
                      </li>
                    </ul>

                    <div className="border-t border-gray-100 mt-2 pt-2 px-3">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* When not logged in: show Login and Sign up buttons */
              <div className="flex items-center space-x-5">
                <Link
                  href="/login"
                  className="hover:underline hover:text-red-500 font-medium text-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 border border-black rounded-md hover:text-red-500 hover:border-red-500 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Bar: User badge / Hamburger */}
          <div className="md:hidden flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-1.5 bg-yellow-100/70 border border-yellow-300/80 px-2.5 py-1 rounded-full">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-white font-bold flex items-center justify-center text-xs">
                  {userInitial}
                </span>
                <span className="text-xs font-bold text-gray-800 max-w-[80px] truncate">
                  {user.name.split(" ")[0]}
                </span>
              </div>
            ) : (
              <ul className="flex items-center space-x-2">
                <li>
                  <Link href="/login" className="hover:underline hover:text-red-500 text-xs font-semibold">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="px-2 py-0.5 border border-black rounded hover:text-red-500 hover:border-red-500 text-xs font-semibold"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            )}

            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none p-1 text-gray-800 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              ☰
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-amber-50 border-b border-amber-200">
            {/* If logged in on mobile: show user card */}
            {user && (
              <div className="p-4 bg-amber-100/60 border-b border-amber-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 text-white font-bold flex items-center justify-center text-base shadow">
                    {userInitial}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            <ul className="flex flex-col text-center space-y-3 p-5 font-medium">
              <li>
                <Link
                  href="/destination"
                  onClick={() => setIsOpen(false)}
                  className="hover:underline hover:text-red-500 block py-1"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/hotels"
                  onClick={() => setIsOpen(false)}
                  className="hover:underline hover:text-red-500 block py-1"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/flights"
                  onClick={() => setIsOpen(false)}
                  className="hover:underline hover:text-red-500 block py-1"
                >
                  Flights
                </Link>
              </li>
              <li>
                <Link
                  href="/#bookings"
                  onClick={() => setIsOpen(false)}
                  className="hover:underline hover:text-red-500 block py-1"
                >
                  Bookings
                </Link>
              </li>

              {/* Only show Login & Signup if NOT logged in */}
              {!user && (
                <>
                  <li className="pt-2 border-t border-amber-200">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="hover:underline hover:text-red-500 block py-1 font-semibold text-gray-800"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 bg-yellow-400 text-white rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
