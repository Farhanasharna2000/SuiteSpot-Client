import { useState } from "react";
import hotel1 from '../assets/images/Hotel/hotel (1).jpg'
import hotel2 from '../assets/images/Hotel/hotel (2).jpg'
import hotel3 from '../assets/images/Hotel/hotel (3).jpg'
import hotel4 from '../assets/images/Hotel/hotel (4).jpg'
import hotel5 from '../assets/images/Hotel/hotel (5).jpg'

import room1 from '../assets/images/Rooms/room (1).jpeg'
import room2 from '../assets/images/Rooms/room (2).jpeg'
import room3 from '../assets/images/Rooms/room (3).jpeg'
import room4 from '../assets/images/Rooms/room (4).jpeg'
import room5 from '../assets/images/Rooms/room (5).jpeg'
import room6 from '../assets/images/Rooms/room (6).jpeg'
import room7 from '../assets/images/Rooms/room (7).jpeg'
import room8 from '../assets/images/Rooms/room (8).jpeg'

import amenities1 from '../assets/images/Amenities/amini (1).jpg'
import amenities2 from '../assets/images/Amenities/amini (2).jpg'
import amenities3 from '../assets/images/Amenities/amini (3).jpg'
import amenities4 from '../assets/images/Amenities/amini (4).jpg'

import event1 from '../assets/images/Events/event (1).jpg'
import event2 from '../assets/images/Events/event (2).jpg'
import event3 from '../assets/images/Events/event (3).jpg'
import event4 from '../assets/images/Events/event (4).jpg'
import event5 from '../assets/images/Events/event (5).jpg'

const Gallery = () => {
  const categories = ["All", "Hotel & Ground", "Rooms", "Amenities", "Events"];

  // All images with categories
  const allImages = [
    { src: hotel1, category: "Hotel & Ground" },
    { src: hotel2, category: "Hotel & Ground" },
    { src: hotel3, category: "Hotel & Ground" },
    { src: hotel4, category: "Hotel & Ground" },
    { src: hotel5, category: "Hotel & Ground" },
    { src: room1, category: "Rooms" },
    { src: room2, category: "Rooms" },
    { src: room3, category: "Rooms" },
    { src: room4, category: "Rooms" },
    { src: room5, category: "Rooms" },
    { src: room6, category: "Rooms" },
    { src: room7, category: "Rooms" },
    { src: room8, category: "Rooms" },


    { src: amenities1, category: "Amenities" },
    { src: amenities2, category: "Amenities" },
    { src: amenities3, category: "Amenities" },
    { src: amenities4, category: "Amenities" },
    

    { src: event1, category: "Events" },
    { src: event2, category: "Events" },
    { src: event3, category: "Events" },
    { src: event4, category: "Events" },
    { src: event5, category: "Events" },

  ];

  const [filteredImages, setFilteredImages] = useState(allImages);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filterImages = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(allImages.filter((img) => img.category === category));
    }
  };

  return (
    <div className="pt-32 pb-10 container mx-auto">
        
      {/* Category Filters */}
      <div className="flex justify-center gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterImages(category)}
            className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 hover:text-black transition-colors ${
              selectedCategory === category ? "bg-green-500 text-white" : "text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <div key={index} >
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              className="w-full h-80 cursor-pointer border border-gray-300 rounded-lg transition-transform transform hover:scale-105"
            />
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
