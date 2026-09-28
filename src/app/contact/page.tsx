'use client';

import { useState } from "react";
import Header from "@/app/components/header";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaExclamationCircle } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSent(true);
        setTicketId(data.ticketId || "JD-TKT-99214");
      } else {
        setErrorMessage(data.error || "Failed to deliver message. Please verify fields.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
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
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Message Delivered!</h3>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  Thank you for reaching out. A Jadoo travel specialist will contact you shortly.
                </p>
                <div className="pt-2">
                  <span className="inline-block text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                    TICKET REF: #{ticketId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 border rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <FaExclamationCircle className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Trip Inquiry / Custom Package"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about where you want to travel, dates, and number of guests..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-70 text-white font-bold rounded-xl shadow-md transition-colors text-sm cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
