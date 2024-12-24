import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import useAuth from '../Hook/UseAuth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';

import StarRatingComponent from 'react-star-rating-component';
import { Helmet } from 'react-helmet';

const MyBookings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  
  const [bookings, setBookings] = useState([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  //state for update
  const [newCheckInDate, setNewCheckInDate] = useState(null);
const [newCheckOutDate, setNewCheckOutDate] = useState(null);

  // State for Review Modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);  //rating
  const [comment, setComment] = useState("");

 //rating
 const onStarClick = (nextValue) => {
  setRating(nextValue);
};

  useEffect(() => {
    if (user) {
      fetchAllBookings();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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


      if (response.status === 200) {
        toast.success(response.data.message);
        fetchAllBookings();
      } else {
        toast.error('Cancellation is not allowed within 1 day of the check-in date.');
      }
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response);
        toast.error(err.response.data.message);
      } else {
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
      handleDelete(bookingToCancel._id);
      setShowConfirmModal(false);
      setBookingToCancel(null);
    }
  };

  const cancelBooking = () => {
    setShowConfirmModal(false);
    setBookingToCancel(null);
  };

  //update date
  const handleUpdateDates = (booking) => {
    setSelectedBooking(booking);
    console.log(booking);
    
    setNewCheckInDate(new Date(booking.checkInDate)); 
    setNewCheckOutDate(new Date(booking.checkOutDate));
    setShowDateModal(true);
  };
  
  const handleUpdate = async () => {
    const updateData = {
      id: selectedBooking?._id,
      checkInDate: newCheckInDate,
      roomNo: selectedBooking?.roomNo,
      checkOutDate: newCheckOutDate,
    };
  
    try {
      console.log('Sending update request:', updateData);
      const response = await axiosSecure.put('/update-date', updateData);
      console.log('Response received:', response);
    
      if (response.status === 200) {
        toast.success('Dates updated successfully!');
        setShowDateModal(false);
        fetchAllBookings();
      }else if (response.status === 201) {
        toast.error(response.data.message);
    } 
    } catch (error) {
      console.error('Error in handleUpdate:', error);
      
    }
  }    
    
  
  
  const handleReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
 
    const reviewData = {
      userEmail: user?.email, 
      userName: user?.displayName,
      photo: user?.photoURL, 
     roomNo: selectedBooking?.roomNo, 
      roomName:selectedBooking?.title,
      rating,
      comment,
      currentTime:moment().format('MMMM Do YYYY, h:mm:ss a'),

    };
  
    try {
      
      const response = await axiosSecure.post('/reviews', reviewData);
      
      console.log(response);
    
      if (response.status === 200) {
        toast.success('Review submitted successfully!');
        setShowReviewModal(false); 
        setRating(''); 
        setComment('');
        fetchAllBookings();
      } else if (response.status === 201) {
        toast.error(response.data.message);
    } 
      
    } catch (error) {
      toast.error('Error:', error);
      console.error('Error:', error);
    }
  };
  
 
  return (
    <div className="container mx-auto p-6">
       <Helmet>
                <title>My Bookings | SuiteSpot</title>
            </Helmet>
      <h2 className="text-2xl font-bold mb-4">My Bookings : {bookings.length}</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Room No</th>
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
                  onClick={() => {  handleUpdateDates(booking)}}
                >
                  Update Date
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancelBooking(booking)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleReview(booking)}
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Update Date Modal */ }
      {showDateModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Update Booking Dates</h3>

      {/* Check-In Date Picker */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Check-In Date</label>
        <DatePicker
          selected={newCheckInDate}
          onChange={(date) => setNewCheckInDate(date)}
          
          minDate={new Date()} 
          selectsStart
          startDate={newCheckInDate}
          endDate={newCheckOutDate}
          className="input input-bordered w-full"
        />
      </div>
   


      {/* Check-Out Date Picker */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Check-Out Date</label>
        <DatePicker
          selected={newCheckOutDate}
          onChange={(date) => setNewCheckOutDate(date)}
      
          className="input input-bordered w-full"
          minDate={newCheckInDate || new Date()} 
          selectsEnd
          startDate={newCheckInDate}
          endDate={newCheckOutDate}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button className="btn btn-secondary" onClick={() => setShowDateModal(false)}>Cancel</button>
        <button className="btn btn-primary"onClick={handleUpdate} >Update</button>
      </div>
    </div>
  </div>
)}
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

      {/* Review Modal */}
      {showReviewModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Username</label>
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full"
        />
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <label htmlFor="rating" className="block text-lg font-semibold">Rating</label>
        <StarRatingComponent
          name="rating"
          value={rating}
          starCount={5}
          onStarClick={onStarClick}
          starColor="#FFD700"
          emptyStarColor="#E4E4E7"
          className="flex justify-center space-x-1"
        />
        <div>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="w-full text-center py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block font-semibold mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea textarea-bordered w-full"
          rows="4"
          required
        />
      </div>
      <div className="mb-4">
          <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">Timestamp</label>
          <input
            type="text"
            id="timestamp"
            value={moment().format('MMMM Do YYYY, h:mm:ss a')}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      
      <div className="flex justify-end space-x-4">
        <button className="btn btn-secondary" onClick={() => setShowReviewModal(false)}>Cancel</button>
        <button
          className="btn btn-primary"
          onClick={handleSubmitReview}
          disabled={!rating || !comment.trim()}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

      </div >
    );
};

export default MyBookings;
