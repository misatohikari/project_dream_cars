import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Register = () => {
    const [userName, setUserName] = useState(''); // Adjusted to match schema
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();


    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        try {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
                method: "POST",
                body: JSON.stringify({ userName, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to register user: ${errorText}`);
            }

            router.push('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 pt-4">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    <div className="card shadow">
                        <Image src="/register2.jpg" alt="" className="card-img" width={1000} height={600} />     
                        <div className="card-body">
                            <h5 className="card-title">Register</h5>
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={handleRegister} className="validated-form">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="userName">Username</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password2">Confirm Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        id="password2"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                        required
                                    />
                                </div>
                                <button className="btn btn-success btn-block" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;


