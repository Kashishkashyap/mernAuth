import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", name: "" });
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreeTerms) {
            props.showAlert("Please agree to the Terms & Conditions", "danger");
            return;
        }
        if (credentials.password !== credentials.confirmPassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }
        const response = await fetch(`https://mern-auth-beige.vercel.app/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: credentials.username, email: credentials.email, password: credentials.password, name: credentials.name })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            props.showAlert("Account created Successfully", "success")
            navigate('/posts');
        } else {
            props.showAlert("Invalid Credentials", "danger")
            navigate('/signup');
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-5">
            <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col lg:flex-row w-full max-w-4xl">
                <div className="lg:w-1/2 p-8 hidden lg:flex items-center justify-center" style={{ backgroundColor: "rgba(137,151,239,255)" }}>
                    <img src="login.jpg" alt="Signup" className="h-auto w-full max-h-full object-cover" />
                </div>

                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mb-6 text-indigo-600">Get Started</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="form-label">Username</label>
                            <input className="form-control p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" type="text" id="username" onChange={onChange} name="username" minLength={3} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" required />
                        </div>
                        <div>
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" id="name" onChange={onChange} name="name" minLength={3} required />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" onChange={onChange} id="password" name="password" minLength={6} required />
                            <button type="button" className="absolute inset-y-5 right-0 px-3 py-2" onClick={togglePasswordVisibility}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" onChange={onChange} id="confirmPassword" name="confirmPassword" minLength={6} required />
                            <button type="button" className="absolute inset-y-5 right-0 px-3 py-2" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="agreeTerms" className="mr-2" checked={agreeTerms} onChange={handleCheckboxChange} />
                            <label htmlFor="agreeTerms" className="text-gray-600">I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms & Conditions</a></label>
                        </div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                    </form>
                    <p className="mt-6 text-sm text-gray-500">Already have an account? <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;
