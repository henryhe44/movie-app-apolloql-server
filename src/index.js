require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const MovieAPI = require("./datasources/movie");

const typeDefs = gql`
  type Query {
    movie(id: ID!): Movie
  }

  type Movie {
    adult: Boolean
    backdrop_path: String
    budget: Int
    genre: Genre
    homepage: String
    id: ID!
    imdb_id: String
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    revenue: Int
    runtime: Int
    status: String
    tagline: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
  }

  type Genre {
    id: ID!
    name: String
  }
`;

const dataSources = () => ({
  movieAPI: new MovieAPI()
});
const resolvers = {
  Query: {
    movie: (_, { id }, { dataSources }) => dataSources.movieAPI.getMovie({ id })
  }
};

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});