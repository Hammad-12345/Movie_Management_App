import React from "react";
import serverimage from "../Images/servicesimg.jpg";
import { FaTv } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
const OurService = () => {
  return (
    <>
      <div className="our_services flex items-center px-6 gap-28">
        {/* Our Services Image Box */}
        <div>
          <img src={serverimage} alt="" srcset="" />
        </div>
        {/* Our Services Content Box */}
        <div className="flex flex-col gap-6">
          {/* our services content box 1 */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center ">
              <hr className="w-10 h-1 bg-yellow-300 border-none m-0" />
              <span className="text-sm text-gray-300 uppercase">Our services</span>
            </div>
            <div>
              <p className="text-white my-0 text-4xl w-96 font-semibold">
                Download Your Shows Watch Offline.
              </p>
            </div>
            <div>
              <p className="text-base text-gray-300 font-bold">
                Lorem ipsum dolor sit amet, consecetur adipiscing elseddo
                eiusmod tempor.There are many variations of passages of lorem
                Ipsum available, but the majority have suffered alteration in
                some injected humour.
              </p>
            </div>
          </div>

          {/* our services content box 2 */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 rounded-full border-dotted border-yellow-300  flex flex-col items-center justify-center">
                <div className="w-4/5 h-4/5 flex flex-col items-center justify-center rounded-full hover:bg-yellow-300 ">
                <FaTv className="text-white text-4xl" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-white font-bold">Enjoy on Your TV.</div>
                <div className="text-gray-400 w-80 font-bold">Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.</div>
              </div>
            </div>
            <div className="line">
            </div>
            <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-full border-dotted border-yellow-300 flex flex-col items-center justify-center">
            <div className="w-4/5 h-4/5 flex flex-col items-center justify-center rounded-full hover:bg-yellow-300">
            <FaVideo className="text-white text-4xl" />
            </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="text-white font-bold">Watch Everywhere.</div>
                <div className="text-gray-400 w-80 font-bold">Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurService;
