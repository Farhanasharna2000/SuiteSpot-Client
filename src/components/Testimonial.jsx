import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import "swiper/css";
import "swiper/css/navigation";
import UseAxiosSecure from "../Hook/UseAxiosSecure";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/top-reviews`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching reviews");
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <motion.section
      className="bg-green-50 py-10 mb-12 container mx-auto rounded-xl"
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
        <div
          className="text-center mx-auto px-5 sm:px-8 md:px-[80px] lg:px-[150px] xl:px-[280px] 2xl:px-[350px] "
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="flex items-center justify-center">
            <h5 className="px-5 text-base leading-[26px] lg:leading-[42px] text-[#0b6f54]  font-bold">
              TESTIMONIALS
            </h5>
          </div>
          <h1 className="text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[46px] text-lightBlack dark:text-white mt-1 mb-[15px] font-bold">
            What Our Clients Say
          </h1>
        </div>

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
              <div className="h-64 flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 space-y-4 md:space-y-0 md:space-x-6 max-w-4xl mx-auto">
                <div className="flex-shrink-0">
                  <img
                  referrerPolicy="no-referrer"
                    src={review.photo }
                    alt={review.name }
                    className="w-32 h-32 rounded-full "
                  />
                </div>
                <div>
                  <h2 className="text-2xl text-[#33ad8c] font-extrabold ">
                    {review.userName}
                  </h2>
                 
                  <p className="mt-2 text-gray-600 text-base">{review.comment}</p>
                  <div className="flex items-center mt-4 space-x-1">
                    {Array(review.rating)
                      .fill()
                      .map((_, index) => (
                        <span key={index} className="text-yellow-500 text-2xl">
                          &#9733;
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.section>
  );
};

export default Testimonial;
