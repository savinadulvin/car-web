import React from 'react';
import { Link } from "react-router-dom";
import './home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to iCars</h1>
      <div className="home-description">
        This is the official website of iCars. Explore our offerings and get information about our store.
      </div>
      <div className="home-description">Go to <Link to="/viewstore" className="view-store-link">View Store</Link></div>
      <br />
      <div className="home-details">
        <div className="home-address">
          <h3>Store Location:</h3>
          <p>Dallas City</p>
        </div>
        <div className="home-business-hours">
          <h3>Business Hours:</h3>
          <p>Monday-Friday: 9 AM - 6 PM</p>
          <p>Saturday-Sunday: Closed</p>
        </div>
        <div className="home-contact">
          <h3>Contact Information:</h3>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
    </div>
  );
}

export default Home;


