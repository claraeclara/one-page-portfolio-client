import { Link } from 'react-router-dom';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import { useState } from 'react';

function ProfilePage() {
  const { user } = useContext(AuthContext);

  console.log('user :>> ', user);

  return (
    <div>
      <h1>Profile Page</h1>

      <div className="profile-img-wrapper">
        {user && (
          <Link to="/profile">
            <img className="profile-img" src={user.image} alt="profile" />
          </Link>
        )}
      </div>

      <Link to="/profile/edit/">
        <button>Edit Portfolio</button>
      </Link>

      <div>
        <h3>Portfolios</h3>
        {user &&
          user.portfolios.map((onePortfolio) => {
            return (
              <li key={onePortfolio._id}>
                <h3>{onePortfolio.titleOne}</h3>
                <h4>Description:</h4>
                <p>{onePortfolio.descriptionOne}</p>
              </li>
            );
          })}
        <Link to="/portfolio/add">
          <button>Create Portfolio</button>
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
