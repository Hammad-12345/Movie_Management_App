import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import Home from "./Pages/Home";
import Movie from "./Pages/Movie";
import DetailPage from "./Pages/DetailPage";
import { useSelector } from "react-redux";
import MyFavouritePage from "./Pages/MyFavouritePage";
function App() {
  const AuthRoutes = useSelector((state) => state.Routes.AuthRoutes);
  console.log(AuthRoutes)
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          {!AuthRoutes ? (
            <>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<Home />}></Route>
            </>
          ):<Route path="/FavouriteMovies" element={<MyFavouritePage />}></Route>}

          {/* Pages Routes */}

          <Route path="/" element={<Home />}></Route>
          <Route path="/Movies" element={<Movie />}></Route>
          <Route path="/MovieDetail" element={<DetailPage />}></Route>
          {/* <Route path="/FavouriteMovies" element={<MyFavouritePage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
