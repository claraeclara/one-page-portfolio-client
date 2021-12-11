import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authService from '../../services/auth.service';
import fileService from '../../services/file.service';

function CreatePortfolioPage(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [website, setWebsite] = useState('');
  const [template, setTemplate] = useState('');
  const [titleOne, setTitleOne] = useState('');
  const [descriptionOne, setDescOne] = useState('');
  const [imageOne, setImageOne] = useState('');
  const [titleTwo, setTitleTwo] = useState('');
  const [descriptionTwo, setDescTwo] = useState('');
  const [imageTwo, setImageTwo] = useState('');
  const [titleThree, setTitleThree] = useState('');
  const [descriptionThree, setDescThree] = useState('');
  const [imageThree, setImageThree] = useState('');
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleWebsite = (e) => setWebsite(e.target.value);
  const handleTemplate = (e) => setTemplate(e.target.value);
  const handleTitleOne = (e) => setTitleOne(e.target.value);
  const handleDescOne = (e) => setDescOne(e.target.value);
  const handleTitleTwo = (e) => setTitleTwo(e.target.value);
  const handleDescTwo = (e) => setDescTwo(e.target.value);
  const handleTitleThree = (e) => setTitleThree(e.target.value);
  const handleDescThree = (e) => setDescThree(e.target.value);

  const handleCreateSubmit = async (e) => {
    try {
      e.preventDefault();
      //CReate an object representing the request body
      const requestBody = {
        name,
        email,
        phone,
        website,
        template,
        titleOne,
        descriptionOne,
        imageOne,
        titleTwo,
        descriptionTwo,
        imageTwo,
        titleThree,
        descriptionThree,
        imageThree,
      };
      const authToken = localStorage.getItem('authToken');
      await axios.post('http://localhost:5005/api/portfolios', requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      //Clear the form
      setName('');
      setEmail('');
      setPhone(0);
      setWebsite('');
      setTemplate('');
      setTitleOne('');
      setDescOne('');
      setImageOne('');
      setTitleTwo('');
      setDescTwo('');
      setImageTwo('');
      setTitleThree('');
      setDescThree('');
      setImageThree('');

      navigate('/profile');
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  const handleProjOneImage = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append('image', e.target.files[0]);
      const response = await fileService.uploadImage(uploadData);
      setImageOne(response.data.secure_url);
      setAllowSubmit(true);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to upload file');
    }
  };

  const handleProjTwoImage = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append('image', e.target.files[0]);
      const response = await fileService.uploadImage(uploadData);
      setImageTwo(response.data.secure_url);
      setAllowSubmit(true);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to upload file');
    }
  };

  const handleProjThreeImage = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append('image', e.target.files[0]);
      const response = await fileService.uploadImage(uploadData);
      setImageThree(response.data.secure_url);
      setAllowSubmit(true);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to upload file');
    }
  };

  return (
    <div className="CreatePortfolioPage">
      <h1>Create Portfolio</h1>

      <form onSubmit={handleCreateSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label>Phone Number:</label>
        <input
          type="number"
          name="phone"
          value={phone}
          onChange={handlePhone}
        />

        <label>Website:</label>
        <input
          type="text"
          name="website"
          value={website}
          onChange={handleWebsite}
        />


<div>
    <label for="templatenput" class="form-label">Choose your template</label>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="template" value="zigZag" id="flexRadio1"  checked />
        <label class="form-check-label" for="flexRadioDefault1">Zig-Zag</label>
        </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="template" value="inLine" id="flexRadio2" />
        <label class="form-check-label" for="flexRadioDefault2">In Line</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="template" value="stripes" id="flexRadio3" />
        <label class="form-check-label" for="flexRadioDefault3">Stripes</label>
    </div>
    </div>

        <h3>Project 1</h3>
        <label>Title:</label>
        <input
          type="text"
          name="titleOne"
          value={titleOne}
          onChange={handleTitleOne}
        />
        <label>Description:</label>
        <input
          type="text"
          name="drescriptionOne"
          value={descriptionOne}
          onChange={handleDescOne}
        />
        <label>Image:</label>
        <input type="file" onChange={handleProjOneImage} />

        <h3>Project 2</h3>
        <label>Title:</label>
        <input
          type="text"
          name="titleTwo"
          value={titleTwo}
          onChange={handleTitleTwo}
        />
        <label>Description:</label>
        <input
          type="text"
          name="drescriptionTwo"
          value={descriptionTwo}
          onChange={handleDescTwo}
        />
        <label>Image:</label>
        <input type="file" onChange={handleProjTwoImage} />

        <h3>Project 3</h3>
        <label>Title:</label>
        <input
          type="text"
          name="titleThree"
          value={titleThree}
          onChange={handleTitleThree}
        />
        <label>Description:</label>
        <input
          type="text"
          name="drescriptionThree"
          value={descriptionThree}
          onChange={handleDescThree}
        />
        <label>Image:</label>
        <input type="file" onChange={handleProjThreeImage} />

        <button type="submit" disabled={!allowSubmit}>
          Create
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreatePortfolioPage;
