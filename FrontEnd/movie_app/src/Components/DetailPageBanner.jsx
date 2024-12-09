import React, { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

const DetailPageBanner = () => {
  const [detailobject, updatedetailobject] = useState({});
  const [storemovieurl,updatemovieurl]=useState('')
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
  console.log(detailobject);
  const DetailData = () => {
    const data = JSON.parse(localStorage.getItem("movieDetails"));
    updatedetailobject({ ...data });
  };
  const watchmovie = () =>
  {
    setIsOpen(true)
    updatemovieurl(detailobject.previewUrl)
  }

   // Function to close the modal
   const closeModal = () => setIsOpen(false);
  useEffect(() => {
    const detail_data_box = document.querySelector("#detail_data_box");
    if (detail_data_box) {
      detail_data_box.scrollIntoView({ behavior: "smooth" });
    }
    DetailData();
    
  }, []);
  return (
    <>
      <div className="Detail_Page_banner flex flex-col justify-center" id="detail_data_box">
        <div className="detail_object_box px-4 flex sm:flex-row flex-col sm:my-0 mt-32 mb-12 gap-16" >
          {/* image box */}
          <img
            src={detailobject.artworkUrl100}
            className="h-96"
            alt=""
            srcset=""
          />

          <div className="flex flex-col gap-4">
            <h1 className="text-white text-5xl font-bold">
              {detailobject.trackName?.replace("Star Wars:", "").trim()}
            </h1>
            <div className="flex gap-6 items-center">
              <span className="text-white text-sm font-bold border-2 border-solid border-white px-4 py-1">
                HD
              </span>
              <span className="text-white font-bold">
                {detailobject.primaryGenreName}
              </span>
            </div>
            <p className="w-3/4 text-white font-bold">
              {detailobject.longDescription}
            </p>
            <button className="px-10 py-3 font-bold self-start uppercase text-white bg-black border-2 cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300" onClick={()=>watchmovie()}>
              Watch Now
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal content */}
          <div className="bg-white p-4 rounded-lg relative w-3/4 flex flex-col gap-4">
            {/* Close button */}
            <button  className="px-4 py-3 font-bold self-end uppercase text-white bg-black cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300" onClick={closeModal}>
            <FaTimes />
            </button>

            {/* Movie Video */}
            <video className="w-full h-auto" controls autoPlay>
              <source src={storemovieurl}  type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPageBanner;
