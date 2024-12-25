import  { useEffect, useState } from 'react';
import img from '../assets/images/banner2.jpg';

const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //     const savedState = localStorage.getItem('popupVisible');
  //     if (savedState === 'false') {
  //         setIsVisible(false);
  //     }
  // }, []);

  const handleClose = () => {
      setIsVisible(false);
      // localStorage.setItem('popupVisible', 'false');
  };
    return (
        <>
            {isVisible && (
                <div className='w-screen h-screen bg-[#787575c2] fixed z-[99999] top-0 left-1/2 transform -translate-x-1/2 popup'>
                    <div className="card shadow-xl w-6/12 mx-auto mt-20 ">
                        <div className="card-body bg-white rounded-lg  relative">
                            <div className="card-actions justify-end">
                                <button className="btn btn-square btn-sm absolute top-0 mr-2 mt-2 right-0" onClick={handleClose}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <img src={img} alt="" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
