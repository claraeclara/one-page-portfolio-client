import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div>
      <h1>Home Page</h1>

      <img src="screen2.jpeg" alt="creative" height="200px" />

      <h2>How creative can you be in one page?</h2>

      <img src="screen.jpeg" alt="creative" height="200px" />
      <br></br>
      {isLoggedIn && (
        <>
          <Link to="/searchDesign">
            <button>Get Inspired</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default HomePage;
