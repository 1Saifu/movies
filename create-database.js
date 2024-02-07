import mongoose, {connect} from "mongoose";

const con = await connect("mongodb://127.0.0.1:27017/movies-saifu-js");

const {db} = await mongoose.connection;

const movieCol = await db.collection("movies")

const movieSchema = mongoose.Schema(
    {
        title: String,
        director: String,
        releaseYear: Number,
        genres: [String],
        ratings: [Number],
        cast: [String],
    }
)

const movieModel = mongoose.model("movies", movieSchema);