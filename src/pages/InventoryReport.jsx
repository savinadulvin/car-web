import React, { useState } from 'react';

function InventoryReport() {
  const [email, setEmail] = useState('');
  const [processStatus, setProcessStatus] = useState(null); // State to track process status

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!email) {
        throw new Error('Email is required');
      }
  
      const response = await fetch('https://zfggrqd6w1.execute-api.us-east-1.amazonaws.com/generate_inventory_report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })   // Convert email to JSON format
      });
  
      if (!response.ok) {
        throw new Error('Failed to request inventory report');
      }
  
      const data = await response.json();// Parse the response data
      console.log(data); // Log the response from the Lambda function
      // Show success message to the user
      setProcessStatus(true); // Update process status to true
    } catch (error) {
      console.error(error);
      // Show error message to the user
      setProcessStatus(false); // Update process status to false
    }
  };
  

  return (
    <div className="container">
      <h1 className="mt-4">Inventory Report</h1>
      {processStatus !== null && ( // Display process status message if not null
            <div className={`alert ${processStatus ? 'alert-success' : 'alert-danger'}`}>
              {processStatus ? 'Email sent successfuly' : 'Failed to send the email'}
            </div>
          )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            placeholder="Your Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Request Report</button>
        <small className="form-text text-muted">
          Didn't you get the email? To get access to the Amazon Simple Notification Service, contact the head admin: admin@admin.com
        </small>
      </form>
    </div>
  );
}

export default InventoryReport;













