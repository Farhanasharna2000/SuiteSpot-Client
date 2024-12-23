import { useEffect, useState } from "react";
import axios from "axios";
import RoomsCard from "../components/RoomsCard";
import { Helmet } from "react-helmet";

const Rooms = () => {
  const [rooms, setRooms] = useState([]); 
  const [filter, setFilter] = useState(""); 

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms`)
      .then((response) => {
        console.log(response.data);
        setRooms(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching rooms data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchFilteredRooms = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-rooms?filter=${filter}`
        );
        console.log("Filtered rooms data:", data);
        setRooms(data); 
      } catch (error) {
        console.error("Error fetching filtered rooms data:", error);
      }
    };

    if (filter) fetchFilteredRooms(); 
  }, [filter]);

  const handleReset = () => {
    setFilter(""); 
    axios
      .get(`${import.meta.env.VITE_API_URL}/rooms`) 
      .then((response) => {
        console.log("Reset data:", response.data);
        setRooms(response.data); 
      })
      .catch((error) => {
        console.error("Error resetting rooms data:", error);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Rooms | SuitSpot</title>
      </Helmet>
      <div className="flex gap-3 py-3">
        <div>
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-4 rounded-md"
          >
            <option value="">Filter By Price Range</option>
            <option value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleReset}
            className="btn"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomsCard key={room._id} room={room}></RoomsCard>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
