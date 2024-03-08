import React, { useState, useEffect } from 'react';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/posts', {
                    headers: {
                        "token": localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        // <div>
        //     <h1>Posts</h1>
        //     {posts.map(post => (
        //         <div key={post._id}>
        //             <h2>{post.title}</h2>
        //             <p>{post.content}</p>
        //             <p>Author: {post.author}</p>
        //             <img src={post.image} alt="Post" />
        //         </div>
        //     ))}
        // </div>
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-1 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold mb-8 text-indigo-600">Posts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>
        </div>

    );
};

export default Posts;
