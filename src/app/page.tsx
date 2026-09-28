import Homepage from "./components/hero";
import Category from "./components/category";
import DestinationsSection from "./components/destinations";
import Bookings from "./components/bookings";
import Feedback from "./components/feedback";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Homepage Section */}
      <Homepage />
      
      {/* Category Section */}
      <div id="services"> 
        <Category />
      </div>

      {/* Destinations Section */}
      <div id="destinations"> 
        <DestinationsSection />
      </div>

      <div id="bookings">
        <Bookings />
      </div>

      <div id="testimonials">
       <Feedback />
      </div>
    </div>
  );
}
