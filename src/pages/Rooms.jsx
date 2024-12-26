import { useEffect, useState } from "react";
import RoomsCard from "../components/RoomsCard";
import { Helmet } from "react-helmet";
import UseAxiosSecure from "../Hook/UseAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import RoomsTable from "../components/RoomsTable";
import { FaListAlt } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import DatePicker from "react-datepicker";

const Rooms = () => {
  const [rooms, setRooms] = useState([]); 
  const [filter, setFilter] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [bookingDate, setBookingDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/rooms`)
      .then((response) => {
        
        setRooms(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms data:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  useEffect(() => {
    const fetchFilteredRooms = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/all-rooms?filter=${filter}`
        );
       
        setRooms(data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching filtered rooms data:", error);
        setLoading(false);
      }
    };

    if (filter) {fetchFilteredRooms(); }
  }, [axiosSecure, filter]);
  if (loading) {
    return <LoadingSpinner />;
  }
  const handleReset = () => {
    setFilter(""); 
    axiosSecure
      .get(`/rooms`) 
      .then((response) => {
   
        setRooms(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error resetting rooms data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto pt-28">
      <Helmet>
        <title>Rooms | SuiteSpot</title>
      </Helmet>
    <div className="flex justify-between">
    <div className="flex gap-3 py-3">
        <div>
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-4 rounded-md "
          >
            <option value="">Filter By Price Range</option>
            <option  value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleReset}
            className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white"
          >
            Reset
          </button>
        </div>
      </div>
          <div className='flex gap-5 '>

          <div className="">
          <p className=" text-gray-800 mb-2"><span className="font-extrabold">Offer </span></p>
          <div>
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-4 rounded-md "
          >
            <option value="">Select your Offer</option>
            <option  value="30">30%</option>
          </select>
        </div>
        </div>
                                  <div>
                                      <p className=" text-gray-800 mb-2"><span className="font-extrabold">Check-In Date </span></p>
      
                                      <DatePicker
                                          className="border p-2 rounded-md"
                                          selected={bookingDate}
                                          onChange={(date) => setBookingDate(date)}
                                          minDate={new Date()}
                                          selectsStart
                                          startDate={bookingDate}
                                          endDate={checkOutDate}
                                      />
      
                                  </div>
                                  <div>
                                      <p className=" text-gray-800 mb-2"><span className="font-extrabold">Check-Out Date </span></p>
      
                                      <DatePicker
                                          className="border p-2 rounded-md"
                                          selected={checkOutDate}
                                          onChange={(date) => setCheckOutDate(date)}
                                          minDate={bookingDate || new Date()}
                                          selectsEnd
                                          startDate={bookingDate}
                                          endDate={checkOutDate}
                                      />
                                  </div>
                                  <div className="mt-7">
          <button
            className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white "
          >
           Search
          </button>
        </div>
      
                              </div>
      <div className="flex items-center  text-2xl">
      <button
        onClick={() => setView("grid")}
        className={`p-2 rounded ${
          view === "grid" ? "text-green-600 " : " text-black"
        }`}
      >
     <CgMenuGridR />
      </button>
      <button
        onClick={() => setView("table")}
        className={`p-2 rounded ${
          view === "table" ? "text-green-600 " : " text-black"
        }`}
      >
            <FaListAlt />
       
      </button>
    </div>
    </div>
    
   
      <div>
     

      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <RoomsCard key={room._id} room={room}></RoomsCard>
          ))}
        </div>
      )}

      {view === "table" && (
        <div className="mb-8 overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr className="text-base">
                <th>Name</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Review Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <RoomsTable key={room._id} room={room}></RoomsTable>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>


 
  );
};

export default Rooms;
