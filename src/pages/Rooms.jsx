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
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [offer, setOffer] = useState(""); 
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

    if (filter) { fetchFilteredRooms(); }
  }, [axiosSecure, filter]);
  if (loading) {
    return <LoadingSpinner />;
  }
  const handleReset = () => {
    setFilter("")
    setFromDate("")
    setToDate("")
    setOffer("")
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

  const handleSearch = async () => {
    setLoading(true);
  
    try {
      const params = new URLSearchParams({
        filter,
        offer, 
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      });
  
      const { data } = await axiosSecure.get(`/all-rooms?${params.toString()}`);
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="container mx-auto px-6 md:pt-28 pb-16">
      <Helmet>
        <title>Rooms | SuiteSpot</title>
      </Helmet>
      <div className="flex items-center justify-end text-2xl">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded ${view === "grid" ? "text-green-600 " : " text-black"
              }`}
          >
            <CgMenuGridR />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded ${view === "table" ? "text-green-600 " : " text-black"
              }`}
          >
            <FaListAlt />

          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
  <div className="w-full md:w-auto text-center md:mt-8">
    <select
      name="filter"
      id="filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border p-[9px] rounded-md  md:w-auto"
    >
      <option value="">Filter By Price Range</option>
      <option value="dsc">Descending Order</option>
      <option value="asc">Ascending Order</option>
    </select>
  </div>
  <div className="w-full md:w-auto text-center">
    <p className=" mb-2 font-extrabold">Offer</p>
    <select
      name="offer"
      id="offer"
      value={offer}
      onChange={(e) => setOffer(e.target.value)}
      className="border p-[9px] rounded-md  md:w-auto"
    >
      <option value="">Select your Offer</option>
      <option value="30">30%</option>
    </select>
  </div>
  <div className="w-full md:w-auto text-center">
    <p className=" mb-2 font-extrabold">From Date</p>
    <DatePicker
      className="border p-2 rounded-md w-full md:w-auto"
      selected={fromDate}
      onChange={(date) => setFromDate(date)}
      minDate={new Date()}
      selectsStart
      startDate={fromDate}
      endDate={toDate}
    />
  </div>
  <div className="w-full md:w-auto text-center">
    <p className=" mb-2 font-extrabold">To Date</p>
    <DatePicker
      className="border p-2 rounded-md w-full md:w-auto"
      selected={toDate}
      onChange={(date) => setToDate(date)}
      minDate={fromDate || new Date()}
      selectsEnd
      startDate={fromDate}
      endDate={toDate}
    />
  </div>
  <div className=" md:w-auto text-center md:mt-7 mt-4">
    <button
      onClick={handleSearch}
      className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white w-full md:w-auto"
    >
      Search
    </button>
  </div>
  <div className=" md:w-auto text-center md:mt-7 mt-4">
    <button
      onClick={handleReset}
      className="btn hover:text-red-600 font-bold hover:bg-gray-300 bg-red-600 text-white w-full md:w-auto"
    >
      Reset
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
