/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, text ,description}) => {
  return (
    <div
      className='w-full bg-center  h-[38rem] mt-24'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/50'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
            {text}
          </h1>
          <p className='py-3 font-semibold text-white lg:text-xl'>{description}</p>
          <br />
          <Link
            to='/rooms'
            className='w-full px-5 py-4 mt-4 text-sm font-bold text-white capitalize transition-colors duration-300 transform bg-[#0b6f54] rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
          >
            Discover More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide
