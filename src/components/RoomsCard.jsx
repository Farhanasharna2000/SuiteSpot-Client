import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const RoomsCard = ({ room }) => {
 
  
    const { _id, title, image, price, capacity,roomNo, reviewCount, bookings } = room || {};
  
    // Get today's date in the format YYYY-MM-DD
    const today = moment().startOf('day'); 
  
    const checkAvailability = () => {
      if (bookings && bookings.length > 0) {
        return bookings.some((booking) => {
          const checkIn = moment(booking.checkInDate);
          const checkOut = moment(booking.checkOutDate);
       
          return today.isBetween(checkIn, checkOut, 'day', '[]'); 
        });
      }
      return false;
    };
  
    return (
      <Link to={`/room-details/${_id}`} className="overflow-x-hidden group aos-init aos-animate block" data-aos="fade-up" data-aos-duration="1000">
        <div className="relative border border-[#e8e8e8] dark:border-[#424242] rounded-md">
          {/* Image */}
          <div className="overflow-hidden w-full h-[250px]">
            <img
              src={image}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              alt={title}
            />
          </div>
  
          {/* Price */}
          <div className="px-5 py-2 bg-khaki text-xl text-blue-800 font-bold absolute top-[10px] right-[10px] rounded">
            <span>${price}</span>
            <span className="mx-2">|</span>
            <span>Night</span>
          </div>
        </div>
  
        {/* Card details */}
        <div>
          <div className="border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
            <div className="py-6 px-[30px]">
              <h2 className="text-xl leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                {title}
              </h2>
              <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">{capacity}/Person</p>
              <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">Review Count : {reviewCount}</p>
              <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">Room no : {roomNo}</p>
              <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">
                Status: {checkAvailability() ? 'Unavailable' : 'Available'}
              </p>
  
                       
            </div>
          </div>
        </div>
      </Link>
    );
  };
  
  RoomsCard.propTypes = {

    room: PropTypes.object,
  }
export default RoomsCard;
