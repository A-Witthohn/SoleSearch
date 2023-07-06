const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    shoes: [Shoe]
  }

  type Shoe {
    _id: ID!
    shoeName: String!
    price: Float!
    likes: [User]
    image: String!
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
