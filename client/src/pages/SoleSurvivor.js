import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SHOES } from '../utils/queries';


const SoleSurvivor = () => {
  const { loading, data } = useQuery(QUERY_SHOES, {
    fetchPolicy: 'no-cache',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const { shoes } = data;

  // Sort the shoes array based on the likeCount in descending order
  const sortedShoes = [...shoes].sort((a, b) => b.likeCount - a.likeCount);

  // Get the top 5 shoes with the most likes
  const top5Shoes = sortedShoes.slice(0, 5);

  return (
    <main>
      <h1>Unforgettable Soles: Celebrating Sole Search's Timeless Icons!</h1>
      {top5Shoes.map((shoe, index) => (
        <div className="card-item" key={shoe._id}>
          <div className="card">
          <h2>{`${index + 1}. ${shoe.shoeName}`}</h2>
          <p className='like-count'>All-Time Likes: <span className='SoleSurvivorLike'> {shoe.likeCount}</span></p>
            <img src={`/images/${shoe.image}`} alt={shoe.shoeName} />
            <a href={shoe.shoeLink} target="_blank" rel="noopener noreferrer">
                <button className='BuyShoe'>Buy Shoe</button>
            </a>
          </div>
        </div>
      ))}
    </main>
  );
};


export default SoleSurvivor;