import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar2 from './Navbar/Navbar2'
import Parameter_unit from './Parameter_unit.json' 



function Home() {
  

  const [Data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/getdata')
      .then((res) => {
        setData(res.data)
      })
      .catch(err => console.log(err))
      
    
  }, [])
  return (
    <div className='backend'>
      <Navbar2 />
      <div className='center2'>
        <div className='col-15 color ' alignment="center"></div>
        <div class="tbl col-15 " alignment="center">
          <table alignment="center">
            <tr class='header'>
              <th ALIGN='CENTER'>Machine PID</th>
              <th align='right'>Parameter Name</th>
              <th>Parameter Value</th>
              <th>Unit</th>
            </tr>
            <tbody>
              {Data.map((innerdata, index) => (
                <tr key={innerdata.PID}>
                  <td align='center'>{innerdata.PID}</td>
                  <td>{innerdata.ParameterName}</td>
                  <td align='right'>{innerdata.ParameterValue}</td>
                  <td key={innerdata.PID}>{Parameter_unit[innerdata.ParameterName]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-3 color '></div>
      </div>
      <div class="card bg-warning-subtle">
        <div class="card-body">
          <i className='timt'>copyright &#169; Protovec Technology Pvt Ltd.All right reserved 2023</i>
        </div>
      </div>
    </div>
  )
}

export default Home

