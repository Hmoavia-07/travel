import { FaPlaneDeparture } from "react-icons/fa";
import { FaLandmarkDome, FaMoneyBillTransfer } from "react-icons/fa6";



export default function Bookings() {
    return (
        <div className="px-4 sm:px-12 md:px-20 lg:px-48 py-4 sm:py-9 md:py-14 lg:py-20 bg-yellow-50 md:bg-white">
            <div className="text-left mb-8 ">
                <h1 className="md:text-xl text:sm font-semibold text-gray-800">Easy and Fast</h1>
                <h2 className="lg:text-4xl text-2xl sm:text-3xl font-bold text-gray-600">Book Your Next Trip in 3 Easy Steps</h2>
            </div>

           


                <div className="flex ">
                <div  className="">
                
                {/* Step 1 */}
                <div className=" text-left mt-2 flex justify-start md:space-x-4 space-x-2 sm:space-x-3 ">

                     {/* Icon with Background */}
             <div className="bg-yellow-500 md:w-16 md:h-16 w-12 h-10 flex justify-center items-center rounded-md">
               <FaLandmarkDome size={30} className="text-white" />
                 </div>
                    
                    <h1 className="md:text-xl text-sm font-semibold text-blue-950">Choose Destination
                    <p className="text-gray-600  mt-1 font-normal ">
                        Select from our wide range of exciting travel destinations.
                    </p></h1>
                </div>

                {/* Step 2 */}
                <div className="text-left sm:mt-8 mt-4 flex justify-start md:space-x-4 space-x-2 sm:space-x-3">
                    
              {/* Icon with Background */}
             <div className="bg-red-500 md:w-16 md:h-16 w-12 h-10 flex justify-center items-center rounded-md">
               <FaMoneyBillTransfer size={35} className="text-white" />
                 </div>
                    
                    <h1 className="md:text-xl text-sm font-semibold text-blue-950">Make Payment
                    <p className="text-gray-600  mt-1 font-normal">
                        Secure your booking with our quick and easy payment options.
                    </p></h1>
                </div>

                {/* Step 3 */}
                <div className=" text-left sm:mt-8 mt-4 flex justify-start md:space-x-4 space-x-2 sm:space-x-3 ">

              {/* Icon with Background */}
             <div className="bg-cyan-700 md:w-16 md:h-16 w-12 h-10 flex justify-center items-center rounded-md">
               <FaPlaneDeparture size={35} className="text-white" />
                 </div>
    
             {/* Text */}
             <h1 className="md:text-xl text-sm  font-semibold text-blue-950 ">Reach Airport On Selected Date
              <p className="text-gray-600 mt-1 font-normal">
                      Get ready for your journey and arrive at the airport on time.

             </p></h1>
             </div>
             
                <div className=" ">
             <div className="md:w-96 sm:w-80 w-60 shadow-2xl rounded-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
                <img className="md:w-96 sm:w-80 w-60" src="/images/Rectangle 17.jpg" alt="Latest" />
                <div><h1 className="font-semibold">Trip To Greece</h1>
                <h2>14-27 june| by Robbin Flake
                </h2></div>
             </div>
             
             </div>

                </div>
               

                </div>
            </div>
       
    );
}
