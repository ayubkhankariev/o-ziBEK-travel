import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Stays from './pages/Stays';
import StayDetails from './pages/StayDetails';
import Attractions from './pages/Attractions';
import AttractionDetails from './pages/AttractionDetails';
import MapPage from './pages/MapPage';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/stays" element={<Stays />} />
              <Route path="/stays/:id" element={<StayDetails />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/attractions/:id" element={<AttractionDetails />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            &copy; 2025 O‘ziBEK Travel Guide
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
