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

function PortfolioDetailsPage() {
  //const [user, setUser] = useState('');
  const [portfolio, setPortfolio] = useState(null);

  const { user } = useContext(AuthContext);

  const { portfolioId } = useParams();

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get(
          `http://localhost:5005/api/portfolios/${portfolioId}`,
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

  return portfolio ? (
    <div>
      <div className="zigZag">
        <Card style={{ width: '21rem' }}>
          <Container fluid>
            <Row>
              <Col>{portfolio.name}</Col>
            </Row>
            <Row>
              <Col>
                Email:{portfolio.email} Phone:{portfolio.phone} Website:
                {portfolio.website}
              </Col>
              <Col xs={5}></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col xs={6}>
                <img src={portfolio.imageOne} width="100px" height="80px"></img>
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
                <img src={portfolio.imageTwo} width="100px" height="80px"></img>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <img
                  src={portfolio.imageThree}
                  width="100px"
                  height="80px"
                ></img>
              </Col>
              <Col xs={6}>
                {portfolio.titleThree}
                <br></br>
                {portfolio.descriptionThree}
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
      {/* {user.portfolios &&
        user.portfolios.map((onePortfolio) => {
          return (
            <>
              
            </>
          );
        })} */}
      <div>
        <button>Download Portfolio</button>
        <Link to="/edit-portfolio/">
          {/* Update to /:portfolioId */}
          <button>Edit Portfolio</button>
          <button>Delete Portfolio</button>
        </Link>
      </div>

      <div className="inLine">
        <Card style={{ width: '21rem' }}>
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
        </Card>
      </div>

      <div className="stripes">
        <Card style={{ width: '21rem' }}>
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
        </Card>
      </div>
    </div>
  ) : (
    <>
      <p> nao tem</p>
    </>
  );
}

export default PortfolioDetailsPage;
