// import logo from './logo.svg';
// import './App.css';
// import Login from './components/Login';
// import Signin from './components/Signin';
// import CompanyList from './components/CompanyList';
// import ReviewList from './components/ReviewList';
// import NevHead from './components/NevHead';

// function App() {
//   return (
//     <div className="App">
//       <NevHead/>
//       <Login/>
//       <Signin/>
//       <CompanyList/>
//       <ReviewList/>
//     </div>
//   );
// }

// export default App;
import React from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './Utilities/PrivateRoutes';
import RedirectRoutes from './Utilities/RedirectRoutes';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signin from './components/Signin';
import CompanyList from './components/CompanyList';
import ReviewList from './components/ReviewList';

function App() {
  return (
    <div>
      <ToastContainer />
      <>
        <Routes>
          <Route element={<RedirectRoutes />}>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Navigate to={'/login'} />} />
            <Route path="/register" element={<Signin />} />

          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/companylist' element={<CompanyList />} />
            <Route path='/reviewlist' element={<ReviewList />} />
          </Route>
          {/* <Route path="*" element={<Pagenotfound />} /> */}
        </Routes>
      </>
    </div>
  );
}

export default App;
