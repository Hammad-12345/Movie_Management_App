const FavouriteMovieModel = require("../../model/FavouriteMovieModel/UserFavouriteMovieModel");
const favouritemovieuser = async(req,res) =>
{
    const {artworkUrl100,trackName,artistName,trackPrice,primaryGenreName,longDescription,previewUrl} = req.body.element
    const ID = req.body.ID
    try {
        const favourite = await new FavouriteMovieModel({
            ID,
            artworkUrl100,
            trackName,
            trackPrice,
            artistName,
            primaryGenreName,
            longDescription,
            previewUrl
          }).save();
          res.send({message:"Movie Successfully Send To Favourite Page",status:200})
    } catch (error) {
        res.send({
            error:error
        })
        console.log(error)
    }
}
const fetchfavouritemovieuser =async(req,res) =>
{
    const movieId = req.params.id; // Access the 'id' route parameter
    try {
        const movies = await FavouriteMovieModel.find({ ID:movieId });
        if(movies.length > 0)
        {
            res.send({movies:movies,status:200})
        }
        else 
        {
            res.send({message:"No Favourite Movies",status:404})
        }
        
    } catch (error) {
        res.send({error:error})
    }
}
module.exports = { favouritemovieuser,fetchfavouritemovieuser };