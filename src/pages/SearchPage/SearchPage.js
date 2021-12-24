import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { AuthContext } from '../../context/auth.context';

function SearchPage() {
  const API_URL =
    'https://collectionapi.metmuseum.org/public/collection/v1/objects';
  const [art, setArt] = useState([]);
  const [interval, setInterval] = useState([
    555, 666, 888, 999, 46, 333, 2321, 900, 1000, 2000, 5000, 6000, 7000, 130,
  ]);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const newArr = await Promise.all(
          interval.map(async (artPiece) => {
            return await axios.get(`${API_URL}/${artPiece}`, {
              headers: { Authorization: `Bearer ${authToken}` }
            }
            );
          })
        );

        const cleanArr = newArr.map((el) => el.data);

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
      </div>
    </>
  );
}

export default SearchPage;
