import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LoggedOut } from "../ReduxToolkit/Slice/StoreToken";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const AuthRoutes = useSelector((state) => state.Routes.AuthRoutes);
  const [showButton, setShowButton] = useState(false);
  const logout_fun = () => {
    dispatch(LoggedOut());
    Navigate('/')
  };
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
        className={`flex items-center justify-between header box-border ${
          showButton && "headeranimate"
        }`}
      >
        {/* logo box */}
        {/* <div className="flex gap-12 items-center"> */}
        <div>
          <img src={logo} alt="" srcset="" />
        </div>
        {/* navbar box */}
        <div>
          <ul className="flex gap-12 items-center list-none">
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
                <Link to={"/FavouriteMovies"} style={{ textDecoration: "none" }}>
                  <li className="text-sm text-white uppercase hover:text-yellow-300 font-bold">
                    My Favourite Movies
                  </li>
                </Link>
              </>
            )}

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
