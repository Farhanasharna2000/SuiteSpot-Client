import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
// import Popup from '../components/Popup'

const Main = () => {
  return (
    <div className='font-lato'>
      <Helmet>
        <title>SuiteSpot</title>
      </Helmet>
     
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className='min-h-[calc(100vh-260px)]'>
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default Main
