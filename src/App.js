import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import CreatePortfolioPage from './pages/CreatePortfolioPage/CreatePortfolioPage';
import EditPortfolioPage from './pages/EditPortfolioPage/EditPortfolioPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import PortfolioDetailsPage from './pages/PortfolioDetailsPage/PortfolioDetailsPage';
import SearchPage from './pages/SearchPage/SearchPage';

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

        <Route
          path="/profile/edit/"
          element={
            <IsPrivate>
              <EditProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/portfolio/:portfolioId"
          element={
            <IsPrivate>
              <PortfolioDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/edit-portfolio/:portfolioId"
          element={
            <IsPrivate>
              <EditPortfolioPage />
            </IsPrivate>
          }
        />

        <Route
          path="/portfolio/add"
          element={
            <IsPrivate>
              <CreatePortfolioPage />
            </IsPrivate>
          }
        />

        <Route path="/searchDesign" element={<SearchPage />} />

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
      <Footer />
    </div>
  );
}

export default App;
