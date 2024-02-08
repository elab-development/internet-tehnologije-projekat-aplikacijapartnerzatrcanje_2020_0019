import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Registration from "./components/Registration";
import { Login } from "./components/Login";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import { apiService } from './components/ApiService';
import Profile from './components/Profile'
import CreatePlan from './components/CreatePlan';
import Runners from "./components/Runners";
import PlanRun from "./components/PlanRun";
import StatisticRun from "./components/StatisticRun";
import MapPage from "./components/MapPage";
import EndRun from './components/EndRun';
import Comments from './components/Comments';
import AllStatistics from './components/AllStatistics';

function App() {

  const [token, setToken] = useState(apiService.getToken());

  return (
    <Router className="App">
      <Navbar apiService={apiService} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registracija" element={<Registration />} />
        <Route path="/login" element={<Login updateToken={(token) => setToken(token)} />} ></Route>
        <Route path="/logout" element={<Navigate to="/" />}></Route>
        <Route path="/moj-nalog" element={<Profile />} />
        <Route path="/kreiraj-plan" element={<CreatePlan />} />
        <Route path="/trkaci" element={<Runners />} />
        <Route path="/planovi-trka" element={<PlanRun />} />
        <Route path="/statistike-trke" element={<StatisticRun />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/zavrsi-trku/:planId" element={<EndRun />} />
        <Route path="/komentari" element={<Comments />} />
        <Route path="/sve-statistike" element={<AllStatistics />} />

      </Routes>
      <Footer />
    </Router>
  );
}
export default App;