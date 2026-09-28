'use client';

import { useState } from "react";
import Header from "@/app/components/header";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-yellow-50 py-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">Get in Touch</h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Have questions about your next vacation, custom packages, or group bookings? Our travel experts are here 24/7.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <span className="text-orange-600 font-bold uppercase text-sm tracking-wider">Contact Info</span>
              <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">We Love to Hear From You</h2>
              <p className="text-gray-600">
                Reach out to us via message or phone, and one of our travel consultants will respond within 2 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl mt-1">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email Us</h4>
                  <a href="mailto:contact@Jadootravel.com" className="text-gray-600 hover:text-yellow-600">
                    contact@Jadootravel.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mt-1">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Call Us</h4>
                  <p className="text-gray-600">+1 (800) 555-JADOO (5236)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl mt-1">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Headquarters</h4>
                  <p className="text-gray-600">742 Evergreen Terrace, Suite 500, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600 text-sm">
                  Thank you for reaching out. A Jadoo travel specialist will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Trip Inquiry / Custom Package"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about where you want to travel, dates, and number of guests..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
