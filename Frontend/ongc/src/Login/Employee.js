import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './Employee.css';

function Employee() {
  // State to store the fetched data
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9000/api/employees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    fetchData();
  }, []); // E

  return (
    <div>
      <Navbar />
      <span >
        <h1 className="MY_PROFILE">My Profile</h1>
      </span>
      <div className="cont_ainer">
        <form>
          {userData.map((user, index) => (
            <div key={index} className="form-group">
              <label className='label_FW' htmlFor={`name${index}`}>Name:</label>
              <input type="text" id={`name${index}`} name={`name${index}`} value={user.name} readOnly />
              <label className='label_FW' htmlFor={`email${index}`}>Email:</label>
              <input type="email" id={`email${index}`} name={`email${index}`} value={user.email} readOnly />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
export default Employee;
