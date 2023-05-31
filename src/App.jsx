import React from 'react';
import Navbar from './components/Navbar';   
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/AdminLogin';
import Signup from './pages/Signup';
import Carlist from './pages/Carlist';
import AdminDashboard from './pages/AdminDashboard';
import InventoryReport from './pages/InventoryReport';
import ViewStore from './pages/ViewStore';
import ConfirmAccount from './pages/ConfirmAccount';
import CarForm from './pages/CarForm';

function App() {
  return (
    <Router>
    <div className="pt-20">
      <Navbar />
      <br></br><br></br><br></br><br></br>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/carlist" element={<Carlist />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/inventoryreport" element={<InventoryReport />} />
        <Route path="/viewstore" element={<ViewStore />} />
        <Route path="/confirmaccount" element={<ConfirmAccount />} />
        <Route path="/carform" element={<CarForm />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
