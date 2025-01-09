import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Main = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  })
  return (
    <div className='font-lato'>
      <Helmet>
        <title>SuiteSpot</title>
      </Helmet>
     
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className='min-h-screen'>
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export default Main
