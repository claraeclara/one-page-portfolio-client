import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function PortfolioDetailsPage() {
  //const [user, setUser] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const { user } = useContext(AuthContext);

  const { portfolioId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get(
          `${SERVER_URL}/api/portfolios/${portfolioId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const onePortfolio = response.data;

        setPortfolio(onePortfolio);
      } catch (error) {
        console.log(error);
      }
    };
    getPortfolio();
  }, []);

  const deletePortfolio = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await axios.delete(
        `${SERVER_URL}/api/portfolios/${portfolio._id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return portfolio && portfolio.template === 'zigZag' ? (
    <div>
      <div className="zigZag">
        <Card style={{ width: '21rem' }}>
          <Container fluid>
            <div className="portfolioContact">
              <Row className="portfolioFullName">
                <Col>{portfolio.name}</Col>
              </Row>
              <Row>
                <Col xs={10}>
                  Email | {portfolio.email}
                </Col>
                <Col xs={10}>
                Phone | {portfolio.phone}
                </Col>
                <Col xs={10}>
                Website | {portfolio.website}
                </Col>

                <Col xs={5}></Col>
                <Col></Col>
              </Row>
            </div>
            <div className="portfolioJobs">
              <Row>
                <Col xs={6}>
                  <img
                    src={portfolio.imageOne}
                    width="100px"
                    height="80px"
                    alt="img"
                  ></img>
                </Col>
                <Col xs={6}>
                  {portfolio.titleOne}
                  <br></br>
                  {portfolio.descriptionOne}
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  {portfolio.titleTwo}
                  <br></br>
                  {portfolio.descriptionTwo}
                </Col>
                <Col xs={6}>
                  <img
                    src={portfolio.imageTwo}
                    width="100px"
                    height="80px"
                    alt="img"
                  ></img>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <img
                    src={portfolio.imageThree}
                    width="100px"
                    height="80px"
                    alt="img"
                  ></img>
                </Col>
                <Col xs={6}>
                  {portfolio.titleThree}
                  <br></br>
                  {portfolio.descriptionThree}
                </Col>
              </Row>
            </div>
          </Container>
        </Card>
      </div>
      <div>
        <button>Download</button>
        <Link to={`/edit-portfolio/${portfolioId}`}>
          <button>Edit</button>
        </Link>

        <button
          onClick={(e) => {
            if (
              window.confirm('Are you sure you want to delete the Portfolio?')
            )
              deletePortfolio(e);
          }}
        >
          Delete
        </button>
        {/* <button onClick={deletePortfolio}>Delete</button> */}
      </div>
    </div>
  ) : (
    <>
      <div className="inLine">
        <Card style={{ width: '21rem' }}>
          <Container fluid>
            <div className="portfolioContact">
              <Row className="portfolioFullName">
                <Col>{portfolio.name}</Col>
              </Row>
              <Row>
                <Col>| Email | {portfolio.email}</Col>
                <Col>| Phone | {portfolio.phone}</Col>
                <Col>| Website | {portfolio.website}</Col>
              </Row>
            </div>
            <div className="portfolioJobs">
              <Row>
                <Col>{portfolio.titleOne}</Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src={portfolio.imageOne}
                    width="100px"
                    height="80px"
                    alt="img"
                  ></img>
                </Col>
              </Row>
              <Row>
                <Col>{portfolio.descriptionOne}</Col>
              </Row>
              <Row>
                <Col>{portfolio.titleTwo}</Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src={portfolio.imageTwo}
                    width="100px"
                    height="80px"
                    alt="img"
                  ></img>
                </Col>
              </Row>
              <Row>
                <Col>{portfolio.descriptionTwo}</Col>
              </Row>
              <Row>
                <Col>{portfolio.titleThree}</Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src={portfolio.imageThree}
                    width="100px"
                    height="80px"
                    alt="img"
                  ></img>
                </Col>
              </Row>
              <Row>
                <Col>{portfolio.descriptionThree}</Col>
              </Row>
            </div>
          </Container>
        </Card>
      </div>
      <div>
        <button>Download</button>
        <Link to={`/edit-portfolio/${portfolioId}`}>
          <button>Edit</button>
        </Link>
        <button onClick={deletePortfolio}>Delete</button>
      </div>
    </>
  );
}

export default PortfolioDetailsPage;
