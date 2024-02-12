import Chart from '../Charts/Chart';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getDataset, getOptionsets } from '../Utility/utilites';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { webSocketUrl } from '../Utility/localstorage';
import LoadingSpinner from '../Spinners/Spinner';
import { Navigate } from 'react-router-dom';

function LiveReports() {
  const [Data, setData] = useState([]);
  const dateValue = useSelector(state => state.dateManager.value);
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(1);


  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('/api/getdata?date=' + dateValue, {
      Authorization: `Bearer ${token}`
    })
      .then((res) => {
        setData(res.data);
        setIsLoading(2);
      })
      .catch(err => {
        console.log(err)
        setIsLoading(3);
      });

    const ws = new WebSocket(webSocketUrl);

    ws.addEventListener('open', () => console.log('WebSocket connection opened'));
    ws.addEventListener('message', event => {
      console.log(`Received message: ${event.data}`)
      const token = localStorage.getItem("token");
      axios.get('/api/getdata?date=' + dateValue, {
        Authorization: `Bearer ${token}`
      })
        .then((res) => {
          setData(res.data);
          setIsLoading(2);
        })
        .catch(err => {
          console.log(err)
          setIsLoading(3);
        });

    });
    ws.addEventListener('close', () => console.log('WebSocket connection closed'));

    setSocket(ws);

    return () => ws.close();
  }, [dateValue]);

  const customBarColor = ["red"];
  const customBarColorr = ["rgba(255,0,255,0.6)"];

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
              data={getDataset(['PT1', 'PT2', 'PT3', 'PT4'], Data, 'Kg/cm2')}
              options={getOptionsets(" PARAMETERS PT1 To PT5", 250, 'x')}
            />
          </div>
          <hr />
          <div className="roz">
            <Chart
              chartType="bar"
              data={getDataset(['CM1', 'CM2'], Data, "PPM")}
              options={getOptionsets(" PARAMETERS OF CM1 & CM2 ", 2000, 'x')}
            />
          </div>
          <hr />
          <div className="roz">
            <Chart
              chartType="bar"
              data={getDataset(['Totalizer_SFM_1', 'Totalizer_GFM', 'Totalizer_OFM'], Data, "Ton", 'bar')}
              options={getOptionsets("PARAMETERS OF Totalizer_GFM & Totalizer_SFM_1 Totalizer_OFM", 99999999, 'x')}
            />
          </div>
          <hr />
          <div className="roz">
            <Chart
              chartType="bar"
              data={getDataset(['OFM'], Data, "Kg/hr")}
              options={getOptionsets(" PARAMETERS  OFM ", 1890)}
            />
          </div>
          <hr />
          <div className="roz">
            <Chart
              chartType="bar"
              data={getDataset(['SFM_1'], Data, "Kg/hr", 'bar', customBarColorr)}
              options={getOptionsets(" PARAMETERS  SFM_1 ", 9999, 'y')}
            />
          </div>
        </div>
        <div id="box2" className="box">
          <div className="roz">
            <Chart
              chartType="bar"
              data={getDataset(['TT1', 'TT2', 'TT3', 'TT4', 'TT5', 'TT6', 'TT7'], Data, "Deg.C")}
              options={getOptionsets(" PARAMETERS OF TT1 to TT7", 500, 'x')}
            />
          </div>
          <hr />
          <div className="roz">
            <div className='and'>
              <Chart
                chartType="pie"
                data={getDataset(['TWCVFB_S', 'TWCVFB_W'], Data, "%", 'pie')}
                options={getOptionsets("PARAMETERS OF TWCVFB_S & TWCVFB_W", 100)}
              />
            </div>
          </div>
          <hr />
          <div className="roz">
            <Chart
              chartType="bar"
              data={getDataset(['DI'], Data, "mmvc", 'bar', customBarColor)}
              options={getOptionsets("PARAMETERS OF DI", 600)}
            />
          </div>
          <hr />
          <div className="roz">
            <Chart
              chartType="bar"
              data={getDataset(['GFM'], Data, "Kg/hr")}
              options={getOptionsets("PARAMETERS OF GFM", 600, 'y')}
            />
          </div>
          <hr />
          <div className="roz">
            <Chart
              chartType="doughnut"
              data={getDataset(['Totalizer_SFM_1', 'Totalizer_GFM', 'Totalizer_OFM'], Data, "Ton", 'doughnut')}
              options={getOptionsets("PARAMETERS OF Totalizer_GFM & Totalizer_SFM_1 Totalizer_OFM", 99999999, 'x')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveReports;
