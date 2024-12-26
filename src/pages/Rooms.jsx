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
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto pt-28">
      <Helmet>
        <title>Rooms | SuiteSpot</title>
      </Helmet>
      <div className="flex justify-between">
        <div className="flex gap-3 py-3">
          <div className="mt-8">
            <select
              name="filter"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border p-4 rounded-md "
            >
              <option value="">Filter By Price Range</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <div className="">
            <p className=" text-gray-800 mb-2 ml-2"><span className="font-extrabold">Offer </span></p>
            <div>
            <select
              name="offer"
              id="offer"
              value={offer}
              onChange={(e) => setOffer(e.target.value)} 
              className="border p-4 rounded-md"
            >
              <option value="">Select your Offer</option>
              <option value="30">30%</option>
            </select>

            </div>
          </div>
           
          <div>
            <p className=" text-gray-800 mb-2 ml-2"><span className="font-extrabold">From Date </span></p>

            <DatePicker
              className="border p-2 rounded-md"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              minDate={new Date()}
              selectsStart
              startDate={fromDate}
              endDate={toDate}
            />

          </div>
          <div>
            <p className=" text-gray-800 mb-2 ml-2"><span className="font-extrabold">To Date </span></p>

            <DatePicker
              className="border p-2 rounded-md"
              selected={toDate}
              onChange={(date) => setToDate(date)}
              minDate={fromDate || new Date()}
              selectsEnd
              startDate={fromDate}
              endDate={toDate}
            />
          </div>
          <div className="mt-7">
          <button
  onClick={handleSearch}
  className="btn hover:text-[#0b6f54] font-bold hover:bg-gray-300 bg-[#0b6f54] text-white"
>
  Search
</button>
          </div>
          <div className="mt-7">
            <button
              onClick={handleReset}
              className="btn hover:text-red-600 font-bold hover:bg-gray-300 bg-red-600 text-white"
            >
              Reset
            </button>
          </div>
        </div>
       
        <div className="flex items-center  text-2xl">
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
