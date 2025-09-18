import { useState } from "react";
import '../styles/AddMovie.css'
import { useQuery, useMutation} from "@apollo/client/react";
import { GET_ACTORS_QUERY,GET_MOVIES_QUERY, ADD_MOVIE_MUTATION } from '../queries/queries';

const AddMovie = () => {
   const [name, setName]= useState("");
   const [genre, setGenre]= useState("");
   const [actorName, setActorName] = useState("");
   

   //useMutation returns a mutate function that you call to trigger the mutation. 
   // You can pass variables or data to this function, which will then be available within your mutation function.
   const [addMovie]= useMutation(ADD_MOVIE_MUTATION);
   
   const {loading, data, error}= useQuery(GET_ACTORS_QUERY);

   
   // display directors in options
   const renderActors= ()=>{
        if(loading) return <option disabled>Loading...</option>
        if(error) return <option disabled>Something went wrong</option>
        return data.actors.map( actor =>{
            return <option key= {actor.id} value={actor.name}> {actor.name} </option>
         })
   }

   // handles when form is submitted
   const handleSubmit= (e)=>{
      e.preventDefault();
      if (name && genre && actorName) {
         addMovie({
            variables: {
               name,
               genre,
               actorName
            },
            refetchQueries: [{ query: GET_MOVIES_QUERY }] //rerun query when this happens
         })
         //console.log(name, genre, actorName);
      } else {
         alert('You can not add empty form')
      }
   }

  return (
    <form className="offset-md-9 offset-sm-6 col-sm-6 col-md-3 bg-white p-3 fixed-bottom" id="add-movie" onSubmit={handleSubmit} >
        {/* name field */}
         <div className="form-group">
            <label htmlFor="movie-name">Movie Name:</label>
            <input className="form-control mt-1" id="movie-name" name="movie-name" type="text" onChange={(e)=>{setName(e.target.value)}}/>
         </div>

         {/* genre field */}
         <div className="form-group mt-2">
            <label htmlFor="genre">Genre:</label>
            <input className="form-control mt-1" id="genre" name="genre" type="text"  onChange={(e)=>{setGenre(e.target.value)}} />
         </div>

         {/* director field */}
         <div className="d-flex flex-column mt-2">
            <label htmlFor="actor"> Actor: </label>
            <select className="custom-select py-2" id="actor" name="actor"  onChange={(e)=>{setActorName(e.target.value)}}>
               <option>Select an Actor</option>
               {renderActors()}
            </select>
         </div>

         {/* submit button */}
         <div className="d-flex form-group mt-3 justify-content-center">
            <button className="btn btn-primary px-4" type="submit" >Add New Movie</button>
         </div>
      </form >
  )
}

export default AddMovie;
