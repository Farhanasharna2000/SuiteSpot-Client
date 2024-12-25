import Banner from "../components/Banner/Banner"
import Choose from "../components/Choose"
import FeaturedRooms from "../components/FeaturedRooms"
import HotelLocationMap from "../components/HotelLocationMap"
import NewsLetter from "../components/NewsLetter"
import Offer from "../components/Offer"
import Popup from "../components/Popup"
import Testimonial from "../components/Testimonial"

const Home = () => {
  return (
    <div>
     <Banner/>
     <Popup/>
     <FeaturedRooms/>
     <Offer/>
     <Choose/>
     <Testimonial/>
     <HotelLocationMap/>
     <NewsLetter/>
    </div>
  )
}

export default Home
