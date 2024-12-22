import { useEffect, useState } from "react";
import axios from "axios";
import RoomsCard from "../components/RoomsCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/rooms`)
      .then(response => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch(error => {
        console.error("Error fetching rooms data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          rooms.map(room => <RoomsCard key={room._id} room={room}></RoomsCard>)
        }
      </div>
    </div>
  );
};

export default Rooms;
