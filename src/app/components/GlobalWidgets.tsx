'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTravel } from "@/app/context/TravelContext";
import {
  FaTimes,
  FaCalendarAlt,
  FaUserFriends,
  FaCheckCircle,
  FaSuitcaseRolling,
  FaTrashAlt,
  FaArrowRight,
  FaInfoCircle
} from "react-icons/fa";

export default function GlobalWidgets() {
  const {
    toast,
    isMyBookingsOpen,
    closeMyBookings,
    bookings,
    cancelBooking,
    openBookingModal
  } = useTravel();

  return (
    <>
      {/* 1. Global Toast Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold text-white bg-slate-900/95 backdrop-blur-md border border-slate-700/50 max-w-sm pointer-events-auto"
          >
            {toast.type === "success" && <FaCheckCircle className="text-emerald-400 text-sm shrink-0" />}
            {toast.type === "info" && <FaInfoCircle className="text-amber-400 text-sm shrink-0" />}
            {toast.type === "error" && <FaTimes className="text-rose-400 text-sm shrink-0" />}
            <span className="flex-1 leading-snug">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. "My Bookings" Slide-Over Drawer */}
      <AnimatePresence>
        {isMyBookingsOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs"
            onClick={closeMyBookings}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">My Travel Reservations</h3>
                  <p className="text-xs text-gray-500">
                    {bookings.length} {bookings.length === 1 ? "booking" : "bookings"} on record
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeMyBookings}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Close Drawer"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Drawer Bookings List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto text-xl">
                      <FaSuitcaseRolling />
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">No Active Bookings</h4>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      Explore our hand-crafted destinations and reserve your first getaway with complimentary cancellation.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        closeMyBookings();
                        openBookingModal();
                      }}
                      className="mt-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm inline-flex items-center gap-1.5"
                    >
                      <span>Book a Trip Now</span>
                      <FaArrowRight className="text-[10px]" />
                    </button>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-3 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-200">
                            <Image
                              src={booking.image || "/images/destination-4.jpg"}
                              alt={booking.destination}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                              {booking.id}
                            </span>
                            <h4 className="font-bold text-sm text-gray-900 mt-1">{booking.destination}</h4>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          booking.status === "Ongoing"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-white p-2.5 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-gray-400 text-[10px]" />
                          <span>{booking.departureDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaUserFriends className="text-gray-400 text-[10px]" />
                          <span>{booking.guests} {booking.guests > 1 ? "Travelers" : "Traveler"}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Total Paid</span>
                          <span className="block font-black text-sm text-blue-950">
                            ${booking.totalPrice.toLocaleString()}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => cancelBooking(booking.id)}
                          className="px-2.5 py-1.5 text-[11px] font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <FaTrashAlt className="text-[10px]" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
                <Link
                  href="/destination"
                  onClick={closeMyBookings}
                  className="font-semibold text-yellow-600 hover:text-yellow-700 hover:underline"
                >
                  Explore More Destinations
                </Link>
                <button
                  type="button"
                  onClick={closeMyBookings}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-semibold text-gray-800 rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
