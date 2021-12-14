import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ProfilePage() {
  //const { user } = useContext(AuthContext);

  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(`authToken`);
        const response = await axios.get(`${SERVER_URL}/api/users/current`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const currentUser = response.data;
        console.log('currentUser', currentUser);

        setUser(currentUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {user && user.portfolios.length !== 0 ? (
        <div className="ProfilePage">
          <div>
            {user && (
              <>
                <h2>Hello {user.name}!</h2>
                <Link to="/profile/edit/">
                  <button className="editProfileBtn">Edit Profile</button>
                </Link>
              </>
            )}
          </div>

          <div>
            <h3>Portfolios</h3>

            {user.portfolios &&
              user.portfolios.map((onePortfolio) => {
                return (
                  <>
                    <Link to={`/portfolio/${onePortfolio._id}`}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={onePortfolio.imageOne} />
                        <ListGroup className="list-group-flush">
                          <ListGroupItem>{onePortfolio.titleOne}</ListGroupItem>
                          <ListGroupItem>{onePortfolio.titleTwo}</ListGroupItem>
                          <ListGroupItem>
                            {onePortfolio.titleThree}
                          </ListGroupItem>
                        </ListGroup>
                      </Card>
                    </Link>
                  </>
                );
              })}
            <Link to="/portfolio/add">
              <button>Create Portfolio</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p>
              {' '}
              You don't have portfolios.
              <br></br>What about creating one?
            </p>
            <Link to="/portfolio/add">
              <button>Create Portfolio</button>
            </Link>
          </div>
          <div>
            <p>
              {' '}
              And if you need inspiration,
              <br></br>get some amazing references!
            </p>

            <Link to="/searchDesign">
              <button>Get Inspired</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default ProfilePage;
