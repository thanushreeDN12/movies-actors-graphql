import { useQuery } from '@apollo/client/react'
import { GET_MOVIE_QUERY } from '../queries/queries'
import '../styles/MovieDetails.css'

const MovieDetails = ({selectedMovie}) => {
    console.log(selectedMovie)
    const {loading, data, error} = useQuery(GET_MOVIE_QUERY, {
        skip: !selectedMovie,
        variables:{ id: selectedMovie } //passing argument to query
    })
    if (loading) return <div>Loading...</div>;
   if (error) return <div>Something went Wrong! <b /> {error.message}</div>;
    // if(data) console.log({data})  
    const renderMovieDetails=()=>{
        const {movie} = data || {}
        if(movie) {
            return(
                <div>
                    <h2><b>Movie Name: </b>{movie.name}</h2>
                    <p><b>Movie Genre: </b>{movie.genre}</p>
                    <p><b>Acted by: </b> {movie.actor.name}</p>
                    <p><b>All movies acted by {movie.actor.name}</b></p>
                    <ul>
                        {movie.actor.movies.map(item =>{
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        }else{
            return <div><h4>please select a movie to see more.</h4></div>
        }
    }

  return (
    <div  className="movie-details-container"> 
      {renderMovieDetails()}
    </div>
  )
}

export default MovieDetails
