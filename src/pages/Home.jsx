import Banner from "../components/Banner/Banner"
import FeaturedRooms from "../components/FeaturedRooms"
import HotelLocationMap from "../components/HotelLocationMap"
import Offer from "../components/Offer"
import Testimonial from "../components/Testimonial"

const Home = () => {
  return (
    <div>
     <Banner/>
     <FeaturedRooms/>
     <Offer/>
     <Testimonial/>
     <HotelLocationMap/>
    </div>
  )
}

export default Home
