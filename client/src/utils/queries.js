import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      shoes {
        _id
        shoeName
        price
        image

      }
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      shoes {
        _id
        shoeName
        price
        image

    }
  }
`;

export const QUERY_SHOES = gql`
  query getShoes {
    shoes {
      _id
      shoeName
      price
      image
      likeCount
      likes {
        _id
        username
      }
    }
  }
`;
