import { Link } from 'react-router-dom';

import logoImg from './../../images/OnePageLogo.png';

function ErrorPage() {
  return (
    <div>
      <h3>
        Sorry! There is nothing here.
        <br></br>
        Try our Home Page
      </h3>
      <Link to="/">
        <img
          className="logo-img"
          src={logoImg}
          alt="onePageLogo"
          width="100px"
        />
      </Link>
    </div>
  );
}

export default ErrorPage;
