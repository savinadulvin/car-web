import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import "./navbar.css"; // Import the CSS file


function Button({ text, bg, padding }) {
  return (
    <div>
      <button
        className={`button ${padding || "px-6 py-2"} ${bg}`} // Add the "button" class
      >
        <span>{text}</span>
      </button>
    </div>
  );
}

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch the user pool data
    const poolData = {
      UserPoolId: 'us-east-1_sPMTKAzkO',
      ClientId: '3lsn8mv04ff2vf4qumb5q8pmlk',
    };

    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      // If a user is found, retrieve the session
      cognitoUser.getSession((err, session) => {
        if (err) {
          // Handle session retrieval error here
          console.log('Session retrieval error', err);
        } else {
          // Check if the session is valid
          setIsLoggedIn(session.isValid());
        }
      });
    }
  }, []);

  const handleLogout = () => {
    const poolData = {
      UserPoolId: 'us-east-1_sPMTKAzkO',
      ClientId: '3lsn8mv04ff2vf4qumb5q8pmlk',
    };

    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      // Sign out the user and update the login state
      cognitoUser.signOut();
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="navbar fixed-top"> {/* Add the "navbar" class and "fixed-top" class */}
      <nav className="container">
        <h1 className="font-semibold uppercase text-lg">ICars Company</h1> {/* Remove text-gray-200 class */}
        <div>
          <ul>
            {isLoggedIn && ( // Conditionally render the "Admin Dashboard" link if the user is logged in
              <li>
                <Link to="/admindashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/viewstore">View Store</Link>
            </li>
            {isLoggedIn && ( // Conditionally render the "Car List" link if the user is logged in
              <li>
                <Link to="/carform">Create car</Link>
              </li>
            )}
            {isLoggedIn && ( // Conditionally render the "Car List" link if the user is logged in
              <li>
                <Link to="/carlist">Admin Car List</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          {isLoggedIn ? (
            <button text="Logout" bg="gradient" onClick={handleLogout}>Logout</button>
          ) : (
            <div>
              <div>
                <Link to="/login">
                  <Button text="Admin Login" bg="gradient" />
                </Link>
                <Link to="/confirmaccount">
                  <Button text="Verify an Account" bg="gradient" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;



