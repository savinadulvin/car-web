import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CarForm = () => {
  // State to manage the form input values
  const [newCar, setNewCar] = useState({
    model: '',
    year: '',
    price: '',
    seatLayout: '',
    exteriorColor: '',
    interiorColor: '',
    wheels: '',
    keyFeatures: '',
    carImageUrl: '',
  });
  const [createdStatus, setCreatedStatus] = useState(null); // State to track created status

  // Event handler for form field changes
  const handleFormFieldChange = (event) => {
    const { name, value } = event.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  // Event handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Get the selected file from the file input
      const file = event.target.carImage.files[0];
      const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;

      // Read the file data as an ArrayBuffer
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const binaryData = fileReader.result;

        try {
          // Upload the file to an S3 bucket using Axios
          await axios.put(`https://1gqiy3ae76.execute-api.us-east-1.amazonaws.com/dev/icarwebsite-fileupload/${fileName}`, binaryData, {
            headers: {
              'Content-Type': file.type,
            },
          });

          // Construct the S3 image URL
          const s3ImageUrl = `https://icarwebsite-fileupload.s3.amazonaws.com/${fileName}`;

          // Create the car data object with the image URL
          const carData = { ...newCar, carImageUrl: s3ImageUrl };

          // Send a POST request to create the car model
          const response = await fetch('https://f548hxoktd.execute-api.us-east-1.amazonaws.com/create_car_model', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
          });

          if (!response.ok) {
            throw new Error('Failed to create car');
          }

          // Reset the form input values
          setNewCar({
            model: '',
            year: '',
            price: '',
            seatLayout: '',
            exteriorColor: '',
            interiorColor: '',
            wheels: '',
            keyFeatures: '',
            carImageUrl: '',
          });
        } catch (error) {
          console.error('Error uploading image or creating car:', error);
        }
      };

      // Read the file as an ArrayBuffer
      fileReader.readAsArrayBuffer(file);
      setCreatedStatus(true); // Update created status to true
    } catch (error) {
      console.error('Error accessing file:', error);
      setCreatedStatus(false); // Update created status to false
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">This is the Admin car CREATE page.</h1>
      {createdStatus !== null && ( // Display created status message if not null
            <div className={`alert ${createdStatus ? 'alert-success' : 'alert-danger'}`}>
              {createdStatus ? 'Created successful' : 'Creating failed'}
            </div>
          )}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Model:</label>
          <input type="text" className="form-control" name="model" value={newCar.model} onChange={handleFormFieldChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Year:</label>
          <input type="text" className="form-control" name="year" value={newCar.year} onChange={handleFormFieldChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="text" className="form-control" name="price" value={newCar.price} onChange={handleFormFieldChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Seat layout:</label>
          <input type="text" className="form-control" name="seatLayout" value={newCar.seatLayout} onChange={handleFormFieldChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Exterior color:</label>
          <input type="text" className="form-control" name="exteriorColor" value={newCar.exteriorColor} onChange={handleFormFieldChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Interior color:</label>
          <input type="text" className="form-control" name="interiorColor" value={newCar.interiorColor} onChange={handleFormFieldChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Wheels:</label>
          <input type="text" className="form-control" name="wheels" value={newCar.wheels} onChange={handleFormFieldChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Key features:</label>
          <input type="text" className="form-control" name="keyFeatures" value={newCar.keyFeatures} onChange={handleFormFieldChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Car image:</label>
          <input type="file" className="form-control" name="carImage" accept="image/*" required />
        </div>
        <button type="submit" className="btn btn-primary">Create Car</button>
      </form>
    </div>
  );
};

export default CarForm;
