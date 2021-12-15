import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import fileService from '../../services/file.service';
import { AuthContext } from './../../context/auth.context';

import zigZag from './../../images/zigZag.png';
import inLine from './../../images/inLine.png';
import stripes from './../../images/stripes.png';

function EditPortfolioPage(props) {
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

  const { user } = useContext(AuthContext);

  const { portfolioId } = useParams();

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/portfolios/${portfolioId}`
        );
        const onePortfolio = response.data;
        setName(onePortfolio.title);
        setEmail(onePortfolio.email);
        setPhone(onePortfolio.phone);
        setWebsite(onePortfolio.website);
        setTemplate(onePortfolio.template);
        setTitleOne(onePortfolio.titleOne);
        setDescOne(onePortfolio.descriptionOne);
        setImageOne(onePortfolio.imageOne);
        setTitleTwo(onePortfolio.titleTwo);
        setDescTwo(onePortfolio.descriptionTwo);
        setImageTwo(onePortfolio.imageTwo);
        setTitleThree(onePortfolio.titleThree);
        setDescThree(onePortfolio.descriptionThree);
        setImageThree(onePortfolio.imageThree);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem(`authToken`);
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
        userId: user._id,
      };
      await axios.put(
        `${SERVER_URL}/api/portfolios/${portfolioId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(`/portfolio/${portfolioId}`);
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
    <div className="EditPortfolioPage">
      <h1>Edit Portfolio</h1>

      <form onSubmit={handleSubmit}>
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
          <label for="templateInput" class="form-label">
            Choose a template
          </label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="template"
              value="zigZag"
              id="flexRadio1"
              onChange={handleTemplate}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Zig-Zag
            </label>
            <img src={zigZag} alt="zigZag" height="250px" />
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="template"
              value="inLine"
              id="flexRadio2"
              onChange={handleTemplate}
            />
            <label class="form-check-label" for="flexRadioDefault2">
              In Line
            </label>
            <img src={inLine} alt="inLine" height="250px" />
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="template"
              value="stripes"
              id="flexRadio3"
              onChange={handleTemplate}
            />
            <label class="form-check-label" for="flexRadioDefault3">
              Stripes
            </label>
            <img src={stripes} alt="stripes" height="250px" />
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
          Edit
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditPortfolioPage;
