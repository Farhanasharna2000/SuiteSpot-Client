import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HotelLocationMap = () => {
  const hotelData = {
    name: 'SuiteSpot',
    description: 'Luxurious stay in the heart of New York City!',
    location: [40.748817, -73.985428], 
  };

  return (
    
      <div style={{ height: '50vh', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer 
          center={hotelData.location} 
          zoom={13} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={hotelData.location} >
            <Popup>
              <strong>{hotelData.name}</strong> <br />
              {hotelData.description}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    
  );
};

export default HotelLocationMap;
