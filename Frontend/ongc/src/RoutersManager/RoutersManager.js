import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Report from '../Reports/Report';
import AutomaticLoadingTable from '../Tables/AutomaticLoadingTable';
import LiveReports from '../Reports/LiveReports';
import Login from '../Login/login';
import Signup from '../Login/signup'
import StaticTable from '../Tables/StaticTable';
// import TemperatureLineChart from '../Charts/TemperatureLineChart';
import ErrorPage from '../ErrorsPage/ErrorsPage';
import Admin from '../Login/Admin';
import Temperature_works from '../Charts/Temperature_Works';
import Employee from '../Login/Employee';
import Demo from '../Login/Demo'
import Hourly from '../Charts/Hourly';
import Minutely from '../Charts/Minutely';







function RoutersManager() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/AutomaticLoadingTable' element={<AutomaticLoadingTable />} />
          <Route path='/Report' element={<Report />} />
          <Route path='/LiveReports' element={<LiveReports />} />
          <Route path='/StaticTable' element={<StaticTable />} />
          <Route path='/Temperature_Works' element={<Temperature_works />} />
          <Route path='/ErrorsPage' element={<ErrorPage />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/Employee' element={<Employee />} />
          <Route path='/Demo' element={<Demo />} />
          <Route path='/Hourly' element={<Hourly />} />
          <Route path='/Minutely' element={<Minutely />} />
         

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default RoutersManager
