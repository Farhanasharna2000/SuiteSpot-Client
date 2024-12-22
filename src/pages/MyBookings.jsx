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
    const [showDateModal, setShowDateModal] = useState(false); // Modal for updating date
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newDate, setNewDate] = useState(null);

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
            const response = await axiosSecure.delete(`/booking/${id}`);
            
            // Log the response for debugging
            console.log('Response:', response);
    
            if (response.status === 200) {
                toast.success(response.data.message);
                fetchAllBookings(); // Refresh bookings
            }else{
                toast.error('Cancellation is not allowed within 1 day of the check-in date.');
            }
        } catch (err) {
            // Handle errors from the server
            if (err.response) {
                console.error('Error response:', err.response);
                toast.error(err.response.data.message); // Show the error message from the server
            } else {
                // Handle network or unexpected errors
                toast.error('An error occurred while canceling the booking.');
            }
        }
    };
    
    

    const handleCancelBooking = (booking) => {
        setBookingToCancel(booking);
        setShowConfirmModal(true);
    };

    const confirmCancel = () => {
        if (bookingToCancel) {
            handleDelete(bookingToCancel._id,bookingToCancel.roomNo);
            setShowConfirmModal(false);
            setBookingToCancel(null);
        }
    };

    const cancelBooking = () => {
        setShowConfirmModal(false);
        setBookingToCancel(null);
    };

    const handleDateUpdate = async () => {
        if (selectedBooking && newDate) {
            try {
                await axiosSecure.put(`/booking/${selectedBooking._id}`, { checkInDate: newDate });
                toast.success('Booking date updated successfully!');
                fetchAllBookings();
                setShowDateModal(false);
            } catch (error) {
                toast.error('Error updating booking date');
            }
        }
    };

    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Bookings : {bookings.length}</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Room No </th>
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
                <td>{booking.roomNo}</td>
                <td>{booking.title}</td>
                <td>${booking.price}</td>
                <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button 
                    className="btn btn-primary"
                    onClick={() => { setSelectedBooking(booking); setNewDate(new Date(booking.checkInDate)); setShowDateModal(true); }}
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

        {/* Update Date Modal */}
        {showDateModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Select New Check-In Date</h3>
              <DatePicker 
                selected={newDate} 
                onChange={(date) => setNewDate(date)} 
                dateFormat="MM/dd/yyyy"
                className="input input-bordered w-full"
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button className="btn btn-secondary" onClick={() => setShowDateModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleDateUpdate}>Update</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default MyBookings;
