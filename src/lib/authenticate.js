import { jwtDecode } from "jwt-decode";

// Function to set token in localStorage
export function setToken(token){
  console.log('Setting token in localStorage:', token);
  localStorage.setItem('access_token', token);
}

// Function to get token from localStorage
export function getToken(){
    return localStorage.getItem('access_token');
}

// Function to read and decode token
export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

// Function to check if user is authenticated
export function isAuthenticated(){
  const token = readToken();  
  return (token) ? true : false;
}

// Function to remove token from localStorage
export function removeToken(){
  localStorage.removeItem('access_token');
}

