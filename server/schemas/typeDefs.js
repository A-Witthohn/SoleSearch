const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    shoes: [Shoe]
  }

  type likeSchemaInput {
    _id: ID!
    userId: ID!
    username: String
  }

  type Shoe {
    _id: ID!
    shoeName: String!
    price: Float!
    likes: [likeSchemaInput]
    image: String!
    likeCount: Int
  }

  input likedShoes {
    _id: ID!
    shoeName: String!
    price: Float!
    image: String!
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    shoes: [Shoe]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    likeShoe(input: likedShoes!): User
    removeShoe(shoeId: ID!): User
  }
`;

module.exports = typeDefs;
