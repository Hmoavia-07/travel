import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faPlane, faCalendarAlt, faCog } from "@fortawesome/free-solid-svg-icons"; // Import icons

export default function Category() {
  return (
    <div className="bg-gray-100 py-64 sm:py-64 lg:py-9">
      <div className="text-center p-12">
        <h1 className="text-lg font-bold text-gray-800">CATEGORY</h1>
        <h2 className="text-4xl text-gray-900 font-bold py-3">We Offer Best Services</h2>
      </div>
      {/* Card Container */}
      <div className="flex flex-wrap justify-center gap-6 px-4 md:px-20">
        {/* Card 1 */}
        <div className="bg-white p-6 text-center flex-1 min-w-[250px] max-w-[300px]">
          <div className="hover:bg-white bg-gray-100 shadow-xl rounded-b-3xl p-3 text-center transition-transform transform hover:scale-105">
            <FontAwesomeIcon icon={faCloudSun} className="text-2xl text-orange-500 mb-4" />
            <h1 className="text-lg font-semibold">Calculated Weather</h1>
            <p className="text-gray-600">Experience accurate and up-to-date weather information tailored to your needs.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 text-center flex-1 min-w-[250px] max-w-[300px]">
          <div className="hover:bg-white bg-gray-100 shadow-xl rounded-b-3xl p-3 text-center transition-transform transform hover:scale-105">
            <FontAwesomeIcon icon={faPlane} className="text-2xl text-blue-500 mb-4" />
            <h1 className="text-lg font-semibold">Best Flights</h1>
            <p className="text-gray-600">Find the best flight options and prices to your favorite destinations.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 text-center flex-1 min-w-[250px] max-w-[300px]">
          <div className="hover:bg-white bg-gray-100 shadow-xl rounded-b-3xl p-3 text-center transition-transform transform hover:scale-105">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-2xl text-green-500 mb-4" />
            <h1 className="text-lg font-semibold">Local Events</h1>
            <p className="text-gray-600">Stay updated on local events and activities happening around you.</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 text-center flex-1 min-w-[250px] max-w-[300px]">
          <div className="hover:bg-white bg-gray-100 shadow-xl rounded-b-3xl p-3 text-center transition-transform transform hover:scale-105">
            <FontAwesomeIcon icon={faCog} className="text-2xl text-purple-500 mb-4" />
            <h1 className="text-lg font-semibold">Customization</h1>
            <p className="text-gray-600">Get personalized services tailored to your specific requirements.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

