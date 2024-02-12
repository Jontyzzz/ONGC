import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Report from '../Reports/Report';
import AutomaticLoadingTable from '../Tables/AutomaticLoadingTable';
import LiveReports from '../Reports/LiveReports';
import Login from '../Login/login';
import Signup from '../Login/signup'
import StaticTable from '../Tables/StaticTable';
import TemperatureLineChart from '../Charts/TemperatureLineChart';
import ErrorPage from '../ErrorsPage/ErrorsPage';






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
          <Route path='/TemperatureLineChart' element={<TemperatureLineChart />} />
          <Route path='/ErrorsPage' element={<ErrorPage />} />
         

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default RoutersManager
