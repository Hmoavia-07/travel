// components/Footer.tsx
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-900">
      <div className="container mx-auto py-8 lg:px-44 px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 md:gap-14">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4">Jadoo.</h3>
            <p className="text-sm md:text-lg">Book your trip in minutes, get full control for much longer</p>
          </div>
          <div className="flex justify-center sm:gap-14 md:gap-20 gap-6 px-4">
          <div className="text-center">
            <h4 className="text-lg sm:text-xl sm:font-bold font-semibold mb-2 sm:mb-3 md:mb-4">Company</h4>
            <nav className="flex flex-col sm:space-y-2 space-y-1">
              <Link href="/about" className="text-sm sm:text-lg">About</Link>
              <Link href="/contact" className="text-sm sm:text-lg">Careers</Link>
              <Link href="/faq" className="text-sm sm:text-lg">Mobile</Link>
          
            </nav>
          </div>
          <div className="text-center">
            <h4 className="text-lg sm:text-xl sm:font-bold font-semibold mb-2 sm:mb-3 md:mb-4">Contact</h4>
            <nav className="flex flex-col sm:space-y-2 space-y-1">
              <Link href="/about" className="text-sm sm:text-lg">Help/FAQ</Link>
              <Link href="/contact" className="text-sm sm:text-lg">Press</Link>
              <Link href="/faq" className="text-sm sm:text-lg">Affilates</Link>
             
            </nav>
          </div >
          <div className="text-center">
            <h4 className="text-lg sm:text-xl sm:font-bold font-semibold mb-2 sm:mb-3 md:mb-4">More</h4>
            <nav className="flex flex-col sm:space-y-2 space-y-1">
              <Link href="/about" className="text-sm sm:text-lg">AirFees</Link>
              <Link href="/contact" className="text-sm sm:text-lg">Airline</Link>
              <Link href="/faq" className="text-sm sm:text-lg">faretips</Link>
             
            </nav>
          </div>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-2 sm:mb-3 md:mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-2 sm:mb-3 md:mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="">
                <FaInstagram size={24} />
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <FaEnvelope  className="mr-2 sm:mr-3 lg:mr-2" />
              <a href="mailto:contact@Jadootravel.com" className="text-sm sm:text-lg">contact@Jadootravel.com</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-4 sm:mt-6 pt-4 sm:pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Jadoo by Hmoavia_07. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
