import React, { useState, useEffect } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupStatus, setSignupStatus] = useState(null); // State to track signup status

  const handleSignup = (e) => {
    e.preventDefault();

    const poolData = {
      UserPoolId: 'us-east-1_sPMTKAzkO',
      ClientId: '3lsn8mv04ff2vf4qumb5q8pmlk',
    };

    const userPool = new CognitoUserPool(poolData);
    userPool.signUp(username, password, [], null, (err, result) => {
      if (err) {
        // Handle signup error here
        console.log('Signup error', err);
        setSignupStatus(false); // Update signup status to false
      } else {
        // Handle successful signup here
        console.log('Signup successful', result);
        setSignupStatus(true); // Update signup status to true
      }
    });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Signup</h1>
        {signupStatus !== null && (
          <div className={`alert ${signupStatus ? 'alert-success' : 'alert-danger'}`}>
            {signupStatus ? 'Signup successful' : 'Signup failed'}
          </div>
        )}
        <form onSubmit={handleSignup}>
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
          <br />
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
        <p>Confirm the account from here: <Link to="/confirmaccount">Confirm</Link></p>
      </div>
    </div>
  </div>
  );
};

export default Signup;


