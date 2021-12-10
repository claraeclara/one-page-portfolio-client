import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import CreatePortfolioPage from './pages/CreatePortfolioPage/CreatePortfolioPage';
import EditPortfolioPage from './pages/EditPortfolioPage/EditPortfolioPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import PortfolioDetailsPage from './pages/PortfolioDetailsPage/PortfolioDetailsPage';

import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              {' '}
              <ProfilePage />{' '}
            </IsPrivate>
          }
        />

        <Route path="/profile/edit/:profileId" element={<EditProfilePage />} />

        <Route
          path="/portfolio/:portfolioId"
          element={<PortfolioDetailsPage />}
        />

        <Route
          path="/edit-portfolio/:portfolioId"
          element={<EditPortfolioPage />}
        />

        <Route path="/portfolio/add" element={<CreatePortfolioPage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {' '}
              <SignupPage />{' '}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {' '}
              <LoginPage />{' '}
            </IsAnon>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
