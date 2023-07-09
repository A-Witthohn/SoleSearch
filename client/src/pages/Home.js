import React from 'react';
import { useQuery } from '@apollo/client';
import  { useMutation } from '@apollo/client';
import { QUERY_SHOES } from '../utils/queries';
import { LIKE_SHOE } from '../utils/mutations';
import { REMOVE_SHOE } from '../utils/mutations';

import Auth from '../utils/auth';


const Home = () => {
const { loading, data } = useQuery(QUERY_SHOES);
const [likeShoe] = useMutation(LIKE_SHOE);
const [removeShoe] = useMutation(REMOVE_SHOE);

const handleLikeShoe = async (shoeId) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  try {
    await likeShoe({
      variables: { shoeId: shoeId },
    });
  } catch (err) {
    console.error(err);
  }
};

const handleRemoveShoe = async (shoeId) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  
  if (!token) {
    return false;
  }

  try {
    await removeShoe({
      variables: { shoeId: shoeId },
    });
  } catch (err) {
    console.error(err);
  }
};

if (loading) {
  return <div>Loading...</div>;
}

const { shoes } = data;

    return (
      <main>
        <div>
         <h1>Rate Your Shoes and Share Your Sole Experience!</h1>
         {shoes.map((shoe) => (
            <div key={shoe._id}>
              <h2>{shoe.shoeName}</h2>
              <img src={(`../images/${shoe.image}`).default} alt={shoe.shoeName} />
              <button onClick={() => handleLikeShoe(shoe._id)}>Like</button>
              <button onClick={() => handleRemoveShoe(shoe._id)}>Remove</button>
              <p>Likes: {shoe.likeCount}</p>
        </div>
      ))}
        </div>
      </main>
    );
  };

export default Home;

