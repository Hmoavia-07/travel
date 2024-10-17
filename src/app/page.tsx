import Homepage from "./pages/hero";
import Category from "./pages/category";
import Destinations from "./pages/destination";

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
    </div>
  );
}
