import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_SHOES } from '../utils/queries';
import { LIKE_SHOE } from '../utils/mutations';

import Auth from '../utils/auth';


const Home = () => {
  const { loading, data } = useQuery(QUERY_SHOES);
  const [likeShoe] = useMutation(LIKE_SHOE);

  // Keeps track of the index of the shoe we want to display on the page
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);


  // Handle Like Shoe
  const handleLikeShoe = async (shoeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await likeShoe({
        variables: { shoeId: shoeId },
        refetchQueries: [{ query: QUERY_SHOES }],
      });

      setCurrentShoeIndex((prevIndex) => prevIndex + 1);
    } catch (err) {
      console.error(err);
    }
  };


  // Handle Skip Shoe
  const handleSkipShoe = () => {
    setCurrentShoeIndex((prevIndex) => prevIndex + 1);
  };


  if (loading) {
    return <div>Loading...</div>;
  }


  const { shoes } = data;

  // If there are no more shoes to rate, render this message
  if (currentShoeIndex >= shoes.length) {
    return <h2>No more shoes to rate!</h2>;
  }

  const currentShoe = shoes[currentShoeIndex];


  return (
    <main>
      <div>
        <h1>Rate Your Shoes and Share Your Sole Experience!</h1>
        <div className="card">
          <div key={currentShoe._id}>
            <img className='ImageSize' src={(`../images/${currentShoe.image}`)} alt={currentShoe.shoeName} />
            <div className="text-wrapper">
              <h2>{currentShoe.shoeName}</h2>
              <p>Price: ${currentShoe.price}</p>
            </div>
            <div className="button-wrapper">
              <button onClick={() => handleLikeShoe(currentShoe._id)}>Like</button>
              <div className="button-spacing"></div>
              <button onClick={handleSkipShoe}>Skip</button>
            </div>
          </div>
        </div>
    </div>
    </main >
  );
};

export default Home;

