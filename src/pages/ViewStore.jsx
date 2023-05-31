import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './viewstore.css';

function Home() {
  // State variables
  const [carData, setCarData] = useState([]); // Holds the car data received from the API
  const [filters, setFilters] = useState({ // Holds the filter values for car search
    model: '',
    year: '',
    seatLayout: '',
    exteriorColor: '',
    interiorColor: '',
    wheels: '',
  });

  // Event handler for filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filters the car data based on the current filter values
  const filterCars = () => {
    return carData.filter((car) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key].toLowerCase();
        const carValue = car[key].toString().toLowerCase();
        return carValue.includes(filterValue);
      });
    });
  };

  // Fetches car data from the API
  const fetchCarData = async () => {
    try {
      // Send a GET request to the API endpoint to fetch car data
      const response = await fetch('https://f548hxoktd.execute-api.us-east-1.amazonaws.com/fetch_car_data');
      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch car data');
      }
      // Extract the JSON data from the response
      const data = await response.json();
      // Log the received data to the console
      console.log('Received data:', data);
      // Parse the data from JSON format into an object
      const parsedData = JSON.parse(data.body);
      // Log the parsed data to the console
      console.log('Parsed data:', parsedData);
      // Set the carData state variable with the parsed data
      setCarData(parsedData);
    } catch (error) {
      // Handle any errors that occur during the fetch process
      console.error('Error fetching car data:', error);
    }
  };

  // Fetch car data when the component mounts
  useEffect(() => {
    fetchCarData();
  }, []);

  return (
    <div className="container">
      <br /><br />
      <Row className="justify-content-center">
        <div className="filters">
          <label>Model:</label>
          <input type="text" name="model" value={filters.model} onChange={handleFilterChange} />

          <label>Year:</label>
          <input type="text" name="year" value={filters.year} onChange={handleFilterChange} />

          <label>Seat Layout:</label>
          <input type="text" name="seatLayout" value={filters.seatLayout} onChange={handleFilterChange} />

          <label>Exterior Color:</label>
          <input type="text" name="exteriorColor" value={filters.exteriorColor} onChange={handleFilterChange} />
          <br />
          <label>Interior Color:</label>
          <input type="text" name="interiorColor" value={filters.interiorColor} onChange={handleFilterChange} />

          <label>Wheels:</label>
          <input type="text" name="wheels" value={filters.wheels} onChange={handleFilterChange} />
        </div>
      </Row>
      <br /><br />

      <Row className="justify-content-center">
        {filterCars().map((car) => (
          <Col key={car.ID} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={car.carImageUrl} alt={car.model} />
              <Card.Body>
                <Card.Title>{car.model}</Card.Title>
                <Card.Text>
                  Year: {car.year}<br />
                  Price: {car.price}<br />
                  Seat Layout: {car.seatLayout}<br />
                  Exterior Color: {car.exteriorColor}<br />
                  Interior Color: {car.interiorColor}<br />
                  Wheels: {car.wheels}<br />
                  Key Features: {car.keyFeatures}
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
