import { FaLongArrowAltRight } from "react-icons/fa";
import client1 from '../assets/images/client1.jpg'
import client2 from '../assets/images/client2.jpg'
import client3 from '../assets/images/client3.jpg'
import client4 from '../assets/images/client4.jpg'
import food from '../assets/images/food.png'
import service from '../assets/images/service.png'
import security from '../assets/images/security.png'
import hour from '../assets/images/hour.png'
import bg1 from '../assets/images/bg1.png'
import place1 from '../assets/images/place1.png'
import place2 from '../assets/images/place2.png'



const Choose = () => {
    return (
        <div className="md:py-16 py-10 relative  px-6 overflow-x-hidden container mx-auto">
        <div className="container">
            <div className="grid grid-cols-12 gap-5 sm:gap-10">
                <div className="col-span-12 lg:col-span-6 xxl:col-span-5 relative">
                    <div className="min-h-[600px] max-lg:mx-3 gap-3">
                        <img className="absolute rounded-2xl top-0 left-0" src={place1} alt="why choose us" />
                        <img className="absolute rounded-2xl bottom-0 right-0 border-[5px] border-white" src={place2} alt="why choose us" />
                        <img width="{830}" height="{719}" src={bg1}alt="image" className="absolute top-8 xl:top-40 right-10 xxl:scale-125" />
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6 xxl:col-start-7 ">
                    <div className="max-w-[570px]">
                        <span className="text-3xl text-[#0b6f54]  font-bold p-1  inline-flex items-center">
                        <FaLongArrowAltRight /><span className="text-[#0b6f54] text-base sm:text-lg lg:text-3xl font-bold sm:font-semibold px-2 sm:px-3 md:px-4">Why Choose Us </span>
                        </span>
                        <h2 className="h2 mt-3 leading-tight">Why Choose Us for Your Next Hotel Booking</h2>
                        <p className=" pt-5 pb-8 lg:pb-14">At our hotel booking website, we pride ourselves on providing a top-notch booking experience that is both easy and enjoyable.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2 md:col-span-1">
                            <div className="grid place-content-center w-20 h-20 rounded-full bg-[var(--primary-light)] mb-6">
                                <img
                                    width="{48}"
                                    height="{48}"
                                    src={food}
                                    alt="image"
                                    className="w-12 h-12 object-fit-contain"
                                />
                            </div>
                            <h4 className="mb-3 md:text-2xl font-semibold">Quality Food</h4>
                            <p className="mb-0">Exquisite dining experiences crafted for ultimate satisfaction.</p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <div className="grid place-content-center w-20 h-20 rounded-full bg-[#EBFAF1] mb-6">
                                <img
                                    width="{48}"
                                    height="{48}"
                                    src={service}
                                    alt="image"
                                    className="w-12 h-12 object-fit-contain"
                                />
                            </div>
                            <h4 className="mb-3 md:text-2xl font-semibold">Quick Services</h4>
                            <p className="mb-0">Prompt responses to your needs, anytime, anywhere.</p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <div className="grid place-content-center w-20 h-20 rounded-full bg-[#FFF6E4] mb-6">
                                <img
                                    width="{48}"
                                    height="{48}"
                                    src={security}
                                    alt="image"
                                    className="w-12 h-12 object-fit-contain"
                                />
                            </div>
                            <h4 className="mb-3 md:text-2xl font-semibold">High Security</h4>
                            <p className="mb-0"> Advanced measures to safeguard your stay and peace of mind.</p>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <div className="grid place-content-center w-20 h-20 rounded-full bg-[var(--primary-light)] mb-6">
                                <img
                                    width="{48}"
                                    height="{48}"
                                    src={hour}
                                    alt="image"
                                    className="w-12 h-12 object-fit-contain"
                                />
                            </div>
                            <h4 className="mb-3 md:text-2xl font-semibold">24 Hours Alert</h4>
                            <p className="mb-0">Always vigilant, ensuring your safety around the clock.</p>
                        </div>
                    </div>
                    <div className="border-b border-dashed my-10"></div>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <a href="/rooms" className="btn bg-[#0b6f54] text-white hover:text-black font-bold"> Discover More </a>
                        <div className="flex items-center gap-4 flex-wrap">
                            <ul className="flex user-group">
                                <li>
                                    <div className="w-13 h-13 border rounded-full overflow-hidden -mr-4">
                                        <img
                                            width="{50}"
                                            height="{50}"
                                            src={client4}
                                            alt="image"
                                            className="w-full h-full object-fit-cover"
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="w-13 h-13 border rounded-full overflow-hidden -mr-4">
                                        <img
                                            width="{50}"
                                            height="{50}"
                                            src={client3}
                                            alt="image"
                                            className="w-full h-full object-fit-cover"
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="w-13 h-13 border rounded-full overflow-hidden -mr-4">
                                        <img
                                            width="{50}"
                                            height="{50}"
                                            src={client2}
                                            alt="image"
                                            className="w-full h-full object-fit-cover"
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="w-13 h-13 border rounded-full overflow-hidden relative">
                                        <img
                                            width="{50}"
                                            height="{50}"
                                            src={client1}
                                            alt="image"
                                            className="w-full h-full object-fit-cover"
                                        />
                                      
                                    </div>
                                </li>
                            </ul>
                            <p className="mb-0 text-lg"><span className="text-[#0b6f54] font-extrabold">800k+</span> Happy Customer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Choose;