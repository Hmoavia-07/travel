import Homepage from "./pages/hero";
import Category from "./pages/category";
import Destinations from "./pages/destination/page";
import Bookings from "./pages/Bookings";
import Feedback from "./components/feedback";

export default function Home() {
  return (
    <div >
      {/* Homepage Section */}
      <Homepage />
      
      {/* Category Section */}
      <div> 
        <Category />
      </div>

      {/* Destinations Section */}
      <div > 
        <Destinations />
      </div>

      <div>
        <Bookings />
      </div>
      <div>
       <Feedback />
      </div>
    </div>
  );
}
