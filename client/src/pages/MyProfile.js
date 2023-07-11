import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { REMOVE_SHOE } from '../utils/mutations';
import Auth from '../utils/auth';

const MyProfile = () => {

  const { username } = Auth.getProfile().data;

  const { loading, data } = useQuery(QUERY_USER, {
      variables: { username }, 
      fetchPolicy: 'network-only',
    });

  const userData = data?.user || [];
  const [removeShoe] = useMutation(REMOVE_SHOE);

  const getLikedShoes = () => {
    const token = Auth.getToken();
  
    // Check if the user is logged in
    if (!Auth.loggedIn() || !token) {
      return []; 
    }
  
    try {
      // Retrieve the liked shoes from localStorage 
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
 
  const handleDeleteShoe = async (shoeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log("delete")
    if (!token) {
      return false;
    }

    try {
      await removeShoe({
        variables: { shoeId: shoeId },
      });

      const likedShoes = getLikedShoes();
      const updatedLikedShoes = likedShoes.filter((id) => id !== shoeId);
      localStorage.setItem('likedShoes', JSON.stringify(updatedLikedShoes));

    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <main>
      <div>
          <h1>Viewing saved shoes!</h1>
      </div>
        <h2>
          {userData.shoes.length
            ? `Viewing ${userData.shoes.length} saved ${userData.shoes.length === 1 ? 'shoe' : 'shoes'}:`
            : 'You have no saved shoes!'}
        </h2>
       
        {userData.shoes.map((shoe) => (
          <div key={shoe._id}>
            <h2>{shoe.shoeName}</h2>
            <img src={`/images/${shoe.image}`} alt={shoe.shoeName} />
            <button className='RemoveShoe' onClick={() => handleDeleteShoe(shoe._id)}>Remove Shoe</button>
            <a href={shoe.shoeLink} target="_blank" rel="noopener noreferrer">
                <button className='BuyShoe'>Buy Shoe</button>
            </a>
          </div>
        ))}
    </main>
  );
};

export default MyProfile;