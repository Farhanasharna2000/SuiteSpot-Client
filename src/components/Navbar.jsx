import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import useAuth from '../Hook/UseAuth'
import { useTheme } from '../Hook/UseTheme';
import { FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
  const { user,logOut } = useAuth()
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-bold   ${isActive ? "bg-black text-white hover:text-blue-700 hover:bg-white" : " text-blue-700 bg-gray-300"}`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-bold bg-black  ${isActive ? "bg-black text-white hover:text-blue-700 hover:bg-white" : " text-blue-700 bg-gray-300"}`
          }
          to="/rooms"
        >
         Rooms
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-bold bg-black  ${isActive ? "bg-black text-white hover:text-blue-700 hover:bg-white" : " text-blue-700 bg-gray-300"}`
          }
          to="/my-bookings"
        >
         My Bookings
        </NavLink>
      </li>

    </>

  );
  return (
    <div className={`shadow-md py-2 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-[#ff3c00]  rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <img className="w-64 h-20" src={logo} alt="" />
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1 ">{links}</ul>
          </div>
          <div className="navbar-end">
            {user?.email ? (
              <div className="flex gap-3 items-center">
                <div className="relative group">
                  <img
                  referrerPolicy='no-referrer'
                    className="rounded-full w-12 h-12 border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                    src={user?.photoURL || " "}
                    alt="User"
                  />
                  <div className="absolute text-center top-14 left-1/2 transform -translate-x-1/2 w-40 p-3 bg-[#111A3A]  rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out scale-75 group-hover:scale-100">
                    <p className="text-white  font-semibold animate-bounce mb-3">
                      {user?.displayName || "Hello, User!"}
                    </p>
                    <button
                      onClick={logOut}
                      className="btn btn-outline text-blue-700 hover:bg-black hover:text-white bg-gray-300 "
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <button
                  onClick={logOut}
                  className="btn text-blue-700 bg-gray-300 hover:bg-black hover:text-white hover:border-white hover:shadow-lg hover:scale-105 transition-transform"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <NavLink to="/login">
                  <button className="btn text-blue-700 bg-gray-300 hover:bg-black hover:text-white hover:border-white hover:shadow-lg hover:scale-105 transition-transform">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/registration">
                  <button className="btn text-blue-700 bg-gray-300 hover:bg-black hover:text-white hover:border-white hover:shadow-lg hover:scale-105 transition-transform">
                    Register
                  </button>
                </NavLink>

              </div>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost rounded-full p-2 ml-3"
          >
            {theme === 'light' ? (
              <FiMoon className="text-2xl text-blue-700" />
            ) : (
              <FiSun className="text-2xl text-yellow-300" />
            )}
          </button>

        </div>
      </div>
  )
}

export default Navbar
