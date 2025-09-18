const graphql = require('graphql')
const { GraphQLObjectType,GraphQLNonNull, GraphQLString,GraphQLInt,GraphQLID,GraphQLList, GraphQLSchema} = graphql
// const _ = require('lodash')
const Movie = require('../models/movie') //now Movie is a collection
const Actor = require('../models/actor')// Actor is a collection


//dummy data
// const  movies = [
//     {name:'mone', genre:'action', id:'1',actorName:"A1" },
//     {name:'mtwo', genre:'fantasy', id:'2',actorName:"A2" },
//     {name:'mthree', genre:'comedy', id:'3',actorName:"A3"}
// ]
// const directors=[
//     {name:'d1', id:"1"},
//     {name:'d2', id:'2'},
//     {name:'d3', id:'3'}
// ]

//this is a graphql object, in which type we send data to queries 
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: ()=> ({ //wrapping into a function to overcome reference errors
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        actorName:{type: GraphQLString},
        actor: {
            type: ActorType,
            resolve(parent, args){// when director is asked inside movie then resolve is called
                //console.log(parent)
                //return _.find(directors, {id: parent.directorid})//parent is whole movie(id:) object
                return Actor.findOne({name: parent.actorName})
            }
        }
    })
})

const ActorType = new GraphQLObjectType({
    name: "Actor",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        movies: {
            type: new GraphQLList(MovieType),//director has list of movies
            resolve(parent, args){
                //return _.filter(movies, {directorid: parent.id} )
                return Movie.find({actorName: parent.name})
            }}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () =>({

        movie: { // movie refers to movietype
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //get data from database
                //console.log(typeof args.id)
                //return _.find(movies, {id: args.id}) 
                return Movie.findById(args.id)
            }
        },

        actor: {
            type: ActorType,
            args: {name: {type: GraphQLString}},
            resolve(parent, args){
                //return _.find(directors, {id: args.id}) //take directorid from parent(movie) then find name im that id in directors
                return Actor.findById(args.id)
            }
        },

        movies:{// when we want all movies without id (a list )
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                //return all movies
                return Movie.find({})
            }
            //query example
              //asking director of all movies          
              //{ movies{ name genre director{name age}}
        },

        actors: {// when all directors is queried
            type: new GraphQLList(ActorType),
            resolve(parent, args){
                //return all directors
                return Actor.find({})
            }
            //asking movies list of directors { directors{ name movies{ name }}}
        }
    })
})

//mutation object
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addActor:{
            type: ActorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                //take data n save in db
                let newActor = new Actor({name: args.name})
                return newActor.save() //Director is a collection
            }
        },
        addMovie:{
            type: MovieType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type:new GraphQLNonNull(GraphQLString) },
                actorName: {type:new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                //take data n save in db
                let newMovie = new Movie({name: args.name, genre: args.genre, actorName: args.actorName})
                return newMovie.save()// returning what this statement gives
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery, //initial point for query
    mutation: Mutation //in grphiql mutation{addDirector(name:'d1',age:21){name age}}
})


// # query for movie
// # {
// #   movie(id:"68c2bdae66e9f6683b58442f"){
// #     name
// #     genre
// #     directorId
// #     director{
// #       name
// #      
// #     }
// # }
// # }
// # query for director
// # {
// #   director(id:"68c2b62b7da707f6c0892c98"){
// #     name
// #     
// #     movies{
// #       name
// #     }
// #   }
// # }