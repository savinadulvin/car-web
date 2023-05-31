import React, { useState, useEffect } from 'react';

function Carlist() {
  // State to store car data
  const [carData, setCarData] = useState([]);
  // State to manage form input values
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

  // State to store filter values
  const [filters, setFilters] = useState({
    model: '',
    year: '',
    seatLayout: '',
    exteriorColor: '',
    interiorColor: '',
    wheels: '',
  });
  const [updatedStatus, setUpdatedStatus] = useState(null); // State to track updated status
  const [deletedStatus, setDeletedStatus] = useState(null); // State to track deleted status

  // State to track the ID of the selected car for update
  const [selectedCarId, setSelectedCarId] = useState(null); 

  // Event handler for filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Function to filter cars based on filter values
  const filterCars = () => {
    return carData.filter((car) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key].toLowerCase();
        const carValue = car[key].toString().toLowerCase();
        return carValue.includes(filterValue);
      });
    });
  };

  // Function to fetch car data from API
  const fetchCarData = async () => {
    try {
      const response = await fetch('https://f548hxoktd.execute-api.us-east-1.amazonaws.com/fetch_car_data');
      if (!response.ok) {
        throw new Error('Failed to fetch car data');
      }
      const data = await response.json();
      const parsedData = JSON.parse(data.body);
      setCarData(parsedData);
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  // Call fetchCarData on component mount
  useEffect(() => {
    fetchCarData();
  }, []);

  // Event handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let url;
      let method;
  
      if (selectedCarId) {
        // If a car is selected for update, use PUT method
        // url = `https://5z0228g5j1.execute-api.us-east-1.amazonaws.com/update_car_model/${selectedCarId}`;
        url = `https://hv51dvlkvh.execute-api.us-east-1.amazonaws.com/update`;
        method = 'PUT';
      } 
      else {
        console.error('No car selected! ', error);
      }
  
      // Submit the form data along with the image URL
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update car');
      }
  
      // Reset form input values after successful update
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
  
      setSelectedCarId(null); // Reset the selected car ID after successful update
      setUpdatedStatus(true); // Update updated status to true
      fetchCarData(); // Fetch car data after updating a car
    } catch (error) {
      console.error('Error updating car:', error);
      setUpdatedStatus(false); // Update updated status to false
    }
  };  

  // Event handler for form field changes
  const handleFormFieldChange = (event) => {
    setNewCar({ ...newCar, [event.target.name]: event.target.value });
  };

  // Event handler for updating a car
  const handleCarUpdate = (carId) => {
    setSelectedCarId(carId); // Set the selected car ID for update
    const selectedCar = carData.find((car) => car.ID === carId);
    setNewCar({ ...selectedCar });
  };

  //     // // Function to handle delete car
//     // const deleteCar = async (carId) => {
//     //   try {
//     //     // Perform API call to delete car
//     //     await fetch(`https://5z0228g5j1.execute-api.us-east-1.amazonaws.com/delete_car_model/${carId}`, { method: 'DELETE' });
//     //     // Refresh car data after deletion
//     //     fetchCarData();
//     //   } catch (error) {
//     //     console.error('Error deleting car:', error);
//     //   }
//     // };

  // const deleteCar = async (id) => {
  //   console.log("Sending ID: " + id);

  //   try {
  //     // console.log('Delete response:', id);
  //     const response = await fetch(`https://5z0228g5j1.execute-api.us-east-1.amazonaws.com/delete_car_model/${id}`, {  //${id.toString()
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to delete car');
  //     }

  //     const data = await response.json();
  //     console.log('Delete response:', data);

  //     fetchCarData(); // Refresh car data after deletion
  //   } catch (error) {
  //     console.error('Error deleting car:', error);
  //   }
  // };

  // Function to delete a car
  const deleteCar = async (id) => {
    console.log("Sending ID: " + id);
    try {
      // console.log('Delete response:', id);
      const json = {
        ID: id
      }
      // const response = await fetch(`https://5z0228g5j1.execute-api.us-east-1.amazonaws.com/delete_car_model/${id}`, {  //${id.toString()
      const response = await fetch(`https://hv51dvlkvh.execute-api.us-east-1.amazonaws.com/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
      });

      if (!response.ok) {
        throw new Error('Failed to delete car');
      }

      const data = await response.json();
      console.log('Delete response:', data);

      setDeletedStatus(true); // Update deleted status to true
      fetchCarData(); // Refresh car data after deletion
    } catch (error) {
      console.error('Error deleting car:', error);
      setDeletedStatus(false); // Update deleted status to false
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">This is the Admin car UPDATE and DELETE page.</h1>
      {updatedStatus !== null && ( // Display updated status message if not null
            <div className={`alert ${updatedStatus ? 'alert-success' : 'alert-danger'}`}>
              {updatedStatus ? 'Update successful' : 'Update failed'}
            </div>
          )}
      {selectedCarId ? 
      <form onSubmit={handleFormSubmit}>
        {/* Input fields for creating/updating a car */}
        {selectedCarId && (
          <div className="mb-3">
            <label className="form-label">Selected Car ID:</label>
            <input type="text" className="form-control" value={selectedCarId} readOnly />
          </div>
        )}
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
          <label className="form-label">Car image URL:</label>
          <input type="text" className="form-control" name="carImageUrl" value={newCar.carImageUrl} onChange={handleFormFieldChange} required />  
        </div>
        <button type="submit" className="btn btn-primary"> Update Car
          {/* {selectedCarId ? 'Update Car' : null} */}
        </button>
      </form>
      : null}
      <br /><br />
      {/* Filter fields */}
      <div className="filters">
        <label>Model:</label>
        <input type="text" name="model" value={filters.model} onChange={handleFilterChange} />

        <label>Year:</label>
        <input type="text" name="year" value={filters.year} onChange={handleFilterChange} />

        <label>Seat Layout:</label>
        <input type="text" name="seatLayout" value={filters.seatLayout} onChange={handleFilterChange} />

        <label>Exterior Color:</label>
        <input type="text" name="exteriorColor" value={filters.exteriorColor} onChange={handleFilterChange} />
          <br></br>
        <label>Interior Color:</label>
        <input type="text" name="interiorColor" value={filters.interiorColor} onChange={handleFilterChange} />

        <label>Wheels:</label>
        <input type="text" name="wheels" value={filters.wheels} onChange={handleFilterChange} />
      </div>
      <br />
      {deletedStatus !== null && ( // Display delete status message if not null
            <div className={`alert ${deletedStatus ? 'alert-success' : 'alert-danger'}`}>
              {deletedStatus ? 'Deleted successfuly' : 'Delete failed'}
            </div>
          )}
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Seat Layout</th>
            <th>Exterior Color</th>
            <th>Interior Color</th>
            <th>Wheels</th>
            <th>Key Features</th>
            <th>Car Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterCars().map((car) => (
            <tr key={car.ID}>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.price}</td>
              <td>{car.seatLayout}</td>
              <td>{car.exteriorColor}</td>
              <td>{car.interiorColor}</td>
              <td>{car.wheels}</td>
              <td>{car.keyFeatures}</td>
              <td>
                <img src={car.carImageUrl} alt={car.model} style={{ width: '100px' }} />
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleCarUpdate(car.ID)}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={() => deleteCar(car.ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Carlist;

