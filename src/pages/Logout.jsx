import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUserData } from '../store/userSlice';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    dispatch(removeUserData())
    navigate("/signin");
  }, [dispatch, navigate]);

  return null; // or a loading spinner if you want
}

export default Logout;