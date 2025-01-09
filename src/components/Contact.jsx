
import { MdEmail } from 'react-icons/md';
import img1 from '../assets/images/breadcumb.jpg'
import { FaLocationDot } from 'react-icons/fa6';
import { PiPhoneCallFill } from 'react-icons/pi';
const Contact = () => {
    return (
        <div>
                    <section style={{ backgroundImage: `url(${img1})` }} className=" bg-no-repeat bg-cover h-52  md:h-[550px] bg-center grid items-center justify-center">
                <div className="mt-10 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-10 lg:leading-[60px] 2xl:leading-[70px] text-white font-semibold  uppercase">Contact Us</h1>
                    <div className="flex items-center justify-center">
                        <a className="text-base lg:text-2xl leading-10 2xl:leading-[70px] text-white font-semibold  flex items-center" href="/">Home <span className="mx-2 text-white">/</span></a>
                        <a className="text-base lg:text-2xl leading-10 2xl:leading-[70px] text-white font-semibold  capitalize" href="#">Contact Us</a>
                    </div>
                </div>
            </section>
            <div className="py-16 container mx-auto px-6">
    <div className=" bg-green-50 rounded-lg p-7 md:p-10 shadow-lg ">
        <div className="flex items-center flex-col md:flex-row ">
            <div className=" flex-1 aos-init aos-animate" data-aos="zoom-in-up" data-aos-duration="1000">
                
                <h2 className="text-xl md:text-4xl text-uppercase text-[#0b6f54] dark:text-white font-extrabold my-3 md:my-5">CONTACT WITH US</h2>
                <p className=" text-sm sm:text-base leading-[26px] text-black/70  dark: font-normal">Rapidiously myocardinate cross-platform intellectual capital after the model. Appropriately create interactive infrastructures after maintance Holisticly facilitate stand-alone</p>
                <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-[#0b6f54] text-2xl text-white dark: grid items-center justify-center rounded-full transition-all duration-300"><PiPhoneCallFill /></div>
                    <div
                        className="ml-3 md:ml-4">
                        <p className=" text-sm leading-[26px] text-black/70  dark: font-normal">Call Us Now</p>
                        <p className=" text-lg  leading-[26px] text-black/70  dark:text-white font-bold">(+088) 210 - 123 - 4567</p>
                </div>
            </div>
            <hr className="   h-[1px]"/>
            <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-[#0b6f54]  text-white text-2xl  dark: grid items-center justify-center rounded-full transition-all duration-300">
               <MdEmail />
                    </div>
                <div
                    className="ml-3 md:ml-4">
                    <p className=" text-sm leading-[26px] text-black/70  dark: font-normal">Send Email</p>
                    <p className=" text-lg   leading-[26px] text-black/70  dark:text-white font-bold ">info@suitespot.com</p>
            </div>
        </div>
        <hr className="  h-[1px]"/>
        <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-[#0b6f54]  text-white text-2xl  dark: grid items-center justify-center rounded-full transition-all duration-300"><FaLocationDot /></div>
            <div
                className="ml-3 md:ml-4">
                <p className=" text-sm leading-[26px] text-black/70  dark: font-normal">Our Locations</p>
                <p className=" text-base  leading-[26px] text-black/70  dark:text-white font-bold ">47 W 13th St, New York, <br /> NY 10011, USA</p>
        </div>
    </div>
</div>
<div className="flex-1  aos-init aos-animate" data-aos="zoom-in-up" data-aos-duration="1000">
    <div className="bg-[#0b6f54]  p-[30px] lg:p-[45px] 2xl:p-[61px] rounded-lg">
        <h2 className=" text-[22px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center">GET IN TOUCH</h2>
        <div className="grid items-center grid-cols-1 gap-2 mt-8">
            <input type="text" className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray rounded-lg dark: outline-none  bg-transparent mt-4 focus:ring-0   focus:outline-none"
                placeholder="Your Name" required=""/>
                <input type="email" className="w-full h-12 md:h-13 rounded-lg lg:h-[59px] px-4 border  border-gray  dark: outline-none  bg-transparent mt-4 focus:ring-0   focus:outline-none"
                placeholder="Enter E-mail" required=""/>
                <select className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray  dark: outline-none rounded-lg bg-transparent mt-4 focus:ring-0 text-white focus:outline-none"><option className="bg-black text-white px-3 py-3" value="" disabled="">Select Subject</option>
                <option className=" bg-black  dark:text-white px-3 py-3" value="option1">Subject One</option>
                <option className="  bg-black dark:text-white px-3 py-3" value="option2">Subject Two</option>
                <option className=" bg-black  dark:text-white px-3 py-3" value="option3">Select Three</option>
                <option className=" bg-black  dark:text-white px-3 py-3" value="option4">Select Four</option></select>
            <textarea
                name="" id="" cols="30" rows="10" className="w-full h-[121px] px-4 border border-gray rounded-lg dark: outline-none  bg-transparent mt-4 pt-4 focus:ring-0    focus:outline-none"
                placeholder="Write Message:"></textarea><button className="btn font-extrabold mt-6 text-[#0b6f54]  bg-white  hover:scale-105 transition-transform">SEND MESSAGE</button></div>
    </div>
</div>
</div>
</div>
</div>
        </div>
    );
};

export default Contact;