import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import useAuth from '../Hook/UseAuth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';

import StarRatingComponent from 'react-star-rating-component';
import { Helmet } from 'react-helmet';

import { MdOutlineErrorOutline } from 'react-icons/md';

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
    <div className="container mx-auto md:pt-28 pt-3">
       <Helmet>
                <title>My Bookings | SuiteSpot</title>
            </Helmet>
      <h2 className="text-2xl font-bold text-[#0b6f54] mb-4">My Bookings : {bookings.length}</h2>
      <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
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
                <img src={booking.image} alt={booking.title} className="w-20 h-20 " />
              </td>
              <td>{booking.roomNo}</td>
              <td>{booking.title}</td>
              <td>${booking.price}</td>
              <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
              <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
              <td className="space-x-2">
                <button
                  className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white"
                  onClick={() => {  handleUpdateDates(booking)}}
                >
                  Update Date
                </button>
                <button
                  className="btn bg-red-500 hover:text-red-500 text-white"
                  onClick={() => handleCancelBooking(booking)}
                >
                  Cancel
                </button>
                <button
                  className="btn bg-[#00167abb] text-white hover:text-[#00167abb]"
                  onClick={() => handleReview(booking)}
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Update Date Modal */ }
      {showDateModal && (
  <div className="fixed inset-0 flex items-center justify-center  bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-extrabold mb-4 text-[#0b6f54]">Update Booking Dates</h3>

      {/* Check-In Date Picker */}
      <div className="mb-4">
        <label className="block font-extrabold mb-2">Check-In Date</label>
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
        <label className="block font-extrabold mb-2  ">Check-Out Date</label>
        <DatePicker
          selected={newCheckOutDate}
          onChange={(date) => setNewCheckOutDate(date)}
      
          className="input input-bordered w-full "
          minDate={newCheckInDate || new Date()} 
          selectsEnd
          startDate={newCheckInDate}
          endDate={newCheckOutDate}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button className="btn bg-red-500 hover:text-red-500 text-white" onClick={() => setShowDateModal(false)}>Cancel</button>
        <button  className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white" onClick={handleUpdate} >Update</button>
      </div>
    </div>
  </div>
)}
    
      {/* Confirmation Modal */}
{showConfirmModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full relative">
      <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={cancelBooking}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-red-600 p-4  text-8xl ">
          <p><MdOutlineErrorOutline /></p>
        </div>
     
        <p className="text-xl text-gray-600 mb-6 text-center">
        Are you sure you want to cancel this booking?
        </p>
      </div>
      <div className="flex justify-between">
        <button
          className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white"
          onClick={cancelBooking}
        >
          No, Keep it
        </button>
        <button
          className="btn bg-red-500 hover:text-red-500 text-white "
          onClick={confirmCancel}
        >
          Yes, Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* Review modal */}
      {showReviewModal && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
    aria-labelledby="review-modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 id="review-modal-title" className="text-3xl text-[#0b6f54] font-extrabold mb-4">
      Share Your Feedback
      </h3>

      {/* Username Field */}
      <div className="mb-4">
        <label  className="block font-extrabold mb-2">
          Username
        </label>
        <input
          type="text"
          value={user?.displayName }
          readOnly
          className="input input-bordered w-full text-green-600"
        />
      </div>

      {/* Rating Section */}
      <div className="mb-4">
        <label htmlFor="rating" className="block  font-extrabold">
          Rating
        </label>
        <div className="flex gap-2 ">
        <div className="flex justify-center  text-3xl mb-2">
          <StarRatingComponent
            name="rating"
            value={rating}
            starCount={5}
            onStarClick={onStarClick}
            starColor="#FFD700"
            emptyStarColor="#E4E4E7"
          />
        </div>
        <input
          type="number"
          id="rating-input"
          name="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
          className="pl-2 border text-green-600 border-gray-300 rounded-md text-center"
        />
        </div>
      </div>

      {/* Comment Section */}
      <div className="mb-4">
        <label htmlFor="comment" className="block font-extrabold mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="text-green-600 textarea textarea-bordered w-full"
          rows="4"
          placeholder="Share your thoughts about this product..."
          required
        />
      </div>

      {/* Timestamp */}
      <div className="mb-4">
        <label
          htmlFor="timestamp"
          className="block font-extrabold "
        >
          Date
        </label>
        <input
          type="text"
          id="timestamp"
          value={moment().format("MMMM Do YYYY, h:mm:ss a")}
          readOnly
          className="mt-1 block text-green-600 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="btn bg-red-500 hover:bg-red-600 text-white"
          onClick={() => setShowReviewModal(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn bg-[#0b6f54] hover:bg-gray-300 text-white font-bold hover:text-[#0b6f54]"
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
