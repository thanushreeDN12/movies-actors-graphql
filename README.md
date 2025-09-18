🎬 Movies & Actors WatchList Using GraphQL GraphQL.

The Movies & Actors GraphQL Project is a demo application that explores how to use GraphQL to interact with structured data involving movies, actors, and their relationships. This project focuses on consuming a GraphQL endpoint — showcasing how to write complex queries, mutations, and display data in a meaningful way.

📌 Features

GraphQL schema with queries and mutations for:

Movies

Actors

Relationships between movies and actors

Add, update, delete movies and actors

Query actors by movie and vice versa

Modular and scalable project structure

Built with Node.js
, GraphQL
, and Express.js
 (or your stack)

🧱 Tech Stack

GraphQL – Query language for APIs

Node.js + Express – Server environment

Apollo Server / express-graphql – GraphQL server integration

MongoDB / PostgreSQL / other DB – Data storage (choose one)

Mongoose / Sequelize / Prisma – ORM (based on DB)

🚀 Getting Started
🔧 Prerequisites

Node.js >= v14

npm or yarn

MongoDB / PostgreSQL running locally or in the cloud

📥 Installation
git clone https://github.com/your-username/movies-actors-graphql.git
cd movies-actors-graphql
npm install

⚙️ Configuration

Create a .env file in the root directory:

PORT=4000
DB_URI=mongodb://localhost:27017/moviesdb


(Adjust based on your DB setup)

▶️ Run the Server
npm start


Server will start at http://localhost:4000/graphql

🧪 Example Queries
🔍 Get All Movies
query {
  movies {
    id
    title
    releaseYear
    actors {
      name
    }
  }
}

🎭 Get Actor by ID
query {
  actor(id: "123") {
    name
    age
    movies {
      title
    }
  }
}

➕ Add a Movie
mutation {
  addMovie(title: "Inception", releaseYear: 2010) {
    id
    title
  }
}
