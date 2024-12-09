import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const FavouriteMoviesList = () => {
  const navigate = useNavigate();
  const [loadermovielist, updatemovielist] = useState(true);
  const AuthRoutes = useSelector((state) => state.Routes.AuthRoutes);
  const user = JSON.parse(localStorage.getItem("user"));
  const [favouritemovieslist, updatefavouritemovielist] = useState([]);
  const [nofavouritemovie,updatenofavouritemovie]=useState('')
  console.log(nofavouritemovie)
  const fetch_favourite_movie = async () => {
    const favourite_list_box = document.querySelector("#favourite_list_box");
    try {
      const res = await axios.get(
        `${config.ApiUrl}Favourite/FetchMovies/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${AuthRoutes}`,
          },
        }
      );
      console.log(res)
      if (res.data.status === 200) {
        setTimeout(() => {
          updatemovielist(false);
        }, 2000);
        setTimeout(() => {
          updatefavouritemovielist([...res.data.movies]);
        }, 2500);
        setTimeout(() => {
          favourite_list_box.scrollIntoView({ behavior: "smooth" });
        }, 3000);
      }
      else 
      {
        setTimeout(() => {
          updatemovielist(false);
        }, 2000);
        setTimeout(() => {
          updatenofavouritemovie(res.data.message)
        }, 2500);
      }
    } catch (error) {}
  };
  const movetodetailpage = async (element) => {
    localStorage.setItem("movieDetails", JSON.stringify(element)); // Store the element as a string in localStorage
    navigate("/MovieDetail"); // Navigate to the detail page
  };
  useEffect(() => {
    const loaderElement = document.querySelector("#loadermovielist");
    if (loaderElement) {
      loaderElement.scrollIntoView({ behavior: "smooth" });
    }
    fetch_favourite_movie();
  }, []);
  return (
    <>
      <div className="favourite_movie_list py-6 px-6 flex flex-col gap-8" id="favourite_list_box">
        <div className="flex flex-col gap-3">
          <div className="text-yellow-300 font-bold uppercase text-sm">
            Online Streaming
          </div>
          <div className="text-white text-3xl font-bold">Favourite Movie</div>
        </div>
        {!loadermovielist ? (
          <>
            {favouritemovieslist.length > 0 ? (
              <>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                  {favouritemovieslist.map((element) => {
                    return (
                      <>
                        <div
                          className="flex flex-col gap-5 cursor-pointer"
                          style={{ textDecoration: "none" }}
                        >
                          {/* image */}
                          <div
                            className="flex flex-col gap-5 cursor-pointer"
                            onClick={() => movetodetailpage(element)}
                          >
                            <img
                              src={element.artworkUrl100}
                              className="h-96"
                              alt=""
                            />
                            {/* content box */}
                            <div className="content_box flex flex-col gap-3">
                              {/* content box 1 */}
                              <div className="flex justify-between items-center">
                                <span className="text-md text-white font-bold">
                                  {element.trackName
                                    .replace("Star Wars:", "")
                                    .trim()}
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

                          {/* <button
                            className="px-10 py-3 uppercase font-bold self-start text-white bg-black border-2 cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300"
                            onClick={() => FavouriteMovie(element)}
                          >
                            <FaHeart />
                          </button> */}
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
              {
                nofavouritemovie && <><div className="flex gap-2 justify-center text-white text-3xl uppercase font-bold py-6">
               No Favourite <span className="text-yellow-300">Movies</span>
              </div>
              </>
              }
              </>
            )}
          </>
        ) : (
          <>
            <div
              className="flex flex-row gap-3 justify-center"
              id="loadermovielist"
            >
              <div className="h-8 w-2 bg-white loader_animation_box1"></div>
              <div className="h-8 w-2 bg-white loader_animation_box2"></div>
              <div className="h-8 w-2 bg-white loader_animation_box3"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FavouriteMoviesList;
