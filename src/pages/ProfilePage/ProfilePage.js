import { Link } from 'react-router-dom';

function ProfilePage() {
  return (
    <div>
      <h1>Profile Page</h1>
      <Link to="/portfolio/add">
        <button>Create Portfolio</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
