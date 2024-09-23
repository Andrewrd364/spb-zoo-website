import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ZooNavbar from './components/Navbar';
import AnimalsPage from './pages/AnimalsPage';
import EventsPage from './pages/EventsPage';
import HoursPage from './pages/HoursPage';
import DirectionsPage from './pages/DirectionsPage';
import MapPage from './pages/MapPage';
import ServicePage from './pages/ServicePage';
import GuardianshipPage from './pages/GuardianshipPage';
import TicketsPage from './pages/TicketsPage';
import NewsPage from './pages/NewsPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div>
        <ZooNavbar />
        <Routes>
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/hours" element={<HoursPage />} />
          <Route path="/directions" element={<DirectionsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/guardianship" element={<GuardianshipPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
