import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa'; // Make sure to install react-icons

export default function Destinations() {
    const destinations = [
        { name: 'Rome, Italy', price: '$4.2k', duration: '10 days trip', image: '/images/destination-4.jpg' },
        { name: 'Paris, Landon', price: '$5.2k', duration: '18 days trip', image: '/images/destination-6.jpg' },
        { name: 'Shangai, Chna', price: '$3.5k', duration: '12 days trip', image: '/images/destination-1.jpg' },
        // Add more destinations here
    ];

    return (
        <div className="py-16 sm:py-10 md:py-7 lg:py-20 bg-yellow-50 md:bg-white">
            <div className="text-center mb-12">
                <h1 className="text-lg font-semibold text-gray-600 mb-2">
                    Top Selling
                </h1>
                <h2 className="text-4xl font-bold text-gray-800">Top Destinations</h2>
            </div>

            {/* Cards */}
            <div className="container mx-auto px-4 sm:px-12 md:px-28 lg:px-64 ">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-11 lg:gap-14">
                    {destinations.map((destination, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-110">
                            <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 ">
                                <Image
                                    src={destination.image}
                                    alt={`${destination.name} tour image`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg"
                                />
                            </div>
                            <div className="p-2 sm:p-3 md:p-4 lg:p-5 bg-yellow-50 md:bg-white ">
                                <div className="flex justify-between items-center mb-2 md:mb-2">
                                    <h3 className="text-sm sm:text-xl  font-semibold text-gray-800">{destination.name}</h3>
                                    <span className="textsm md:text-lg font-bold text-blue-900">{destination.price}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm md:text-lg">
                                    <FaCalendarAlt className="mr-2 " />
                                    <span>{destination.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
