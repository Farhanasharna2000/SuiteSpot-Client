import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import UseAxiosSecure from '../Hook/UseAxiosSecure';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const axiosSecure=UseAxiosSecure()

  useEffect(() => {
    axiosSecure.get(`/featured-rooms`)
      .then(response => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching rooms', error);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500 ">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Featured Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.roomNo} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img src={room.image} alt={room.title} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-semibold">{room.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{room.description}</p>
                <p className="text-gray-800 font-semibold mt-4">Price: ${room.price} / night</p>
                {room.roomFacilities && (
                  <ul className="text-gray-600 text-sm mt-4">
                    {room.roomFacilities.map((facility, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2 text-green-500">✔</span> {facility}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                to={`/room-details/${room._id}`}
                className="mt-4 inline-block px-6 py-2 w-48 bg-blue-500 text-white text-center rounded-full hover:bg-blue-600 transition duration-200 flex-shrink-0"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;