import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MovieList = () => {
  const navigate = useNavigate();
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
  const user = JSON.parse(localStorage.getItem("user"));
  const [movieslatest, updatemovieslatest] = useState([]);
  const [paginationlength, updatepaginationlength] = useState([]);
  const [paginationnumber, updatepaginationnumber] = useState();
  const [TotalMovieList, UpdateTotalMovieList] = useState([]);
  const [filtermovieslist, Updatefiltermovieslist] = useState([]);
  const [loadermovielist, updatemovielist] = useState(true);
  const [filtermovieresponse, updatefiltermovieresponse] = useState("");
  console.log(movieslatest);
  console.log(TotalMovieList);
  console.log("API URL:", process.env.REACT_APP_API_URL);
  const fetchmovielist = async () => {
    const movie_list_box = document.querySelector("#movie_list_box");
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}movieslist`, {
        headers: {
          Authorization: "",
        },
      });
      if (res.data.resultCount <= 10) {
        setTimeout(() => {
          updatemovielist(false);
          updatemovieslatest([...res.data.results]);
          movie_list_box.scrollIntoView({ behavior: "smooth" });
          // updatemovieslatest([...res.data.results]);
        }, 2000);
        // setTimeout(() => {
        //   updatemovieslatest([...res.data.results]);
        // }, 2500);
      } else {
        setTimeout(() => {
          updatemovielist(false);
          const data = res.data.results;
          updatemovieslatest([
            ...data.slice(0, 10).map((element) => {
              return element;
            }),
          ]);
          UpdateTotalMovieList([...res.data.results]);
          const countres = res.data.resultCount / 10;
          updatepaginationlength(
            Array.from({ length: countres }, (_, i) => i + 1)
          );
          updatepaginationnumber(1);
          movie_list_box.scrollIntoView({ behavior: "smooth" });
        }, 2000);
        setTimeout(() => {
          // const data = res.data.results;
          // updatemovieslatest([
          //   ...data.slice(0, 10).map((element) => {
          //     return element;
          //   }),
          // ]);
          // UpdateTotalMovieList([...res.data.results]);
          // const countres = res.data.resultCount / 10;
          // updatepaginationlength(
          //   Array.from({ length: countres }, (_, i) => i + 1)
          // );
          // updatepaginationnumber(1);
        }, 2500);
      }
    } catch (error) {}
  };
  const FavouriteMovie = async (element) => {
    if (AuthRoutes) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}Favourite/Movie`,
          { element, ID: user._id },
          {
            headers: {
              Authorization: `Bearer ${AuthRoutes}`,
            },
          }
        );
        if (res.data.status === 200) {
          notify(res.data.message);
          setTimeout(() => {
            navigate("/FavouriteMovies");
          }, 2000);
        }
      } catch (error) {
        notifyerror(error.message);
      }
    } else {
      navigate("/login");
    }
  };
  const PaginationNumber = (pag_num) => {
    const movie_list_box = document.querySelector("#movie_list_box");
    updatemovielist(true);
    updatepaginationnumber(pag_num);
    const defaultmovieshow = (pag_num - 1) * 10;
    const multiplymovieshow = pag_num * 10;
    console.log(defaultmovieshow);
    console.log(multiplymovieshow);
    setTimeout(() => {
      updatemovielist(false);
    }, 2000);
    // setTimeout(() => {

    // }, 2500);
    setTimeout(() => {
      updatemovieslatest([
        ...TotalMovieList.slice(defaultmovieshow, multiplymovieshow).map(
          (element) => {
            return element;
          }
        ),
      ]);
      movie_list_box.scrollIntoView({ behavior: "smooth" });
    }, 3000);
  };
  const movetodetailpage = async (element) => {
    localStorage.setItem("movieDetails", JSON.stringify(element)); // Store the element as a string in localStorage
    navigate("/MovieDetail"); // Navigate to the detail page
  };
  const filtermovies = async (e) => {
    updatemovielist(true);
    if (e.target.value.length > 0) {
      const data = movieslatest.filter((element) => {
        const trackname_replace = element.trackName
          .replace("Star Wars:", "")
          .trim();
        console.log(e.target.value.toLowerCase());
        console.log(trackname_replace);
        return trackname_replace.toLowerCase() === e.target.value.toLowerCase();
      });
      if (data.length > 0) {
        setTimeout(() => {
          Updatefiltermovieslist([...data]);
        }, 2000);
        setTimeout(() => {
          updatefiltermovieresponse("");
        }, 2500);
        setTimeout(() => {
          updatemovielist(false);
        }, 3000);
      } else {
        setTimeout(() => {
          Updatefiltermovieslist([]);
        }, 2000);
        setTimeout(() => {
          updatefiltermovieresponse("No Filter Movie Found On Page No");
        }, 2500);
        setTimeout(() => {
          updatemovielist(false);
        }, 3000);
      }
    } else {
      setTimeout(() => {
        Updatefiltermovieslist([]);
      }, 2000);
      setTimeout(() => {
        updatefiltermovieresponse("");
      }, 2500);
      setTimeout(() => {
        updatemovielist(false);
      }, 3000);
    }
  };
  useEffect(() => {
    const loaderElement = document.querySelector("#loadermovielist");
    if (loaderElement) {
      loaderElement.scrollIntoView({ behavior: "smooth" });
    }
    fetchmovielist();
  }, []);
  return (
    <>
      <ToastContainer />
      <div
        className="movie_list flex flex-col gap-8 py-6 px-6"
        id="movie_list_box"
      >
        {/* Movie List Heading */}
        <div className="flex sm:flex-row flex-col items-center justify-between gap-1">
          <div className="flex flex-col gap-1">
            <div className="text-yellow-300 text-sm uppercase font-bold">
              Online Streaming
            </div>
            <div className="text-4xl text-white font-bold">Movies List</div>
          </div>
          <div className="flex gap-3 text-white text-2xl font-bold uppercase">
            Page {paginationnumber}
          </div>
        </div>
        <div className="flex flex-col gap-2 self-end">
          <label htmlFor="" className="text-md text-white">
            Search Movie
          </label>
          <input
            className={`px-2 py-4 border-t-0 border-l-0 border-r-0 border-b-2 text-gray-700 w-96 focus:outline-none`}
            placeholder="Search Movie" /* Add a space placeholder */
            onChange={(e) => filtermovies(e)}
          />
        </div>
        {!loadermovielist ? (
          <>
            {filtermovieslist.length > 0 ? (
              <>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                  {filtermovieslist.map((element) => {
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
              </>
            ) : (
              <>
                {filtermovieresponse ? (
                  <>
                    <div className="text-white text-2xl text-center">
                      {filtermovieresponse}{" "}
                      <span className="text-yellow-300">
                        {paginationnumber}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {movieslatest.length > 0 && (
                      <>
                        <div className="flex flex-col gap-4">
                          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                            {movieslatest.map((element) => {
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
                          {/* pagination box */}
                          <div className="flex gap-5 flex-col">
                            <div className="text-white text-2xl">
                              Pagination
                            </div>
                            <div className="flex gap-3 sm:flex-row flex-col">
                              {paginationlength.map((pag_num) => {
                                return (
                                  <>
                                    <button
                                      className={`px-6 py-3 uppercase font-bold self-start ${
                                        pag_num === paginationnumber
                                          ? "bg-yellow-300 text-black"
                                          : "text-white bg-black"
                                      } border-2 cursor-pointer border-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-colors duration-300`}
                                      onClick={() => PaginationNumber(pag_num)}
                                    >
                                      {pag_num}
                                    </button>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <div
            className="flex flex-row gap-3 justify-center"
            id="loadermovielist"
          >
            <div className="h-8 w-2 bg-white loader_animation_box1"></div>
            <div className="h-8 w-2 bg-white loader_animation_box2"></div>
            <div className="h-8 w-2 bg-white loader_animation_box3"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;
