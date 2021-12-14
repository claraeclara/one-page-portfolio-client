import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import fileService from '../../services/file.service';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function EditProfilePage(props) {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [image, setImage] = useState(''); // <-- used for image upload input
  const [allowSubmit, setAllowSubmit] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/users/current`
        );
        const currentUser = response.data;
        setName(currentUser.name);
        setImage(currentUser.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleName = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem(`authToken`);
      const requestBody = { name, image };

      await axios.put(`${SERVER_URL}/api/users/current`, requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // clear the form
      setName('');
      setImage('');
      navigate('/profile/');
    } catch (error) {
      setErrorMessage('Failed to handle submit');
    }
  };
  const handleImage = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append('image', e.target.files[0]);
      const response = await fileService.uploadImage(uploadData);
      setImage(response.data.secure_url);
      setAllowSubmit(true);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to upload file');
    }
  };

  return (
    <div>
      <h1>Edit Profile Page</h1>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Image:</label>
        <input type="file" onChange={handleImage} />

        <button type="submit" disabled={!allowSubmit}>
          Edit
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditProfilePage;
