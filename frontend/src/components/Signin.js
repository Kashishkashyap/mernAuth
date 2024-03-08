import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://mern-auth-beige.vercel.app/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('userId', json.userId);
            props.showAlert("Welcome Back!! Email sent", "success")
            navigate('/posts');
        } else {
            props.showAlert("Enter Valid Details", "danger")
            navigate('/signin');
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col lg:flex-row w-full max-w-4xl">
                <div className="lg:w-1/2 p-8 hidden lg:flex items-center justify-center" style={{ backgroundColor: "rgba(137,151,239,255)" }}>
                    <img src="login.jpg" alt="Signup" className="h-auto w-full max-h-full object-cover" />
                </div>

                <div className="w-full lg:w-1/2 p-8">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-bold text-indigo-600 ">Welcome Back!!</h1>
                        <p className="mb-8 ">Sign in to access your account</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                <input type="email" id="email" name="email" autoComplete="email" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={credentials.email} onChange={onChange} />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="current-password" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={credentials.password} onChange={onChange} />
                                <button type="button" className="absolute inset-y-5 right-0 px-3 py-2" onClick={togglePasswordVisibility}>
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign In
                            </button>
                        </form>
                        <p className="mt-4 text-sm text-center text-gray-500">Don't have an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
