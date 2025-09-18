const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require("./schema/schema")
const cors= require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express();
app.use(cors())// to make request from other servers


//connecting to database
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_URL)
mongoose.connection.once('open', ()=> {
    console.log('connection to mongodb database is successful')
})

//middleware
app.use('/graphql', graphqlHTTP({ //  /graphql from frontend to pass query inorder to get back data
    schema, // schema: schema es6
    graphiql: true // to use graphiql when we goto /graphql
    
}))

app.listen(5000, ()=>{
    console.log("server is running on port 5000");
})