import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import Modal from 'react-modal';
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false); // Track login failure status

  const handleLogin = (e) => {
    e.preventDefault();

    // Configure user pool data
    const poolData = {
      UserPoolId: 'us-east-1_sPMTKAzkO',
      ClientId: '3lsn8mv04ff2vf4qumb5q8pmlk',
    };

    // Create user pool and user data objects
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    // Create a new CognitoUser instance
    const cognitoUser = new CognitoUser(userData);

    // Create authentication details using the provided username and password
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    // Authenticate the user with the provided credentials
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        // Handle successful authentication here
        console.log('Login successful', result);
        setShowSuccessModal(true);
      },
      onFailure: (error) => {
        // Handle authentication failure here
        console.log('Login failed', error);
        setLoginFailed(true);
      },
    });
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setLoginFailed(false); // Reset login failure status
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">Login</button>
        {loginFailed && <p className="text-danger">Login failed. Please check your email and password.</p>}
      </form>
  
      {/* Modal code */}
      <Modal
        isOpen={showSuccessModal}
        onRequestClose={closeModal}
        contentLabel="Login Successful Modal"
      >
        <div className="container">
          <br /><br /><br /><br /><br />
        <h2>Login Successful</h2>
        <p>You have successfully logged in.</p>
        <button onClick={closeModal} className="btn btn-primary">Close</button>
        <br></br>
        <div>
          <Link to="/admindashboard">
          <br></br>
            <button className="btn btn-primary">Go to Admin Dashboard</button>
          </Link>
        </div>
        </div>
      </Modal>
    </div>
  );  
};

export default AdminLogin;
