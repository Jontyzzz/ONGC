import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './Admin.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Admin() {
  const [userData, setUserData] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [decodedToken, setDecodedToken] = useState(null);
  const [emailInput, setEmailInput] = useState(''); 

  // Function to fetch user data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9000/api/Admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);

      
       // Decode the token and store the decoded data into the state
       const decodedData = decodeToken(token);
       setDecodedToken(decodedData);
 
       // Set email for input box
       setEmailInput(decodedData.email);

      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 

  // Function to decode the token
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const togglePasswordVisibility = (userId) => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [userId]: !prevState[userId]
    }));
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // After deletion, fetch updated user data
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'whitesmoke' }} >
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <Navbar />
      <span >
        <h1 className="MY_ADMIN">Admin Profile</h1>
      </span>
      <div className='CTC col-8'>
        <table className='CT'>
          <thead className='TTHD'>
            <tr className='CTH'>
              <th className='ATH'>ID</th>
              <th className='ATH'>Name</th>
              <th className='ATH'>Email</th>
              <th className='ATH'>Password</th>
              <th className='ATH'>Status</th>
              <th className='ATH'>Delete_User</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{ position: 'relative' }}>
                  {passwordVisibility[user.id] ? user.password : '*'.repeat(user.password.length)}
                  <button
                    onClick={() => togglePasswordVisibility(user.id)}
                    style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                    {passwordVisibility[user.id] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </td>
                <td style={{ backgroundColor: user.status === 'Online' ? '#7FFF00' : '#FF0000' }}>{user.status}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input type="text" value={emailInput} readOnly />
    </div>
  );
}

export default Admin;
