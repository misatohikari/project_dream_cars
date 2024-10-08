import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userAtom } from '../state/atoms';
import { setToken } from '../lib/authenticate';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const router = useRouter();
    const [user, setUser] = useAtom(userAtom);
  
    // function to call user api for login
    const login = async (data) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: data.userName, password: data.password }),
          });
      
          if (!response.ok) {
            const errorText = await response.text(); // Capture error text from the response
                throw new Error(`Login failed: ${errorText}`);
          }
      
          const result = await response.json();
      
          console.log('Parsed response:', result); // Log parsed response
      
          if (result.user && result.token) { // if find user and token is generated
            setUser(result.user);
            setToken(result.token); // Ensure the token format is correct
            console.log(`User is:`, result.user)
            return result;
          } else {
            throw new Error('Invalid response format');
          }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message); // Set error message for display
        }
      };
      
    const onSubmit = async (data) => { // once user submit the login data, call the login function with the passed data. if success, go to dashboard. 
        try {
            console.log('onSubmit called with data:', data);
            await login(data);
            const redirectPath = router.query.redirect || '/dashboard';
            
            router.push(redirectPath);
        } catch (err) {
            console.error('Error in onSubmit:', err);
            setError('Invalid credentials - ' + err.message);
        }
    };
  
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 pt-4">
            <div className="row">
                <div className="col-md-6 offset-md-4 col-xl-4 offset-xl-4">
                    <div className="card shadow">
                        <Image src="/login.webp" alt="" className="card-img" width={1000} height={600} layout='responsive' priority/>     
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={handleSubmit(onSubmit)} className="validated-form">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="userName">Username</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        {...register('userName')}
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        id="password"
                                        {...register('password')}
                                        required
                                    />
                                </div>
                                <button className="btn btn-success btn-block" type="submit">Login</button>
                            </form>
                            <p className="mt-3">
                                Don&apos;t have an account? <Link href="/register">Register here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;



