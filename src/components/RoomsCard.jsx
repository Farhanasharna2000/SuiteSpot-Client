import { Link } from "react-router-dom";

const RoomsCard = ({ room }) => {
    const { _id, title, image, price, bedSize, capacity, reviewCount, status } = room || {};

    return (
        <Link
            to={`/room-details/${_id}`}
            className="overflow-x-hidden group aos-init aos-animate block"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div className="relative border border-[#e8e8e8] dark:border-[#424242] rounded-md">
                {/* Image */}
                <div className="overflow-hidden w-full h-[250px]">
                    <img
                        src={image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        alt={title}
                    />
                </div>

                {/* Price */}
                <div className="px-5 py-2 bg-khaki text-sm text-white absolute top-[10px] right-[10px] rounded">
                    <span>${price}</span>
                    <span className="mx-2">|</span>
                    <span>Night</span>
                </div>
            </div>

            {/* Card details */}
            <div>
                <div className="border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                    <div className="py-6 px-[30px]">
                        <h2 className="text-xl leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                            {title}
                        </h2>
                        <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">
                            {capacity}/Person
                        </p>
                        <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">
                            Review Count : {reviewCount}
                        </p>
                        <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">
                            Status: {status === "Available" ? "Available" : "Unavailable"}
                        </p>


                    </div>
                    <div className="border-t-[1px] border-[#e8e8e8] dark:border-[#424242] py-5">
                        <div className="px-[30px] flex items-center justify-between">
                            <div>
                                <span className="font-Lora text-base flex items-center">

                                    <span className="ml-[10px] text-gray dark:text-lightGray">{bedSize}</span>
                                </span>
                            </div>
                            <span className="w-[1px] h-[25px] bg-[#ddd] dark:bg-gray"></span>
                            <ul className="flex items-center text-khaki space-x-[5px]">
                                {[...Array(5)].map((_, index) => (
                                    <li key={index}>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            viewBox="0 0 576 512"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                        </svg>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RoomsCard;
