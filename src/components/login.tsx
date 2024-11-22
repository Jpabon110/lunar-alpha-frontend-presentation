import React, { useState } from 'react';
import { login } from "../redux/actions/user.actions";
import { userLoggedloading } from "../redux/users.selectors";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import rocket from '../assets/rocketBlue.jpg'
import nasa from '../assets/logotipo-nasa.jpg'
import { AppDispatch } from "../redux/store";
import { LoginInfo } from "../interfaces/interfaces"
import { Box, TextField, Button } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userLoggedloaded = useSelector(userLoggedloading);
  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = useState<LoginInfo>({ 
    email: '',
    password: ''
  });

  const handleSubmit = async () => {
      await dispatch(login(loginInfo));
      navigate('/dashboard');
  };

  return (
    <>
    <div>
    <div className='flex justify-center'>
        <img src={rocket} className="w-auto h-48 object-cover" alt="React logo" />
        <img src={nasa} className="w-auto h-48 object-cover" alt="React logo" />
      </div>
      <div className="App">
        <Box
          component="form"
          className="flex flex-col items-center gap-4 p-4 border rounded-md shadow-md"
          style={{ width: '300px', margin: '0 auto', marginTop: '50px' }}
        >
          {(userLoggedloaded) ? (
            <div>
              <CircularProgress color="primary" size={60} thickness={4} />
            </div>
          ) : (
            <>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={loginInfo.email}
                onChange={(e) => setloginInfo({ ...loginInfo, email: e.target.value })} />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={loginInfo.password}
                onChange={(e) => setloginInfo({ ...loginInfo, password: e.target.value })} />
              <Button variant="contained" color="primary" fullWidth onClick={() => handleSubmit()}>
                login
              </Button>
            </>
          )}
        </Box>
      </div>
    </div>
    </>
  );
};

export default Login;
