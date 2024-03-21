import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {


  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null,
  });

  const loginWithToken = async (token) => {
    localStorage.setItem('token', token);
    setAuthState({
      isAuthenticated: true,
      token: token,
      user: null, 
    });

    await fetchUserDetails(token);
        
    
  };

  const fetchUserDetails = useCallback(async (token) => {
    try {
      const userDetailResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userDetail`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (userDetailResponse.status === 200) {
        setAuthState(prevState => ({
          ...prevState,
          user: userDetailResponse.data,
        }));
      } else {
        console.error('Could not fetch user details.');
      }
    } catch (error) {
      logout();
      console.error('Error fetching user details:', error);
    }
  });


  
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, credentials);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);

        setAuthState({
          isAuthenticated: true,
          token: response.data.accessToken,
          user: null, 
        });

        await fetchUserDetails(response.data.accessToken);
        
        return response.data;
      }
    } catch (error) {
      logout();
      console.error('Login or user detail fetch error:', error.response ? error.response.data : error.message);
      throw error; 
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, loginWithToken, logout , fetchUserDetails}}>
      {children}
    </AuthContext.Provider>
  );
};
