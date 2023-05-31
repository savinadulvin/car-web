import React from "react";
import { Link } from "react-router-dom";
import "./adminDashboard.css"; // Import the CSS file for styling

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h1>Welcome to the Admin Dashboard</h1>
      <div className="link-wrapper">
        <Link to="/inventoryreport">
          <button>Request Inventory Report</button>
        </Link>
      </div>
      <div className="link-wrapper">
        <Link to="/carform">
          <button>Create Car</button>
        </Link>
      </div>
      <div className="link-wrapper">
        <Link to="/carlist">
          <button>Edit Cars / Car list</button>
        </Link>
      </div>
      <div className="link-wrapper">
        <Link to="/signup">
          <button>Sign up an admin user</button>
        </Link>
      </div>
      <div className="link-wrapper">
        <Link to="/confirmaccount">
          <button>Verify the admin account</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

