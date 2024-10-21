import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faPlane, faCalendarAlt, faCog } from "@fortawesome/free-solid-svg-icons"; // Import icons

export default function Category() {
  return (
    <div className="bg-yellow-50 md:bg-white py-16 sm:py-10 md:py-7 lg:py-4">
      <div className="text-center p-4 sm:p-7 md:p-11">
        <h1 className="text-sm md:text-lg font-bold text-gray-800">CATEGORY</h1>
        <h2 className="text-2xl md:text-4xl text-gray-900 font-bold py-1 md:py-3 ">We Offer Best Services</h2>
      </div>
      {/* Card Container */}
      <div className="flex flex-wrap justify-center px-4 sm:px10 md:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7 lg:gap-10">
        {/* Card 1 */}
        <div className="md:bg-slate-50 p-2 md:p-6 sm:p-3 text-center flex-1 min-w-[100px] max-w-[150px] sm:min-w-[150px] sm:max-w-[200px] md:min-w-[200px] md:max-w-[250px] lg:min-w-[250px] lg:max-w-[250px]">
          <div className="hover:bg-white bg-orange-50 md:bg-gray-100 shadow-xl rounded-b-3xl p-3 text-center transition-transform transform hover:scale-105">
            <FontAwesomeIcon icon={faCloudSun} className="text-2xl text-orange-500 mb-1 sm:mb-2 md:mb-3 lg:mb-4 " />
            <h1 className="text-sm sm:text-sm md:text-lg lg:text-lg font-semibold ">Calculated Weather</h1>
            <p className="text-gray-600 text-sm sm:text-sm md:text-lg lg:text-lg">Experience accurate and up-to-date weather information tailored to your needs.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="md:bg-slate-50  p-2 sm:p-3 md:p-6 text-center flex-1 min-w-[100px] max-w-[150px] sm:min-w-[150px] sm:max-w-[200px] md:min-w-[200px] md:max-w-[250px]  lg:min-w-[250px] lg:max-w-[250px]">
          <div className="hover:bg-white bg-orange-50 md:bg-gray-100 shadow-xl rounded-b-3xl p-3 text-center transition-transform hover:scale-105">
            <FontAwesomeIcon icon={faPlane} className="text-2xl text-blue-500 mb-1 sm:mb-2 md:mb-3 lg:mb-4" />
            <h1 className="text-sm sm:text-sm md:text-lg lg:text-lg font-semibold">Best Flights</h1>
            <p className="text-gray-600 text-sm sm:text-sm md:text-lg lg:text-lg">Find the best flight options and prices to your favorite destinations.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="md:bg-slate-50  p-2 sm:p-3 md:p-6 text-center flex-1  min-w-[100px] max-w-[150px] sm:min-w-[150px] sm:max-w-[200px] md:min-w-[200px] md:max-w-[250px] lg:min-w-[250px] lg:max-w-[250px]">
          <div className="hover:bg-white bg-orange-50 md:bg-gray-100 shadow-xl rounded-b-3xl p-3 text-center transition-transform transform hover:scale-105">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-2xl text-green-500 mb-1 sm:mb-2 md:mb-3 lg:mb-4" />
            <h1 className="text-sm sm:text-sm md:text-lg lg:text-lg font-semibold">Local Events</h1>
            <p className="text-gray-600 text-sm sm:text-sm md:text-lg lg:text-lg">Stay updated on local events and activities happening around you.</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="md:bg-slate-50  p-2 sm:p-3 md:p-6 text-center flex-1  min-w-[100px] max-w-[150px] sm:min-w-[150px] sm:max-w-[200px] md:min-w-[200px] md:max-w-[250px] lg:min-w-[250px] lg:max-w-[250px]">
          <div className="hover:bg-white bg-orange-50 md:bg-gray-100 shadow-xl rounded-b-3xl p-3 text-center transition-transform transform hover:scale-105">
            <FontAwesomeIcon icon={faCog} className="text-2xl text-purple-500 mb-1 sm:mb-2 md:mb-3 lg:mb-4" />
            <h1 className="text-sm sm:text-sm md:text-lg lg:text-lg font-semibold">Customization</h1>
            <p className="text-gray-600 text-sm sm:text-sm md:text-lg lg:text-lg">Get personalized services tailored to your specific requirements.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

