import { Routes, Route, useNavigate  } from 'react-router-dom';
import Login from '../src/components/login';
import Dashboard from '../src/components/dashboard';
import './App.css'
import { userLogged } from "../src/redux/users.selectors";
import { useSelector } from "react-redux";
import { useEffect } from 'react';

function App() {

  const userLoggedInfo = useSelector(userLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedInfo?.token && window.location.pathname !== '/') {
      navigate('/');
    }
  }, [userLoggedInfo, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
