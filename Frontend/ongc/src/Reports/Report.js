import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Chart from '../Charts/Chart';
import { useSelector } from 'react-redux';
import { webSocketUrl } from '../Utility/localstorage';
import { getDataset, getOptionsets } from '../Utility/utilites';
import Temperature from '../Charts/TemperatureLineChart';
import LoadingSpinner from '../Spinners/Spinner';
import { Navigate } from 'react-router-dom';

function Report() {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);
  const dateValue = useSelector(state => state.dateManager.value);
  const [isLoading, setIsLoading] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/getdata?date=${dateValue}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setData(response.data);
        setIsLoading(2);
      } catch (err) {
        console.log(err);
        setIsLoading(3);
      }
    }; // Closing brace for fetchData function

    const ws = new WebSocket(webSocketUrl);

    ws.addEventListener('open', () => console.log('WebSocket connection opened'));
    ws.addEventListener('message', () => fetchData());
    ws.addEventListener('close', () => console.log('WebSocket connection closed'));

    fetchData();

    setSocket(ws);
    return () => ws.close();
  }, [dateValue]);

  const customBarColorss = ["rgba(255,255,0,0.7)"];
  const customBarColorssss = ["rgba(255,136,0)"];

  const getRunningHour = () => data.find(obj => obj.ParameterName === "Running_Hour")?.ParameterValue || 0;
  const getRunningTime = () => data.find(obj => obj.ParameterName === "Running_Minute")?.ParameterValue || 0;

  if (isLoading === 1) {
    return (<>
      <Navbar />
      <LoadingSpinner />
    </>)
  }
  if (isLoading === 3) {
    return (
      <Navigate to="/" />
    )
  }

  return (
    <div className='Backenddd'>
      <Navbar />
      <div className="container">
        <div id="box1" className="box">
          <div className="roz">
            <Chart
              chartType="bar"
              data={getDataset(['PT5'], data, "Kg/cm2", 'bar', customBarColorssss)}
              options={getOptionsets(" PARAMETERS OF PT5", 250, 'x')}
            />
          </div>
          {/* ... (Other charts) ... */}
        </div>
        <div id="box2" className="box">
          <div className="roz">
            {/* ... (Charts) ... */}
          </div>
          <hr />
          {data && data.length > 0 && (
            <div className="roz">
              <div className='Runn1'>
                <p><b> RunningHour </b> : <input type="text" value={getRunningHour()} readOnly /></p>
              </div>
              <br />
              <div className='Runn2'>
                <p><b>RunningTime</b>: <input type="text" value={getRunningTime()} readOnly /></p>
              </div>
            </div>
          )}
          <hr />
          <div className='roz'>
            <Chart
              chartType="line"
              data={getDataset(['TT1', 'TT2', 'TT3', 'TT4', 'TT5', 'TT6', 'TT7'], data, 'Deg.C', 'line', customBarColorss)}
              options={getOptionsets('PARAMETERS OF TT1 to TT7', 500)}
            />
          </div>
        </div>
      </div>
      <div className='container'>
        <Temperature />
      </div>
    </div>
  );
}

export default Report;
