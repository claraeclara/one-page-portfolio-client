import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [word, setWord] = useState([]);
  const [count, setCount] = useState(0);

  const randomWordGenerator = (words) => {
    let randomWord = words[Math.floor(Math.random() * words.length)];

    setWord(randomWord);
  };

  useEffect(() => {
    const myArray = [
      'creative',
      'objective',
      'inspiring',
      'innovating',
      'fantastic',
      'smart',
      'influential',
      'cute',
    ];
    randomWordGenerator(myArray);
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 2000);

    // Return a clean up function - runs during the unmounting
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="HomePage">
      <img src="screen2.jpeg" alt="creative" height="230px" />

      <h2>
        How <span style={{ color: `coral` }}>{word}</span> can you be in
        <br></br>one page?
      </h2>

      <img src="screen.jpeg" alt="creative" height="230px" />
      <br></br>
      {isLoggedIn && (
        <>
          <Link to="/searchDesign">
            <button>Get Inspired</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default HomePage;
