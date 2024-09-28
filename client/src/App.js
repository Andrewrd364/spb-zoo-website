import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import './App.css';  
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import HoursPage from "./pages/HoursPage";
import DirectionsPage from "./pages/DirectionsPage";
import MapPage from "./pages/MapPage";
import GuardianshipPage from "./pages/GuardianshipPage";
import TicketsPage from "./pages/TicketsPage";
import NewsPage from "./pages/NewsPage";
import AdminPage from "./pages/AdminPage";
import AnimalsPage from "./pages/AnimalsPage";
import AnimalDetailPage from "./pages/AnimalDetailPage";
import ServicesPage from "./pages/ServicePage";
import SouvenirsPage from "./pages/SouvenirsPage"
import SouvenirDetailPage from "./pages/SouvenirDetailPage"
import NewsDetailPage from "./pages/NewsDetailPage";

function App() {
  return (
    <Router>
      <div id="root">
        <Navbar />

        <div className="App"> {/* Контент */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/hours" element={<HoursPage />} />
            <Route path="/directions" element={<DirectionsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/guardianship" element={<GuardianshipPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/animals" element={<AnimalsPage />} />
            <Route path="/animals/:id" element={<AnimalDetailPage />} />
            <Route path="/service/:id" element={<ServicesPage />} />
            <Route path="/souvenirs" element={<SouvenirsPage />} />
            <Route path="/souvenirs/:id" element={<SouvenirDetailPage />} />
          </Routes>
        </div>

        <Footer /> {/* Футер */}
      </div>
    </Router>
  );
}

export default App;
