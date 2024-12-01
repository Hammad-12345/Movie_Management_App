import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LatestMovies = () => {
  const notify = (data) =>
    toast.success(data, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const notifyerror = (data) =>
      toast.error(data, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  const AuthRoutes = useSelector((state) => state.Routes.AuthRoutes);
  const user = JSON.parse(localStorage.getItem("user"))
  const [movieslatest, updatemovieslatest] = useState([]);
  const navigate = useNavigate();
  const latestmoviesfun = async () => {
    try {
      const res = await axios.get(`${config.latest4ituneapi}`);
      updatemovieslatest([...res.data.results]);
    } catch (error) {}
  };
  const movetodetailpage = async (element) => {
    localStorage.setItem("movieDetails", JSON.stringify(element)); // Store the element as a string in localStorage
    navigate("/MovieDetail"); // Navigate to the detail page
  };
  const FavouriteMovie = async(element) => {
    if(AuthRoutes)
    {
      try {
        const res = await axios.post(`${config.ApiUrl}Favourite/Movie`, {element,ID:user._id},
          {
            headers: {
              Authorization: `Bearer ${AuthRoutes}`,
            },
          }
        );
        if(res.data.status===200)
        {
          notify(res.data.message)
          setTimeout(() => {
            navigate('/FavouriteMovies')
          }, 2000);
        }
      } catch (error) {
        notifyerror(error.message)
      }
    }
    else 
    {
      navigate('/login')
    }
  };
  useEffect(() => {
    latestmoviesfun();
  }, []);
  return (
    <>
    <ToastContainer />
      <div className="latest_movies flex flex-col gap-8 justify-center px-6 py-8">
        {/* latest movies box 1 */}
        <div className="flex flex-col gap-1">
          <div className="text-yellow-300 text-sm uppercase font-bold">
            Online Streaming
          </div>
          <div className="text-4xl text-white font-bold">Latest Movies</div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {movieslatest.map((element) => {
            return (
              <>
                <div
                  className="flex flex-col gap-5"
                  style={{ textDecoration: "none" }}
                >
                  {/* image */}
                  <div className="flex flex-col gap-5 cursor-pointer"  onClick={() => movetodetailpage(element)}>
                  <img src={element.artworkUrl100} className="h-96" alt="" />
                  {/* content box */}
                  <div className="content_box flex flex-col gap-3">
                    {/* content box 1 */}
                    <div className="flex justify-between items-center">
                      <span className="text-md text-white font-bold">
                        {element.trackName.replace("Star Wars:", "").trim()}
                      </span>
                      <span className="text-md text-gray-300 font-bold">
                        {element.trackPrice}
                      </span>
                    </div>
                    {/* content box 2 */}
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-300 font-bold">
                        {element.artistName}
                      </span>
                      <span className="text-sm text-white font-bold">
                        {element.primaryGenreName}
                      </span>
                    </div>
                  </div>
                  </div>

                  <button
                    className="px-10 py-3 uppercase font-bold self-start text-white bg-black border-2 cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300"
                    onClick={() => FavouriteMovie(element)}
                  >
                    <FaHeart />
                  </button>
                </div>
              </>
            );
          })}
        </div>

        <Link to={"/Movies"} className="self-center">
          <button className="px-10 py-3 uppercase font-bold text-white bg-black border-2 cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300">
            View More
          </button>
        </Link>
      </div>
    </>
  );
};

export default LatestMovies;
