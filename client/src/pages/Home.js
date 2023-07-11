import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_SHOES } from '../utils/queries';
import { LIKE_SHOE } from '../utils/mutations';

import Auth from '../utils/auth';

const getLikedShoes = () => {
  const token = Auth.getToken();

  // Check if the user is logged in
  if (!Auth.loggedIn() || !token) {
    return []; 
  }

  try {
    const likedShoesStr = localStorage.getItem('likedShoes');

    if (likedShoesStr) {
      const likedShoes = JSON.parse(likedShoesStr);
      return likedShoes;
    } else {
      return []; 
    }
  } catch (err) {
    console.error('Error retrieving liked shoes:', err);
    return []; 
  }
};

const Home = () => {
  const { loading, data } = useQuery(QUERY_SHOES);
  const [likeShoe] = useMutation(LIKE_SHOE);
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
  const [filteredShoes, setFilteredShoes] = useState([]);

  useEffect(() => {
    if (!loading && data && data.shoes) {
      // Filter out already liked shoes
      const likedShoes = getLikedShoes();
      const filteredShoes = data.shoes.filter((shoe) => !likedShoes.includes(shoe._id));
      setFilteredShoes(filteredShoes);
    }
  }, [loading, data]);

  const handleLikeShoe = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token || !data || !data.shoes || data.shoes.length === 0) {
      return false;
    }

    try {
      const currentShoe = filteredShoes[currentShoeIndex];
      await likeShoe({
        variables: {
          input: {
            _id: currentShoe._id,
            shoeName: currentShoe.shoeName,
            price: currentShoe.price,
            image: currentShoe.image,
          },
        },
        refetchQueries: [{ query: QUERY_SHOES }],
      });

    const likedShoes = getLikedShoes();
    likedShoes.push(currentShoe._id);
    localStorage.setItem('likedShoes', JSON.stringify(likedShoes));

    setCurrentShoeIndex((prevIndex) => prevIndex + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkipShoe = () => {
    setCurrentShoeIndex((prevIndex) => prevIndex + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // If there are no more available shoes to rate, render this message
  if (currentShoeIndex >= filteredShoes.length) {
    return <h2>No more shoes to rate!</h2>;
  }

  const currentShoe = filteredShoes[currentShoeIndex];

  return (
    <main>
      <div>
        <h1>Discover Your Sole Mate: Explore Sole Search's Diverse Shoe Collection!</h1>
        <div className="card">
          <div key={currentShoe._id}>
            <img className="ImageSize" src={(`../images/${currentShoe.image}`)} alt={currentShoe.shoeName} />
            <div className="text-wrapper">
              <h2>{currentShoe.shoeName}</h2>
              <p className="Price">Price: ${currentShoe.price}</p>
            </div>
            <div className="button-wrapper">
              <button className="Hate" onClick={handleSkipShoe}>👎</button>
              <button className="Love" onClick={handleLikeShoe}>👍</button>
              <div className="button-spacing"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;