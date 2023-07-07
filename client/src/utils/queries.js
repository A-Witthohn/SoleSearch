import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      shoes {
        _id
        shoeName
        price
        image
        likes {
            _id
            username
          }
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      shoes {
        _id
        shoeName
        price
        image
        likes{
            _id
            username
          }
    }
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
      likes{
          _id
          username
        }
  }
}
`;