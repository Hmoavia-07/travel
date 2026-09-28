'use client';

import { useState } from "react";
import Header from "@/app/components/header";
import Link from "next/link";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I book a destination with Jadoo?",
      a: "Booking is easy: choose your preferred destination from our top destinations catalog, select your travel dates, review itinerary details, and complete your secure payment. You will immediately receive a digital confirmation and travel voucher.",
    },
    {
      q: "What is your cancellation and refund policy?",
      a: "We offer 100% free cancellation on most hotel reservations and holiday packages up to 48 hours before departure. Flight tickets are subject to the specific airline's fare rules.",
    },
    {
      q: "Are flights and hotel transfers included in the tour packages?",
      a: "Yes! All packages marked with the all-inclusive badge include round-trip flights, airport transfers, luxury hotel accommodations, and guided excursions.",
    },
    {
      q: "Can I customize an itinerary for a private group?",
      a: "Absolutely. Contact our custom itinerary department through our Contact page, and a personal travel coordinator will design your dream trip according to your budget and schedule.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. Flexible monthly installment payment plans are also available for bookings over $1,000.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-yellow-50 py-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Got questions? Here are the most common questions travelers ask about our bookings, packages, and flights.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48 py-16 max-w-4xl">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-6 font-semibold text-lg text-gray-800 flex justify-between items-center hover:bg-yellow-50/50"
              >
                <span>{faq.q}</span>
                <span className="text-xl font-bold text-yellow-500">
                  {openIdx === idx ? "−" : "+"}
                </span>
              </button>
              {openIdx === idx && (
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-yellow-50 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Still have questions?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Our support team is always available to help you plan your ideal vacation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-md transition-colors"
          >
            Contact Customer Support
          </Link>
        </div>
      </div>
    </div>
  );
}
