import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserData } from '../store/userSlice';
import GoogleOAuth from '../components/Auth/GoogleOAuth';
import useUserPerofile from '../hooks/useUserPerofile';
import TextField from '@mui/material/TextField';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Divider from '@mui/material/Divider'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { userData, loading } = useUserPerofile();

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

    useEffect(()=>{
      window.scrollTo({top: 0,left : 0,behavior:"smooth"})
      
    },[])
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/login/',
        credentials,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('email', response.data.email);

        const profileRes = await axios.get(
          'http://127.0.0.1:8000/auth/user',
          { headers: { Authorization: `Bearer ${response.data.access_token}` } }
        );
        dispatch(addUserData(profileRes.data));

        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.detail || 'Login failed. Please try again.');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0 && !loading && !error) {
      dispatch(addUserData(userData));
    }
  }, [userData, loading, error, dispatch]);

  return (
    <div className='main-container'>
      <Container>

        <Row className='justify-content-center'>
          <Col md={5} >
            <h1 className='text-center my-3'>Welcome Back!</h1>

            <Form onSubmit={handleSubmit} className='' autoComplete='off' >
              <TextField
                name="username"
                label="User Name"
                variant="outlined"
                margin="normal"
                fullWidth
                value={credentials.username}
                onChange={handleChange}
              />

              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={credentials.password}
                onChange={handleChange}

              />

              {error && <p className="error text-danger text-center">{error}</p>}
              <div className='d-flex justify-content-center'>
                <Button type="submit" className="my-3 w-100" variant="primary" >
                  Sign In
                </Button>
              </div>
            </Form>
            <Divider className='fs-4'>Or</Divider>
            <div className="d-flex justify-content-center">
              <div className="px-3 my-3">
                <GoogleOAuth />
                <span className='text-center fs-5' style={{ marginLeft: -1 }}>Google</span>
              </div>
              
            </div>
            <div className="link-container my-3 text-center">
              <span className='me-1'>New to ShopKart?</span> <Link to="/register" className='text-decoration-none' >Get Started<ArrowRightAltIcon /></Link>
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Login;