import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

function Admin() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/login', {
            baseURL: 'http://localhost:9000',  // Update with your actual server URL
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='park'>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <Navbar />

      <div className='tbl col-8 bark ' alignment='center'>
        <table alignment='center' className='tablet'>
          <thead>
            <tr className='header'>
              <th align='center'>ID</th>
              <th align='right'>User Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Approve</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{/* Display password or some relevant info */}</td>
                <td>{/* Display status or add approve/reject buttons */}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
