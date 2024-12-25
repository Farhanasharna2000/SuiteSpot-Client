import { FaFacebook, FaLinkedin, FaPinterest } from 'react-icons/fa';
import { useTheme } from '../Hook/UseTheme';
import logo from '../assets/images/logowhite.png'
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaLocationDot, FaSquareTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { PiPhoneCallFill } from 'react-icons/pi';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <div className={`pb-10 ${theme === 'light' ? 'bg-[#0b6f54] ' : 'bg-gray-800 text-white'}`}>
     
      
        <div className="container mx-auto">
          <div className="grid items-center justify-center py-20 2xl:py-[110px]">
          
             <img className="w-64 h-20 mx-auto" src={logo} alt="" />
         
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-x-[30px] 2xl:gap-x-[40px] gap-y-4">
              {[
                {
                  icon: (
                    <p className='text-white'><PiPhoneCallFill /></p>
                  ),
                  text: "(+088) 210 - 123 - 4567",
                },
                {
                  icon: (
                  <p className='text-white'><MdEmail /></p>
                  ),
                  text: "info@suitespot.com",
                },
                {
                  icon: (
                    <p className='text-white'><FaLocationDot /></p>
                  ),
                  text: "47 W 13th St, New York, NY 10011, USA",
                },
              ].map(({ icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-center group aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <span className="w-[35px] h-[35px] grid items-center justify-center border-[1px] border-gray rounded-full">
                    {icon}
                  </span>
                  <p className="text-sm sm:text-base ml-4 text-white group-hover:text-khaki transition-all duration-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright Section */}
          <hr className="text-[#353535] w-full mx-auto h-[2px]" />
          <div className="py-5 md:py-6 flex justify-between items-center space-y-3">
            <p className="text-[13px] sm:text-base mx-auto leading-[26px] text-white">
              Copyright © <span className="text-khaki">2024 SuitSpot.</span> All Rights Reserved.
            </p>
            {/* Social Media Icons */}
            <div className='text-white flex gap-3 text-2xl'>
              <p ><FaFacebook /></p>
              <p><FaSquareTwitter /></p>
              <p ><IoLogoWhatsapp /></p>
              <p ><FaLinkedin /></p>
              <p><FaPinterest /></p>

            </div>
          </div>
        </div>
     
    </div>
  );
};

export default Footer;
