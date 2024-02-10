import mongoose from "mongoose";
import prompt from "prompt-sync";
import { movieModel } from "./create-database.js";

const user = prompt();

console.log("Menu")
console.log("1. View all movies")
console.log("2. Add a new movie")
console.log("3. Update a movie")
console.log("4. Delete a movie")
console.log("5. Exit")

let runApp = true;

while(runApp){
    let input = user("Choose a number between 1-5: ") 
    if(input == 1){
        console.log("Here is a list of all movies")
        const showMovies = await movieModel.find({})
        console.log(showMovies)
    }
    else if(input == 2){
        console.log("Add a new movie")

        const addMovie = {
            title: user("Enter a title: "),
            director: user("Enter the director: "),
            releaseYear: Number(user("Enter the release year: ")),
            genres: user("Enter genres: ").split(","),
            ratings: user("Enter ratings: ").split(",").map(Number),
            cast: user("Enter the release year: ").split(","),
        };

        await movieModel.create(addMovie);
        console.log("Movie has been added")
    }
    else if(input == 3){
        console.log("Update a movie")
        const orgTitle = user("Enter title of the movie you want to update: ");
        const newTitle = user("Enter a new title: ");
        const newRating = user("Enter ratings: ").split(",").map(Number);

        await movieModel.updateOne(
            { title: orgTitle }, { $set: { title: newTitle, ratings: newRating, }} 
        )
    }
    else if(input == 4){
        const deleteMovie = user("Enter the title for a movie to delete a movie: ")
        await movieModel.deleteOne({ title: deleteMovie });
        console.log("Movies has been deleted")
    }
    else if(input == 5){
        runApp = false;
    }
    else{
        console.log("Please choose a number between 1-5!")
    }
}

await mongoose.connection.close();