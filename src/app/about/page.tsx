import Header from "@/app/components/header";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-yellow-50 py-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">About Jadoo Travel</h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          We believe travel has the power to transform lives. Our mission is to make seamless, customized travel accessible to everyone across the globe.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-12 md:px-16 lg:px-48 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-600 font-bold uppercase text-sm tracking-wider">Our Story</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">Crafting Unforgettable Experiences Since 2018</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Jadoo was founded with a single purpose: eliminating the stress and complexity from planning international vacations. Over the past several years, we have helped over 50,000 travelers explore more than 80 countries.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From historic architecture in Rome to exotic coastal islands in Greece, we curate hand-selected local partners, vetted stays, and personalized itineraries tailored precisely to you.
            </p>
            <div className="mt-6">
              <Link href="/destination" className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl font-medium inline-block shadow-md">
                Browse Destinations
              </Link>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/destination-2.jpg"
              alt="Santorini view"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-8 border-t border-gray-100">
          <div className="p-6 bg-yellow-50/50 rounded-2xl">
            <h3 className="text-4xl font-extrabold text-blue-950 mb-2">50,000+</h3>
            <p className="text-gray-600 font-medium">Happy Travelers</p>
          </div>
          <div className="p-6 bg-yellow-50/50 rounded-2xl">
            <h3 className="text-4xl font-extrabold text-blue-950 mb-2">120+</h3>
            <p className="text-gray-600 font-medium">Global Destinations</p>
          </div>
          <div className="p-6 bg-yellow-50/50 rounded-2xl">
            <h3 className="text-4xl font-extrabold text-blue-950 mb-2">99.4%</h3>
            <p className="text-gray-600 font-medium">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
