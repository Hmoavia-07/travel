import Header from "@/app/components/header";
import DestinationsSection from "@/app/components/destinations";
import Link from "next/link";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-yellow-50 py-8 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Explore Destinations</h1>
        <p className="text-gray-600 text-sm md:text-base">
          <Link href="/" className="hover:text-yellow-600 underline">Home</Link> &gt; Destinations
        </p>
      </div>
      <DestinationsSection />
    </div>
  );
}
