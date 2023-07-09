import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SHOES } from '../utils/queries';


const MyProfile = () => {
    const { loading, data } = useQuery(QUERY_SHOES);

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
      <div>
        <h1>Sole Survivor page</h1>
        {top5Shoes.map((shoe) => (
          <div key={shoe._id}>
            <h2>{shoe.shoeName}</h2>
            <img src={`/images/${shoe.image}`} alt={shoe.shoeName} />
            <p>Likes: {shoe.likeCount}</p>
          </div>
        ))}
      </div>
    </main>
  );
};


export default MyProfile;