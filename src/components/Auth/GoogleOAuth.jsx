import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUserPerofile from '../../hooks/useUserPerofile';
import { useDispatch } from 'react-redux';
import { addUserData } from '../../store/userSlice';
import { Button } from 'react-bootstrap';

function GoogleOAuth({behaviour}) {
  console.log(behaviour)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, loading, error } = useUserPerofile();

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/google/",
        { token },
        { withCredentials: true }
      );


      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      // Fetch profile immediately after login
      const profileRes = await axios.get("http://127.0.0.1:8000/auth/user/", {
        headers: { Authorization: `Bearer ${res.data.access_token}` }
      });
      dispatch(addUserData(profileRes.data));

      alert("Login success!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // Hydrate Redux when hook returns valid data
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0 && !loading && !error) {
      dispatch(addUserData(userData));
    }
  }, [userData, loading, error, dispatch]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Login Failed")}
          type='icon'
          theme='filled_blue'
          shape='circle'
          logo_alignment='center'
          size='large'
          context="use"
          text={behaviour}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleOAuth;