import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import { useState } from 'react';

function PortfolioDetailsPage() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(`authToken`);
        const response = await axios.get(
          'http://localhost:5005/api/users/current',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const currentUser = response.data;
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
    <h1>Portfolio Details Page</h1>
      {user.portfolios &&
        user.portfolios.map((onePortfolio) => {
          return (
            <>
              <div className="zigZag">
                <Container fluid>
                  <Row>
                    <Col>{onePortfolio.name}</Col>
                  </Row>
                  <Row>
                    <Col>
                      Email:{onePortfolio.email} Phone:{onePortfolio.phone}{' '}
                      Website:{onePortfolio.website}
                    </Col>
                    <Col xs={5}></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <img src={onePortfolio.imageOne} width="100px"></img>
                    </Col>
                    <Col xs={6}>
                      {onePortfolio.titleOne}
                      <br></br>
                      {onePortfolio.descriptionOne}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      {onePortfolio.titleTwo}
                      <br></br>
                      {onePortfolio.descriptionTwo}
                    </Col>
                    <Col xs={6}>
                      <img src={onePortfolio.imageTwo} width="100px"></img>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <img src={onePortfolio.imageThree} width="100px"></img>
                    </Col>
                    <Col xs={6}>
                      {onePortfolio.titleThree}
                      <br></br>
                      {onePortfolio.descriptionThree}
                    </Col>
                  </Row>
                </Container>
              </div>
            </>
          );
        })}

      <div className="inLine">
        <Container fluid>
          <Row>
            <Col>Full Name</Col>
          </Row>
          <Row>
            <Col>Email:</Col>
            <Col>Phone:</Col>
            <Col>Website:</Col>
          </Row>
          <Row>
            <Col>Title</Col>
          </Row>
          <Row>
            <Col>Image</Col>
          </Row>
          <Row>
            <Col>Description</Col>
          </Row>
          <Row>
            <Col>Title</Col>
          </Row>
          <Row>
            <Col>Image</Col>
          </Row>
          <Row>
            <Col>Description</Col>
          </Row>
        </Container>
      </div>

      <div className="stripes">
        <Container fluid>
          <Row>
            <Col>Full Name</Col>
          </Row>
          <Row>
            <Col>Email:</Col>
            <Col>Phone:</Col>
            <Col>Website:</Col>
          </Row>
          <Row>
            <Col>Title</Col>
            <Col>Title</Col>
            <Col>Title</Col>
          </Row>
          <Row>
            <Col>Image</Col>
            <Col>Image</Col>
            <Col>Image</Col>
          </Row>
          <Row>
            <Col>Description</Col>
            <Col>Description</Col>
            <Col>Description</Col>
          </Row>
        </Container>
      </div>

      <button>Download Portfolio</button>

      <Link to="/edit-portfolio/">
        {/* Update to /:portfolioId */}
        <button>Edit Portfolio</button>
      </Link>
    </div>
  );
}

export default PortfolioDetailsPage;
