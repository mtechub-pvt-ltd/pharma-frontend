import './App.css';
import React from 'react'
import Login from './Pages/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ResponsiveDrawer from './Pages/ResponsiveDrawer';
import Home from './Pages/Home';
import ForgetPass from './Pages/ForgetPass';
import UpdatePassword from './Pages/UpdatePassword';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SalesOrderDetails from './Components/SalesOrderDetails/SalesOrderDetails';

function App() {
  return (
    <>
    <div >
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/drawer" element={<ResponsiveDrawer />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/home" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/forgetPass" element={<ForgetPass />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/updatePass" element={<UpdatePassword />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/salesOrder" element={<SalesOrderDetails />}></Route>
        </Routes>
        
      
        </Router>
        </div>
        </>
  );
}

export default App;
