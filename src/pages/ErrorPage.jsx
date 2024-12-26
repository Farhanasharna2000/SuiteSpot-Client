import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <img
      src="https://media.giphy.com/media/A9EcBzd6t8DZe/giphy.gif"
      alt="404 Error"
      className="max-w-md mb-8"
    />
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found!!!</h1>
    <p className="text-lg text-gray-600 mb-8">
      Oops! The page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="btn bg-[#0b6f54] hover:bg-gray-300 text-white font-bold hover:text-[#0b6f54]"
    >
      Back to Home
    </Link>
  </div>
  )
}

export default ErrorPage
