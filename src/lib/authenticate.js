import { jwtDecode } from "jwt-decode";

export function setToken(token){
  console.log('Setting token in localStorage:', token);
  localStorage.setItem('access_token', token);
}

export function getToken(){
    return localStorage.getItem('access_token');
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated(){
  const token = readToken();  
  return (token) ? true : false;
}

export function removeToken(){
  localStorage.removeItem('access_token');
}

// export async function authenticateUser(userName, password) {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
//     method: "POST",
//     body: JSON.stringify({ userName: userName, password: password }),
//     headers: {
//       "content-type": "application/json"
//     }
//   });
// export async function authenticateUser(userName, password) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
//     method: 'POST',
//     body: JSON.stringify({ userName, password }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await res.json();

//   if(res.status === 200){
//     setToken(data.token);
//     return true;
//   }else{
//     throw new Error(data.message);
//   } 
// }

