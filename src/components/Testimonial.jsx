import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Removed Pagination import
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import "swiper/css";
import "swiper/css/navigation";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/top-reviews`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching reviews");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <motion.section
      className="bg-gray-50 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="container mx-auto px-6"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          What Our Users Say
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]} 
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          slidesPerView={1} 
         
         
          className="testimonial-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <motion.div
                className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-32 h-32 mx-auto">
                  <img
                  referrerPolicy="no-referrer"
                    src={review.photo}
                    alt={review.userName}
                    className="rounded-full mb-4 w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-lg text-gray-900 text-center">
                  {review.userName}
                </p>
                <p className="text-gray-700 text-sm italic mt-2 text-center">
                  {review.comment}
                </p>
                <div className="mt-4 text-gray-500 text-xs text-center">
                  <p>Reviewed on: {review.currentTime}</p>
                  {review.rating && (
                    <p className="text-yellow-500 font-semibold">
                      Rating: {review.rating}/5
                    </p>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.section>
  );
};

export default Testimonial;
