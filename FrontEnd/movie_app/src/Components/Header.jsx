import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { FaAngleUp, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LoggedOut } from "../ReduxToolkit/Slice/StoreToken";
import { useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
const Header = () => {
  const [small_menu, update_small_menu] = useState(false);
  const [OpenSmallMenu, UpdateSmallMenu] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const AuthRoutes = useSelector((state) => state.Routes.AuthRoutes);
  const [showButton, setShowButton] = useState(false);
  const logout_fun = () => {
    dispatch(LoggedOut());
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    Navigate("/");
  };
  const Openmenubar = () => {
    update_small_menu(true);
    UpdateSmallMenu(true);
  };
  const closemenubar = () =>
  {
    UpdateSmallMenu(false);
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true); // Show button after scrolling 100px
      } else {
        setShowButton(false); // Hide button when scrolled back up
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className={`flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between header box-border ${
          showButton && "headeranimate"
        }`}
      >
        {/* logo box */}
        {/* <div className="flex gap-12 items-center"> */}
        <div className="flex items-center gap-6">
          <img src={logo} alt="" srcset="" />
          <FaBars
            className="text-2xl cursor-pointer text-white lg:hidden"
            onClick={Openmenubar}
          />
        </div>
        {/* navbar box */}
        <div
          className={`lg:relative absolute top-0 bg-gray-300 lg:bg-transparent left-0 lg:p-0 px-2 py-8 lg:w-auto w-56 lg:h-auto h-60 ${
            small_menu
              ? OpenSmallMenu
                ? "menu_bar_open_animation"
                : "menu_bar_close_animation"
              : "menu_bar"
          }`}
        >
          <ul className="flex gap-12 items-center list-none flex-col lg:flex-row p-0 m-0">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">
                Home
              </li>
            </Link>
            <Link to={"/Movies"} style={{ textDecoration: "none" }}>
              <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">
                Movie
              </li>
            </Link>
            <Link style={{ textDecoration: "none" }}>
              <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">
                Contact us
              </li>
            </Link>
            {AuthRoutes && (
              <>
                <Link
                  to={"/FavouriteMovies"}
                  style={{ textDecoration: "none" }}
                >
                  <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">
                    My Favourite Movies
                  </li>
                </Link>
              </>
            )}
            <button className="fixed lg:hidden top-2 rigth-0 px-4 py-3 font-bold self-end uppercase text-white bg-black cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300" onClick={closemenubar}>
            <FaTimes />
            </button>



            {/* <li className="text-base text-white">Contact us</li>
              <li className="text-base text-white">Contact us</li>
              <li className="text-base text-white">Contact us</li> */}
            {/* <li className='text-md text-white'>Movie</li> */}
          </ul>
        </div>
        {/* </div> */}
        {/* button box */}
        <div>
          {!AuthRoutes ? (
            <Link to={"/login"}>
              <button className="px-10 py-3 font-bold text-white bg-black border-2 cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300">
                SIGN IN
              </button>
            </Link>
          ) : (
            <button
              className="px-10 py-3 font-bold text-white bg-black border-2 cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300"
              onClick={logout_fun}
            >
              LOG OUT
            </button>
          )}
        </div>
      </div>
      {showButton && (
        <div
          className={`top_icon_box w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-yellow-400
        ${showButton ? "" : ""}`}
          onClick={scrollToTop}
        >
          <FaAngleUp className="text-black text-xl" />
        </div>
      )}
    </>
  );
};

export default Header;
