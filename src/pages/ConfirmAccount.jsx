import React, { useState } from 'react';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

const ConfirmAccount = () => {
  const [username, setUsername] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationStatus, setConfirmationStatus] = useState(null); // State to track confirmation status

  const handleConfirmation = (e) => {
    e.preventDefault();

    const poolData = {
      UserPoolId: 'us-east-1_sPMTKAzkO',
      ClientId: '3lsn8mv04ff2vf4qumb5q8pmlk',
    };

    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        // Handle confirmation error here
        console.log('Confirmation error', err);
        setConfirmationStatus(false); // Update confirmation status to false
      } else {
        // Handle successful confirmation here
        console.log('Confirmation successful', result);
        setConfirmationStatus(true); // Update confirmation status to true
      }
    });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Confirm Account</h2>
        {confirmationStatus !== null && ( // Display confirmation status message if not null
            <div className={`alert ${confirmationStatus ? 'alert-success' : 'alert-danger'}`}>
              {confirmationStatus ? 'Confirmation successful' : 'Confirmation failed'}
            </div>
          )}
        <form onSubmit={handleConfirmation}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmationCode">Confirmation Code:</label>
            <input
              type="text"
              className="form-control"
              id="confirmationCode"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">Confirm</button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default ConfirmAccount;











{/* <div className="container">
      <h2 className="mb-4">Confirm Account</h2>
      <form onSubmit={handleConfirmation}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Confirmation Code:</label>
          <input type="text" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} required />
        </div>
        <br></br>
        <button type="submit">Confirm</button>
      </form>
    </div> */}