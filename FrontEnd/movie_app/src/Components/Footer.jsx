import React from "react";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      {/* Footer Design Start */}
      <div className="flex flex-col py-8 px-4 gap-5 footer_design">
        {/* Footer Box 1 */}
        <div className="flex justify-between items-center footer_box_one">
          <img src={logo} alt="" srcset="" />
          <div>
            <ul className="flex gap-10 items-center list-none ps-0">
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">Home</li>
              </Link>
              <Link to={"/Movies"} style={{ textDecoration: "none" }}>
                <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">Movie</li>
              </Link>
              <Link style={{ textDecoration: "none" }}>
                <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">Contact us</li>
              </Link>

              {/* <li className="text-base text-white">Contact us</li>
              <li className="text-base text-white">Contact us</li>
              <li className="text-base text-white">Contact us</li> */}
              {/* <li className='text-md text-white'>Movie</li> */}
            </ul>
          </div>
        </div>

        <div className="w-full line" />

        {/* Footer Box 2 */}

        <div className="footer_box_two flex justify-between">
        <ul className="flex gap-10 items-center list-none ps-0">
              <Link to={"/"} style={{textDecoration:"none"}}>
              <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">Faq</li>
              </Link>
              <Link to={"/Movies"} style={{textDecoration:"none"}}>
              <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">Help Center</li>
              </Link>
              <Link style={{textDecoration:"none"}}>
              <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold" >Terms of use</li> 
              </Link>

              <Link style={{textDecoration:"none"}}>
              <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold" >Privacy</li> 
              </Link>
            </ul>
            <ul className="flex gap-7 list-none">
              <li className="w-10 h-10 rounded-full flex justify-center items-center bg-black">
                <FaFacebook  className="text-white hover:text-yellow-300 cursor-pointer"/>
              </li>
              <li className="w-10 h-10 rounded-full flex justify-center items-center bg-black">
                <FaInstagram  className="text-white hover:text-yellow-300 cursor-pointer"/>
              </li>
              <li className="w-10 h-10 rounded-full flex justify-center items-center bg-black">
                <FaLinkedin  className="text-white hover:text-yellow-300 cursor-pointer"/>
              </li>
              <li className="w-10 h-10 rounded-full flex justify-center items-center bg-black">
                <FaTwitter  className="text-white hover:text-yellow-300 cursor-pointer"/>
              </li>
            </ul>
        </div>


        

      </div>
      <div className="py-8 px-4" style={{backgroundColor:"#171b22"}}>
          <div className="text-white text-sm">
          Copyright © 2024. All Rights Reserved By <span className="text-yellow-300">Movflx</span>
          </div>
        </div>
    </>
  );
};

export default Footer;
