import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setDateValue } from '../Redux/dateManager';
import { BiSolidUserRectangle } from "react-icons/bi";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { BiDownload } from "react-icons/bi";
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import './styles.css'; // Adjust the path as per your file structure



//Function to decode JWT token
const decodeJwtToken = (token) => {
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            return decodedPayload;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    } else {
        console.error('Token is undefined or null');
        return null;
    }
};



function Navbar() {
    const dateValue = useSelector(state => state.dateManager.value);
    const [showDropdown, setShowDropdown] = useState(false);

    // console.log(dateValue)
    const dispatch = useDispatch();
    const [date, setDate] = useState(dateValue);
    
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        dispatch(setDateValue(today));
    }, [dispatch]);

    const dateChange = (e) => {
        const newDate = e.target.value;
        dispatch(setDateValue(newDate));
        setDate(newDate);
    }


    const navigateFunction = useNavigate();

    // on button click events code //
    const handleButtonClick = () => {
        const token = localStorage.getItem('token');
        console.log("entered handle button click function")
        // Decode token to extract user information
        const decodedToken = decodeJwtToken(token);
        console.log('Decoded Token:', decodedToken);
        console.log("entered handle button click function")

        if (!decodedToken || !decodedToken.email) {
            console.error('Invalid token or missing email');
            return;
        }

        // Query database to retrieve user role based on email
        axios.get('/api/getUserRole', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const role = response.data.role;
                console.log("User Role : ", role)
                // Route user based on role
                if (role === 'employee') {
                    navigateFunction('/Employee');
                } else if (role === 'admin') {
                    navigateFunction('/Admin');
                } else {
                    console.error('Unknown or unsupported role:', role);
                }
            })
            .catch(error => {
                console.error('Error fetching user role:', error);
            });

    }

    const handleLogoutButtonClick = () => {
        const token = localStorage.getItem('token');
        console.log("entered handle button click function");

        // Decode token to extract user information
        const decodedToken = decodeJwtToken(token);
        console.log('Decoded Token:', decodedToken);

        if (!decodedToken || !decodedToken.email) {
            console.error('Invalid token or missing email');
            return;
        }

        // Update status in the remote MySQL database
        const updateStatus = () => {
            axios.post('/api/updateStatus', {
                email: decodedToken.email,
                newStatus: 'Offline'
            })
                .then(response => {
                    console.log("Status updated successfully:", response.data);
                })
                .catch(error => {
                    console.error('Error updating status:', error);
                });
        };

        // Call the updateStatus function
        updateStatus();
    };

    const handleDownload = (fileType) => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        // Make an HTTP GET request to fetch the data from the backend with the date parameter and authorization token
        axios.get('/api/getdata', {
            params: { date: dateValue }, // Pass date as a query parameter
            headers: { Authorization: `Bearer ${token}` } // Include authorization token in headers
        })
            .then(response => {
                // Once the data is successfully fetched, proceed with generating the file based on selected fileType
                const data = response.data; // Assuming the response contains the data in the expected format
                if (fileType === 'Excel') {
                    const ws = XLSX.utils.json_to_sheet(data);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "Data");
                    XLSX.writeFile(wb, "Report.xlsx");
                } else if (fileType === 'PDF') {
                    // Generate PDF logic here
                    // Example: You can use a library like jsPDF to generate PDF
                } else {
                    console.error('Invalid fileType:', fileType);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };




    return (
        <div>

            <nav>
                <div class="left-components">
                    <img class="imgs imgsL" src="./Images/ONGC_3.jpg" alt="ONGC Logo" />
                </div>
                <div class="left-components">

                    <div class="diveup">
                        <p><b>BOILER NO : SGMB/SB/8.5T/025</b></p>
                    </div>

                    <div class="divedown">
                        <p ><b>BOILER MODEL : SGMB/8500/175</b></p>
                    </div>


                </div>
                {/* -------------------------------------------------------------- */}

                {/* --------------------------------------------------------------------- */}
                <div class="right-components">

                    <img class="imgs" src="./Images/ONGC_1.png" alt="ONGC Logo" />
                </div>
                {/* ------------------------------------------------------------------- */}
                <div class="right-components ongcbtnmain" onClick={handleLogoutButtonClick}>
                    <a href="/" class="text-sm text-blue-700 dark:text-blue-600  ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="red">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10M12 12h.01M12 18v.01"></path>
                        </svg>
                    </a>

                </div>
                <div className="User_Button" onClick={handleButtonClick}>
                    <BiSolidUserRectangle />
                </div>

                {/* <div class="Admin_Button">
                    <a href="/Employee" >
                        <BiSolidUserRectangle />
                    </a>
                </div> */}

            </nav>


            {/* ================================================================================ */}



            <nav class="RM2">
                <div class="max-w-screen-xl px-0 py-1 mx-auto flex">
                    <div class="flex1 items-Left top_left">
                        <ul class="flex flex-row font-medium mt-2 space-x-6 rtl:space-x-reverse text-sm no-margin-left">
                            <li>
                                <a href="/StaticTable" class="text-gray-900 dark:text-white hover:blink" aria-current="page">Report</a>
                            </li>
                            <li>
                                <a href="/LiveReports" class="text-gray-900 dark:text-white hover:blink">LIVE_REPORTS</a>
                            </li>
                            <li>
                                <a href="/Report" class="text-gray-900 dark:text-white hover:blink">7_REPORTS</a>
                            </li>
                            <li>
                                <a href="/Temperature_Works" class="text-gray-900 dark:text-white hover:blink">TemperatureLineChart</a>
                            </li>
                            {/* <li>
                                <a href="/AutomaticLoadingTable" class="text-gray-900 dark:text-white hover:blink">A</a>
                            </li> */}

                        </ul>
                    </div>
                    {/* <div class="max-w-screen-sm mx-auto flex flex1 items-Right ml-auto"> */}

                    <div class="nav2flex items-Right">
                        <div className="download-button" onClick={() => {
                            console.log('Clicked on download button');
                            setShowDropdown(!showDropdown);
                        }}>
                            <BiDownload className='download' />
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <button onClick={() => handleDownload('Excel')}>Excel</button>
                                    <button onClick={() => handleDownload('PDF')}>PDF</button>
                                </div>
                            )}
                        </div>
                        <input onChange={e => { dateChange(e) }} value={date} type="date" id="datetimeInput" name="datetimeInput" style={{ fontSize: '0.9rem', width: '150px', height: '20px' }} />
                    </div>
                </div>
            </nav>


        </div>
    )
}

export default Navbar
