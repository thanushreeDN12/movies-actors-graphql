import { gql } from '@apollo/client';

//creating a query
const GET_MOVIES_QUERY = gql` 
    {
        movies{
            name 
            genre
            id
        }
    }
`// back ticks


const GET_ACTORS_QUERY= gql`
    {
    actors{
        name
        id
    }
    }
`

// query variables inside mutation()
const ADD_MOVIE_MUTATION = gql`
   mutation($name:String!, $genre:String!, $actorName: String!){
      addMovie(name:$name, genre:$genre, actorName:$actorName){
         name
         id
      }
   }
`      

const GET_MOVIE_QUERY = gql`
    query($id: ID!){
        movie(id: $id){
            id
            name
            genre
            actor{
                id
                name
                movies{
                    name
                    genre
                    id
                }
            }
        }
    }
`
export { GET_ACTORS_QUERY, GET_MOVIES_QUERY, ADD_MOVIE_MUTATION, GET_MOVIE_QUERY}