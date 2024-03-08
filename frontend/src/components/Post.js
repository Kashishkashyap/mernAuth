
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Posts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://mern-auth-frontend-mocha.vercel.app/posts?page=${currentPage}`, {
                    headers: {
                        "token": localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data.posts);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
        navigate(`?page=${currentPage + 1}`);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
        navigate(`?page=${currentPage - 1}`);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-1 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" >
                <h1 className="text-3xl font-bold mb-8 text-indigo-600">Posts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" >
                    {posts.map(post => (
                        <div key={post._id} className="border rounded-lg overflow-hidden">
                            <img src={post.image} className="w-full h-64 object-cover" alt="Post" />
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                <p className="text-gray-600 mb-4">{post.content}</p>
                                <p className="text-gray-500">Author: {post.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Posts;
