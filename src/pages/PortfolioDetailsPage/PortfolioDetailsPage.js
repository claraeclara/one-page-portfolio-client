import { Link } from 'react-router-dom';

function PortfolioDetailsPage() {
  return (
    <div>
      <h1>Portfolio Details Page</h1>

      <Link to="/edit-portfolio/">
        <button>Edit Portfolio</button>
      </Link>

      <Link to="/edit-portfolio/">
        <button>Edit Portfolio</button>
      </Link>
    </div>
  );
}

export default PortfolioDetailsPage;
