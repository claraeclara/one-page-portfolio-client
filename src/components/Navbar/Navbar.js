import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

import profileImg from '../../images/OnePageLogo.png';

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <Link to="/">
        <img
          className="logo-img"
          src={profileImg}
          alt="onePageLogo"
          width="50px"
        />
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}

      <div className="profile-img-wrapper">
        {user && (
          <Link to="/profile">
            <img className="profile-img" src={user.image} alt="profile" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
