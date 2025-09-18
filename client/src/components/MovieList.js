
import { useQuery } from "@apollo/client/react";
import { GET_MOVIES_QUERY } from '../queries/queries';
import MovieDetails from "./MovieDetails";
import { useState } from "react";
import '../styles/MovieList.css'



function MovieList() {
  // to track id of clicked li then send it to movieDeatils as props
      const [selectedMovie, setSelectedMovie] = useState(null)

    //binding component with query
    //querying using useQuery() hook
    const {loading, data, error} = useQuery(GET_MOVIES_QUERY)
    if(loading) return <p>Loading...</p>
    if(error) return <p>error.message</p>
    
    //console.log(data)
    //querying to /graphql and passing query 
    // then server will pass data so logging to console

    const renderMovies = () => {
        return(
            data.movies.map( movie=> {
              const isActive = movie.id === selectedMovie;
                return(
                    <li className="{`list-inline-item ${isActive ? 'active' : ''}`}"  key= {movie.id} onClick={()=>{setSelectedMovie(movie.id)}}><b>{ movie.name }</b></li>
                )
            })
        )
    }

  return (
    <div className="movie-list-container">
      <ul className="list-inline"> {renderMovies()} </ul>
      <br />
      <MovieDetails selectedMovie={selectedMovie} />
    </div>
  );
}

export default MovieList;

// need to use apollo client to make queries from frontend(react) to graphql

// make queries from react much like what we didi in graphiql
//then feed it to apollo then send it to graphql server
//then server feeds data back to apollo then apollo sends data to frontend