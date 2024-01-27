import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

function App() {
  return (

    <BrowserRouter>
    
    <div>
      <Navbar />
     
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;

