import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Hook/UseAuth';
import { Helmet } from 'react-helmet';

const RoomDetails = () => {
    const { id } = useParams();
    
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [room, setRoom] = useState({});
    const [reviews, setReviews] = useState([]); // State for reviews

    // Fetch room data and reviews when room id changes
    useEffect(() => {
        fetchRoomData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchRoomData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${id}`);
            setRoom(data);
            fetchReviewData(data.roomNo); 
        } catch (error) {
            console.error('Error fetching room data', error);
        }
    };

    const fetchReviewData = async (roomNo) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviewDatas/${roomNo}`);
            setReviews(data); 
            console.log('Review data:', data);
        } catch (error) {
            console.error('Error fetching review data', error);
        }
    };

    const {
        image,
        title,
        description,
        roomNo,
        capacity,
        bedSize,
        price,
        roomFacilities,
        reviewCount,
    } = room || {};

    const openModal = () => {
        if (!user) {
            toast.error("You need to log in to book a room.");
            navigate("/login");
            return;
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
    
        const form = e.target;
        const email = user?.email;
    
        const bookingData = {
            email,
            image,
            title,
            description,
            roomNo,
            capacity,
            bedSize,
            price: form.price.value,
            roomFacilities,
            checkInDate: bookingDate, 
            checkOutDate: checkOutDate, 
        };
    
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-booking`, bookingData);
            form.reset();
            toast.success('Booking successfully submitted!');
            navigate('/my-bookings');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                
                toast.error(error.response.data.message);
            } else {
                console.error("Error submitting booking:", error);
                toast.error("Failed to submit booking. Please try again.");
            }
        }
    };
    

    return (
        <div className="bg-gray-100">
            <Helmet>
                <title>Room Details | SuitSpot</title>
            </Helmet>
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img src={image} alt="Room" className="w-full h-full rounded-md" />
                    </div>
                    <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                        <p className="text-lg text-gray-600 mt-2">{description}</p>
                        <p>Room No : {roomNo}</p>
                        <p>{capacity} per room</p>
                        <p>BedSize : {bedSize}</p>
                        <p className="text-xl font-semibold text-gray-800 mt-4">${price} per night</p>
                        <p>
                            {roomFacilities && (
                                <ul className="text-gray-600 text-sm mt-4">
                                    {roomFacilities.map((facility, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="mr-2 text-green-500">✔</span> {facility}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </p>
                        
                        <p className="mt-2 text-lg text-green-500">Review Count : {reviewCount}</p>
                        
                            <button onClick={openModal} className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-full">Book Now</button>
                        
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="container mx-auto p-6 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
                <div className="mt-4">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4 mb-4">
                                <p><strong>{review.userName}</strong>: {review.comment}</p>
                                <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
                                <p className="text-sm text-gray-500">date: {review.currentTime}</p>

                                
                            </div>
                        ))
                    ) : (
                        <div className="border-b pb-4 mb-4">
                            <p className="text-gray-500">No reviews yet. Be the first to review this room!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
            <p>{description}</p>
            <p>Room No : {roomNo}</p>
            <p className="text-lg text-gray-800">Price: ${price}</p>
            <p className="text-lg text-gray-800">Check-In Date: </p>

            <DatePicker
                className="border p-2 rounded-md"
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                minDate={new Date()} 
                selectsStart
                startDate={bookingDate}
                endDate={checkOutDate}
            />

            <p className="text-lg text-gray-800">Check-Out Date: </p>

            <DatePicker
                className="border p-2 rounded-md"
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                minDate={bookingDate || new Date()} 
                selectsEnd
                startDate={bookingDate}
                endDate={checkOutDate}
            />

            <form onSubmit={handleBookingSubmit}>
                <input type="hidden" name="price" value={price} />
                <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-6 rounded-full">
                    Confirm Booking
                </button>
            </form>

            <button onClick={closeModal} className="mt-4 ml-4 bg-red-500 text-white py-2 px-6 rounded-full">
                Cancel
            </button>
        </div>
    </div>
)}
        </div>
    );
};

export default RoomDetails;
