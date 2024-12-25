import moment from "moment";
import { Link } from "react-router-dom";


const RoomsTable = ({ room }) => {

    const { _id, title, image, price, capacity, reviewCount, bookings } = room || {};
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
        
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={image} alt="" />
                    </div>
                  </div>
                 
                   <div>
                   <div className="font-extrabold text-lg">{title}</div>
                    <div className="font-extrabold text-[#0b6f54]">$ {price}</div>

                   </div>
                </div>
              </td>
            

              <td>{capacity} person</td>

              <td>
                <p className={checkAvailability() ? "text-green-500" : "text-red-500"}>
                  {checkAvailability() ? "Available" : "Unavailable"}
                </p>
              </td>
              <td>{reviewCount}</td>

              <td>
                <Link to={`/room-details/${_id}`}>
                  <button className="btn bg-[#0b6f54] text-white hover:text-[#0b6f54]">
                    Details
                  </button>
                </Link>
              </td>
            </tr>
        
      
    );
};

export default RoomsTable;