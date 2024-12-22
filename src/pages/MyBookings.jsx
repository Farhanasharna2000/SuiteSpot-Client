import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import useAuth from '../Hook/UseAuth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null); 

    useEffect(() => {
      if (user) {
        fetchAllBookings();
      }
    }, [user]);

    const fetchAllBookings = async () => {
      try {
        const { data } = await axiosSecure.get(`/bookings/${user?.email}`);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      }
    };

    const handleDelete = async (id) => {
        try {
         await axiosSecure.delete(`/booking/${id}`);
          toast.success('Data deleted successfully!');
          fetchAllBookings();
        } catch (err) {
          toast.error(err.message);
        }
    };

    const handleCancelBooking = (booking) => {
        setBookingToCancel(booking);
        setShowConfirmModal(true);
    };

    const confirmCancel = () => {
        if (bookingToCancel) {
            handleDelete(bookingToCancel._id);
            setShowConfirmModal(false);
            setBookingToCancel(null);
        }
    };

    const cancelBooking = () => {
        setShowConfirmModal(false);
        setBookingToCancel(null);
    };

    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Bookings : {bookings.length}</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Room Title</th>
              <th>Price</th>
              <th>Check-In Date</th>
              <th>Check-Out Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>
                  <img src={booking.image} alt={booking.title} className="w-20 h-20 object-cover" />
                </td>
                <td>{booking.title}</td>
                <td>${booking.price}</td>
                <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button 
                    className="btn btn-primary"
                    onClick={() => { setSelectedBooking(booking); setNewDate(new Date(booking.checkInDate)); }}
                  >
                    Update Date
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleCancelBooking(booking)} // Trigger confirmation modal
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-secondary"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Are you sure you want to cancel this booking?</h3>
              <div className="flex justify-end space-x-4">
                <button className="btn btn-secondary" onClick={cancelBooking}>No</button>
                <button className="btn btn-danger" onClick={confirmCancel}>Yes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default MyBookings;
