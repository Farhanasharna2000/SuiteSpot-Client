import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="text-center ">
      
        <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
        404 error
          </h1>
        
          <h2 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
            Page not found
          </h2>
    
        <Link to="/" className="mt-4  btn bg-[#ff0000e1] text-white hover:bg-black">
          Go back to Home
        </Link>
      </div>

    </div>
  )
}

export default ErrorPage
