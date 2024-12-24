import offer1 from "../assets/images/banner1.jpg"
import offer2 from "../assets/images/banner2.jpg"
import offer3 from "../assets/images/banner3.jpg"

const Offer = () => {
    return (
        <div className="container mx-auto mt-14 2xl:mt-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-[30px]">
            <div className="h-[491px] w-full relative bg-gradient-to-t from-[#1d1d1dd0] to-[#1d1d1d00] group overflow-hidden aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000">
                <img src={offer1} alt="" className="absolute w-full h-full mix-blend-overlay group-hover:mix-blend-normal object-cover transition-all duration-500" />
                <img src="/images/home-3/logo.png" alt="logo" className="absolute top-10 left-10" />
                <h3 className="group-hover:hidden text-3xl xl:text-[34px] leading-5 md:leading-8 lg:leading-[42px] text-white font-Garamond font-semibold absolute left-10 bottom-[30px]">Double Room - 20%</h3>
                <div className="bg-white dark:bg-lightBlack px-[25px] py-10 absolute bottom-[-340px] lg:bottom-[-430px] 3xl:bottom-[-340px] group-hover:bottom-0 left-[18px] right-[18px] my-[18px] transition-all duration-500">
                    <h3 className="text-2xl md:text-[26px] lg:text-[30] xl:text-[34px] leading-5 md:leading-[26px] xl:leading-[42px] text-lightBlack dark:text-white font-Garamond font-semibold">Honeymoon Package</h3>
                    <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] font-Lora font-normal text-ellipsis text-gray dark:text-lightGray mt-[19px] mb-[30px]">The Honeymoon Package for a Double Room includes a cozy stay with a King-sized bed, private balcony, and special amenities like champagne, a romantic dinner, and personalized services for a memorable escape....</p>
                 
                </div>
            </div>

            <div className="h-[491px] w-full relative bg-gradient-to-t from-[#1d1d1dd0] to-[#1d1d1d00] group overflow-hidden aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000">
                <img src={offer2} alt="" className="absolute w-full h-full mix-blend-overlay group-hover:mix-blend-normal object-cover transition-all duration-500" />
                <img src="/images/home-3/logo.png" alt="logo" className="absolute top-10 left-10" />
                <h3 className="group-hover:hidden text-3xl xl:text-[34px] leading-5 md:leading-8 lg:leading-[42px] text-white font-Garamond font-semibold absolute left-10 bottom-[30px]">Couple Room - 25%</h3>
                <div className="bg-white dark:bg-lightBlack px-[25px] py-10 absolute bottom-[-340px] lg:bottom-[-430px] 3xl:bottom-[-340px] group-hover:bottom-0 left-[18px] right-[18px] my-[18px] transition-all duration-500">
                    <h3 className="text-2xl md:text-[26px] lg:text-[30] xl:text-[34px] leading-5 md:leading-[26px] xl:leading-[42px] text-lightBlack dark:text-white font-Garamond font-semibold">Honeymoon Package</h3>
                    <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] font-Lora font-normal text-ellipsis text-gray dark:text-lightGray mt-[19px] mb-[30px]">The Honeymoon Package for a Couple Room features a romantic setting with a king-sized bed, private balcony, candlelight dinner, champagne, and personalized services, ensuring an unforgettable, intimate getaway for newlyweds....</p>
                    
                </div>
            </div>

            <div className="h-[491px] w-full relative bg-gradient-to-t from-[#1d1d1dd0] to-[#1d1d1d00] group overflow-hidden aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000">
                <img src={offer3} alt="" className="absolute w-full h-full mix-blend-overlay group-hover:mix-blend-normal object-cover transition-all duration-500" />
                <img src="/images/home-3/logo.png" alt="logo" className="absolute top-10 left-10" />
                <h3 className="group-hover:hidden text-3xl xl:text-[34px] leading-5 md:leading-8 lg:leading-[42px] text-white font-Garamond font-semibold absolute left-10 bottom-[30px]">Family Room - 25%</h3>
                <div className="bg-white dark:bg-lightBlack px-[25px] py-10 absolute bottom-[-340px] lg:bottom-[-430px] 3xl:bottom-[-340px] group-hover:bottom-0 left-[18px] right-[18px] my-[18px] transition-all duration-500">
                    <h3 className="text-2xl md:text-[26px] lg:text-[30] xl:text-[34px] leading-5 md:leading-[26px] xl:leading-[42px] text-lightBlack dark:text-white font-Garamond font-semibold">Honeymoon Package</h3>
                    <p className="text-sm sm:text-base leading-[22px] lg:leading-[26px] font-Lora font-normal text-ellipsis text-gray dark:text-lightGray mt-[19px] mb-[30px]">The Honeymoon Package for a Family Room offers a spacious, cozy retreat with queen-sized beds, private balcony, complimentary champagne, romantic dinner, and family-friendly amenities for a memorable, intimate celebration....</p>
                    
                </div>
            </div>
        </div>
    );
};

export default Offer;
