import Image from 'next/image';

export default function Destinations(){
    return(
        <div className=" py-16 sm:py-10 md:py-7 lg:py-20 bg-yellow-50">
            <div className="text-center">
            <h1 className="text-lg font-semibold ">
                Top Selling
            </h1>
            <h2 className="text-4xl font-bold">Top Destinations</h2>
        </div>

             {/* Cards */}
        <div>

        <div className="relative w-[500px] h-[550px] ">
            <Image
              src="/images/destination-4.jpg"
              alt="tour image"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        </div>
        </div>
    );
}