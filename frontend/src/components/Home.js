import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div style={{ backgroundColor: "rgba(217,222,244,255)" }}>
            <nav className="bg-indigo-600 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-semibold text-lg">Stocks</div>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
                        <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
                        <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
                        <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
                    </ul>
                </div>
            </nav>
            <div className="container mx-auto flex justify-between items-center p-8">
                <div className="w-1/2">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                    <p className="text-lg text-gray-700 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris semper mauris sit amet mauris placerat, vel semper quam fermentum.</p>
                    <button className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700"><Link to="/posts">View Posts</Link></button>
                </div>

                <div className="w-1/2">
                    <img src="home.jpg" alt="Right Image" className="w-full rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default Home;
