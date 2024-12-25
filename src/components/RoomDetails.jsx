
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../Hook/UseAuth';
import { Helmet } from 'react-helmet';
import UseAxiosSecure from '../Hook/UseAxiosSecure';
import { FcLike } from 'react-icons/fc';
import { BiSolidCommentDetail } from 'react-icons/bi';

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
        roomType

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
        <div className="bg-green-50 py-20">
            <Helmet>
                <title>Room Details | SuiteSpot</title>
            </Helmet>
            <div className="py-10  w-10/12 mx-auto">
                <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
                    <div className="col-span-6 md:col-span-4">
                        <div className="overflow-hidden relative group " >
                            <img src={image} alt="" className="transition-all duration-500 delay-300 h-[400px] w-full rounded-lg" />

                        </div>
                        <div className="pt-5 lg:pt-[35px] pr-3">
                            <div className='flex items-center'>

                                <h2
                                    className="py-2 sm:py-3 md:py-4 lg:py-[19px] 2xl:py-[25px] text-[#0b6f54]  text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] 3xl:text-[40px] leading-6 lg:leading-[26px]  dark:text-white font-semibold "
                                   
                                >
                                    {title}
                                </h2>(<p className="text-base text-[#0b6f54] ">{roomType}</p>)
                            </div>
                            <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal " >
                                {description}
                            </p>
                            <div  className=" pt-7">
                                <h2 className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6  text-[22px] sm:text-2xl md:text-3xl 2xl:text-[32px] leading-7 lg:leading-[26px] text-[#0b6f54]   dark:text-white font-semibold">House Rules</h2>
                                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal ">
                                    Professionally deliver fully researched scenarios with turnkey communities.Competently unleash empowered applications without seamless data.Uniquely underwhelm quality outsourcing before
                                    relationships.Efficiently enhance diverse relationships whereas leveraged
                                </p>
                            </div>
                            <div className="md:flex items-center flex-col md:flex-row md:justify-between pt-7  " >
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" className="text-[#0b6f54]  rotate-180" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        <h4 className="text-xl md:text-2xl lg:text-[26px] leading-[26px] text-[#0b6f54]   dark:text-white font-semibold">Check In</h4>
                                    </div>
                                    <ul className="space-y-2 lg:space-y-3 mt-5 lg:mt-[30px]">
                                        <li className="flex items-center">
                                            <span className="text-green-500 text-xl mr-2">✔</span>
                                            <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal ">Check-in from 9:0 AM-anytime</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 text-xl mr-2">✔</span>
                                            <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal ">Early check-in subject to availability</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-5 md:mt-0">
                                    <div className="flex items-center space-x-2">
                                        <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" className="text-[#0b6f54] " height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        <h4 className="text-xl md:text-2xl lg:text-[26px] leading-[26px] text-[#0b6f54]   dark:text-white font-semibold">Check Out</h4>
                                    </div>
                                    <ul className="space-y-2 lg:space-y-3 mt-5 lg:mt-[30px]">
                                        <li className="flex items-center">
                                            <span className="text-green-500 text-xl mr-2">✔</span>
                                            <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal ">Check-out before noon</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-green-500 text-xl mr-2">✔</span>
                                            <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal ">Check-out from 9:0 AM-anytime</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-10 2xl:pt-[60px] " >
                                <h2 className="pb-2 sm:pb-3 text-[#0b6f54]  md:pb-4 lg:pb-[19px] 2xl:pb-6  text-[22px] sm:text-2xl md:text-3xl 2xl:text-[32px] leading-7 lg:leading-[26px]  dark:text-white font-semibold">
                                    Childreen&amp;Extra Beds
                                </h2>
                                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal mb-5 2xl:mb-[30px]">
                                    Applications without seamless data.Uniquely underwhelm quality outsourcing before #fff0 relationships.Efficiently enhance diverse relationships whereas leveraged new house cafe.
                                </p>
                                <ul className="space-y-2 lg:space-y-3">
                                    <li className="flex items-center">
                                        <span className="text-green-500 text-xl mr-2">✔</span>
                                        <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal ">Quickly generate bricks-and-clicks</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 text-xl mr-2">✔</span>
                                        <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal ">Interactively cultivate visionary platforms</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 text-xl mr-2">✔</span>
                                        <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal ">Energistically envisioneer resource</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 text-xl mr-2">✔</span>
                                        <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal ">Uniquely restore turnkey paradigms</span>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </div>
                    <div className="col-span-6 md:col-span-3 lg:col-span-2">
                        <div>
                            <div className=" px-7 py-8 md:px-8 md:py-10 lg:px-9 lg:py-11  grid-flow-row-dense">
                                <h4 className=" text-xl sm:text-[22px] md:text-2xl xl:text-3xl leading-7 md:leading-8 lg:leading-10 xl:leading-[50px] 2xl:leading-[60px] 3xl:leading-[70px]  dark:text-white font-semibold mb-4 text-[#0b6f54] ">
                                    Booking
                                </h4>
                                <div className="grid items-center gap-[18px] " >
                                    <div className="bg-white dark:bg-lightBlack h-10 lg:h-[50px] 2xl:h-[56px] grid items-center justify-start px-3 sm:px-5 2xl:px-6">
                                        <p className="text-sm md:text-[15px] leading-[26px] font-medium  dark:text-white">Room No - <span className="text-[#0b6f54] ">{roomNo}</span></p>
                                    </div>
                                    <div className="bg-white dark:bg-lightBlack h-10 lg:h-[50px] 2xl:h-[56px] grid items-center justify-start px-3 sm:px-5 2xl:px-6">
                                        <p className="text-sm md:text-[15px] leading-[26px] font-medium  dark:text-white">Capacity - <span className="text-[#0b6f54] ">{capacity} person</span></p>
                                    </div>
                                    <div className="bg-white dark:bg-lightBlack h-10 lg:h-[50px] 2xl:h-[56px] grid items-center justify-start px-3 sm:px-5 2xl:px-6">
                                        <p className="text-sm md:text-[15px] leading-[26px] font-medium  dark:text-white">BedSize - <span className="text-[#0b6f54] ">{bedSize}</span></p>
                                    </div>
                                    <div className="bg-white dark:bg-lightBlack h-10 lg:h-[50px] 2xl:h-[56px] grid items-center justify-start px-3 sm:px-5 2xl:px-6">
                                        <p className="text-sm md:text-[15px] leading-[26px] font-medium  dark:text-white">Price - <span className="text-[#0b6f54] ">${price}/day</span></p>
                                    </div>
                                    <div className="bg-white dark:bg-lightBlack h-10 lg:h-[50px] 2xl:h-[56px] grid items-center justify-start px-3 sm:px-5 2xl:px-6">
                                        <p className="text-sm md:text-[15px] leading-[26px] font-medium  dark:text-white">Review Count - <span className="text-[#0b6f54] ">{reviewCount}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-5">
                                <button onClick={openModal} className="hover:text-[#0b6f54] font-extrabold hover:bg-gray-300 bg-[#0b6f54] w-full h-10 2xl:h-[50px] text-white  px-5 hover-animBg after:rounded-none after:bg-normalBlack">Book Now</button>

                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 " >
                            <h4 className="text-xl sm:text-[22px] md:text-2xl xl:text-3xl text-[#0b6f54]   dark:text-white font-semibold my-6">
                                Amenities
                            </h4>

                            <div className="grid items-center">
                                {room.roomFacilities && (
                                    <ul className="text-gray-600 text-sm">
                                        {room.roomFacilities.map((facility, index) => (
                                            <li key={index} className="flex items-center space-x-2 py-2">
                                                <span className="text-green-500 text-xl">✔</span>
                                                <span className="text-gray-800 dark:text-lightGray">{facility}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Reviews Section */}
            <div className=" bg-white rounded-xl p-6 mt-5 w-10/12 mx-auto">
    <div className="flex items-center gap-4 justify-between flex-wrap">
        <div className="flex items-center gap-2">
         
            <h3 className=" text-[#0b6f54] text-xl font-extrabold mb-3"> *{reviewCount} reviews*</h3>
        </div>
        
    </div>
    {reviews.length > 0 ? (
  reviews.map((review, index) => {
    
    const [date, time] = review.currentTime.split(", ");

    return (
      <div key={index} className="rounded-2xl">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="flex gap-5 items-center">
            <div className="w-15 h-15 shrink-0 rounded-full overflow-hidden">
              <img
                width={60}
                height={60}
                src={review.photo}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h5 className="text-[#0b6f54] text-3xl font-extrabold mb-1">
                {review.userName}
              </h5>
            </div>
          </div>
          <div className="text-sm-end">
            {/* Display the separated date and time */}
            <p className="mb-1 text-gray-600"><span className='font-extrabold text-[#0b6f54]'>Date : </span>{date}</p>
            <p className="text-gray-500"><span className='font-extrabold text-[#0b6f54]'>Time : </span>{time}</p>
          </div>
        </div>
        <div className="border border-dashed my-6"></div>
        <div className="flex items-center mt-4 space-x-1">
          {Array(review.rating)
            .fill()
            .map((_, index) => (
              <span key={index} className="text-yellow-500 text-2xl">
                &#9733;
              </span>
            ))}
        </div>
        <p className="mb-0 clr-neutral-500">{review.comment}</p>
        <div className="border border-dashed my-6"></div>
        <div className="flex flex-wrap items-center gap-10 mb-6">
          <div className="flex items-center gap-2">
            <FcLike />
            <span className="inline-block text-[#0b6f54]">178</span>
          </div>
          <div className="flex items-center gap-2 text-[#0b6f54]">
            <BiSolidCommentDetail />
            <span className="inline-block">Reply</span>
          </div>
        </div>
      </div>
    );
  })
) : (
  <div className="border-b pb-4 mb-4">
    <p className="text-gray-500">No reviews yet. Be the first to review this room!</p>
  </div>
)}

    

   
   
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
                                <button type="submit" className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white">
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
