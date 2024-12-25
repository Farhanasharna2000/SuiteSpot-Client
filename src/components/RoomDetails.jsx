
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Hook/UseAuth';
import { Helmet } from 'react-helmet';
import UseAxiosSecure from '../Hook/UseAxiosSecure';

const RoomDetails = () => {

    const { id } = useParams();
    const axiosSecure = UseAxiosSecure()
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [room, setRoom] = useState({});
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        fetchRoomData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchRoomData = async () => {
        try {
            const { data } = await axiosSecure.get(`/rooms/${id}`);
            setRoom(data);
            fetchReviewData(data.roomNo);
        } catch (error) {
            console.error('Error fetching room data', error);
        }
    };

    const fetchReviewData = async (roomNo) => {
        try {
            const { data } = await axiosSecure.get(`/reviewDatas/${roomNo}`);
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
            // eslint-disable-next-line no-unused-vars
            const { data } = await axiosSecure.post(`/add-booking`, bookingData);
            form.reset();
            toast.success('Booking successfully submitted!');
            navigate('/my-bookings');
        } catch (error) {

            console.error("Error submitting booking:", error);
            toast.error("Failed to submit booking. Please try again.");

        }
    };


    return (
        <div className="bg-gray-100 pt-20">
            <Helmet>
                <title>Room Details | SuiteSpot</title>
            </Helmet>
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img src={image} alt="Room" className="w-full h-full rounded-md" />
                    </div>
                    <div className="md:w-1/2 md:pl-8  space-y-1">
                        <h1 className="text-3xl font-extrabold text-[#0b6f54]">{title}</h1>
                        <p className="text-base text-gray-600">{description}</p>
                        <p><span className=" font-extrabold text-gray-800 ">Room No : </span><span className='text-green-800 font-bold'>{roomNo} </span></p>
                        <p><span className=" font-extrabold text-gray-800 ">Capacity : </span>{capacity} person</p>
                        <p><span className=" font-extrabold text-gray-800 ">BedSize : </span>{bedSize}</p>
                        <p ><span className=" font-extrabold text-gray-800 ">Price : </span><span className='text-green-800 font-bold'>${price}/day</span></p>
                        <p className=" font-extrabold text-gray-800 ">Facilities :</p>
                        <p>
                            {roomFacilities && (
                                <ul className="text-gray-600 text-sm ">
                                    {roomFacilities.map((facility, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="mr-2 text-green-500">✔</span> {facility}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </p>
                        <p className='pb-4'><span className=" font-extrabold text-gray-800 ">Review Count : </span><span className='text-green-800 font-bold'>{reviewCount} </span></p>



                        <button onClick={openModal} className='w-full px-5 py-3  text-sm font-bold text-white capitalize transition-colors duration-300 transform bg-[#0b6f54] rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'>Book Now</button>

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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-20">
                    <div className="bg-white p-8 rounded-lg shadow-lg space-y-2 md:w-6/12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
                        <p>{description}</p>
                      <div className="flex gap-6">
                      <p><span className="font-extrabold">Room No : </span><span className="font-extrabold text-green-700 text-sm"> {roomNo}</span></p>
                      <p ><span className="font-extrabold">Price : </span><span className="font-extrabold text-green-700 text-sm">${price}</span></p>
                      </div>
                        <div className='flex gap-5 '>
                            <div>
                                <p className=" text-gray-800 mb-2"><span className="font-extrabold">Check-In Date :</span></p>

                                <DatePicker
                                    className="border p-2 rounded-md"
                                    selected={bookingDate}
                                    onChange={(date) => setBookingDate(date)}
                                    minDate={new Date()}
                                    selectsStart
                                    startDate={bookingDate}
                                    endDate={checkOutDate}
                                />

                            </div>
                            <div>
                                <p className=" text-gray-800 mb-2"><span className="font-extrabold">Check-Out Date : </span></p>

                                <DatePicker
                                    className="border p-2 rounded-md"
                                    selected={checkOutDate}
                                    onChange={(date) => setCheckOutDate(date)}
                                    minDate={bookingDate || new Date()}
                                    selectsEnd
                                    startDate={bookingDate}
                                    endDate={checkOutDate}
                                />
                            </div>

                        </div>
                        <form onSubmit={handleBookingSubmit}>
                           <div className="flex gap-3">
                           <button type="submit"  className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white">
                                Confirm Booking
                            </button>
                       

                        <button onClick={closeModal} className="btn bg-red-500 hover:text-red-500 text-white">
                            Cancel
                        </button>
                           </div>
                           </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;
