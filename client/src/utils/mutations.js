import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LIKE_SHOE = gql`
  mutation likeShoe($input: likedShoes!) {
    likeShoe(input: $input) {
      _id
  }
}
`;

export const REMOVE_SHOE = gql`
  mutation removeShoe($shoeId: ID!) {
    removeShoe(shoeId: $shoeId) {
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

