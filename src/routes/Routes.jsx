import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home'
import Login from '../pages/Authentication/Login'
import Register from '../pages/Authentication/Register'

import ErrorPage from '../pages/ErrorPage'
import Rooms from '../pages/Rooms'
import MyBookings from '../pages/MyBookings'
import PrivateRoute from './PrivateRoute'
import RoomDetails from '../components/RoomDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Register />,
      },
      
      {
        path: '/rooms',
        element: <Rooms />,
      },
      {
        path: '/room-details/:id',
        element: <RoomDetails />,
      },
      {
        path: '/my-bookings',
        element: <PrivateRoute>
          <MyBookings />
        </PrivateRoute> ,
      },
    ],
    
  },
 
 
])

export default router
