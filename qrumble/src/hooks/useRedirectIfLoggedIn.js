import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      navigate('/home');
    }
  }, [navigate]);
};
