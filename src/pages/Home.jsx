import Banner from "../components/Banner/Banner"
import Choose from "../components/Choose"
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
     <Choose/>
     <Testimonial/>
     <HotelLocationMap/>
    </div>
  )
}

export default Home
