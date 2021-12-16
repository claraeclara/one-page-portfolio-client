import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

function SearchPage() {
  const API_URL =
    'https://collectionapi.metmuseum.org/public/collection/v1/objects';
  const [art, setArt] = useState([]);
  const [allArt, setAllArt] = useState(' ');
  const [objectIDs, setOjbjectsIDs] = useState(46);
  const [interval, setInterval] = useState([
    444, 555, 666, 888, 999, 46, 333, 2321, 900, 1000, 2000, 5000, 6000,
  ]);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newArr = await Promise.all(
          interval.map(async (artPiece) => {
            return await axios.get(`${API_URL}/${artPiece}`);
          })
        );

        const cleanArr = newArr.map((el) => el.data);

        // , {
        //   params: {
        //     _limit: 10,
        //   },
        // });
        setResults(cleanArr);
        setFilteredResults(cleanArr);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const searchArt = (char) => {
    let filteredArt;
    filteredArt = results.filter((oneArt) => {
      return oneArt.title.toLowerCase().includes(char.toLowerCase());
    });

    setFilteredResults(filteredArt);
  };

  const handleSearch = (event) => {
    searchArt(event.target.value);
  };

  return (
    <>
      <div>
        <div>
          <br />
          <input
            value={undefined}
            type="text"
            onChange={handleSearch}
            placeholder="Search for inspiration"
          />
          <br />
        </div>
        {filteredResults.length &&
          filteredResults.map((oneArt) => {
            return (
              <>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={oneArt.primaryImage} />
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{oneArt.title}</ListGroupItem>
                  </ListGroup>
                </Card>
              </>
            );
          })}

        {/* <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={art.primaryImage} />
          <ListGroup className="list-group-flush">
            <ListGroupItem>{art.title}</ListGroupItem>
          </ListGroup>
        </Card>
         */}

        {/* <div>
        <Row style={{ width: '100%', justifyContent: 'center' }}>
          {art.map((art) => {
            return (
              <>
                <Col>
                  <Card
                    title={art.title}
                    style={{ width: 230, height: 300, margin: 10 }}
                  >
                    <img src={art.primaryImage} height={60} />
                  </Card>
                </Col>
                ;
              </>
            );
          })}
        </Row>
      </div> */}
      </div>
    </>
  );
}

export default SearchPage;
