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
        console.log('done fetching');
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log('ART is here', art);
  }, []);

  useEffect(() => {
    const searchArt = (char) => {
      let filteredArt;
      if (char === ' ') {
        filteredArt = results;
      } else {
        filteredArt = results.filter((oneArt) => {
          return oneArt.title.toLowerCase().includes(char.toLowerCase());
        });
      }
      setArt(filteredArt);
    };

    const handleSearch = (event) => {
      setArtName(event.target.value);
      searchArt(event.target.value);
    };
    if (results.length) {
      searchArt();
    }
  }, [results]);

  return (
    <>
      <div>
        {results.length &&
          results.map((oneArt) => {
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
        <div>
          <label>Search for inspiration</label>
          <input value={undefined} type="text" onChange="" />
        </div> */}

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
