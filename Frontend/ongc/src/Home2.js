// import { useNavigate } from 'react-router-dom';
import Chart from './Charts/Chart';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getDataset, getOptionsets } from './Utility/utilites'
// import Navbar from './Navbar/Navbar2';
import Navbar2 from './Navbar/Navbar2';

//component start//
function Home2() {
  //for connection fromm backend //
  const [Data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/getdata')
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  // const navigate = useNavigate();
  const customBarColor = ["rgba(0,255,0,0.5)"];
  const customBarColorr = ["rgba(255,0,255,0.6)"];


  return (
    <div className='Backenddd'>
     <Navbar2/>
     
      <div class="container">
        <div id="box1" class="box">
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['PT1','PT2','PT3','PT4'], Data, 'Kg/cm2')}
              // data={getDataset("PT", Data, "Kg/cm2", 'horizontal')}
              options={getOptionsets(" PARAMETERS PT1 To PT5", 250,'x')}
            />
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['CM1','CM2'], Data, "PPM")}
              options={getOptionsets(" PARAMETERS OF CM1 & CM2 ", 2000, 'x')}
            />
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['Totalizer_SFM_1','Totalizer_GFM','Totalizer_OFM'], Data, "Ton",'bar')}
              options={getOptionsets("PARAMETERS OF Totalizer_GFM & Totalizer_SFM_1 Totalizer_OFM", 99999999,'x')}
            />
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['OFM'], Data, "Kg/hr")}
              options={getOptionsets(" PARAMETERS  OFM ", 1890)}
            />
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['SFM_1'], Data, "Kg/hr",'bar',customBarColorr)}
              options={getOptionsets(" PARAMETERS  SFM_1 ",9999,'y')}
            />
          </div>

          {/* <!---------------------------------- verticle div end --> */}

        </div>
        <div id="box2" class="box">
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['TT1','TT2','TT3','TT4','TT5','TT6','TT7'], Data, "Deg.C")}
              options={getOptionsets(" PARAMETERS OF TT1 to TT7", 500, 'x')}
            />
          </div>
          <hr />
          <div class="roz ">
          <div class='and'>
            <Chart 
              chartType="pie"
              data={getDataset(['TWCVFB_S','TWCVFB_W'], Data, "%",'pie')}
              options={getOptionsets("PARAMETERS OF TWCVFB_S & TWCVFB_W", 100)}
            /></div>
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['DI'], Data, "mmvc",'bar',customBarColor)}
              options={getOptionsets("PARAMETERS OF DI", 600)}
            />
          </div>
          <hr />
          <div class="roz">
            <Chart
              chartType="bar"
              data={getDataset(['GFM'], Data, "Kg/hr")}
              options={getOptionsets("PARAMETERS OF GFM", 600,'y')}
            />
          </div>
          
        </div>
        {/* <!---------------------------------- verticle div end --> */}
      </div>
    </div>
  )
}
//ac
//component end //
export default Home2
