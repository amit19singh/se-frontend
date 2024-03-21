import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  useEffect(() => {
    console.log("HERE");
    // On component mount, check if the user is authenticated via OAuth
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token).then(() => {
        // Optionally, update isAuthenticated based on successful fetch
        setAuthState(prevState => ({
          ...prevState,
          isAuthenticated: true,
          token: token, // Ensure token is correctly set
        }));
      }).catch(err => console.error("Failed to fetch user details with token:", err));
    }
  }, []);

  
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null,
  });

  const fetchUserDetails = useCallback(async (token) => {
    console.log("YESS");
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
      // logout();
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
    <AuthContext.Provider value={{ ...authState, login, logout , fetchUserDetails}}>
      {children}
    </AuthContext.Provider>
  );
};
