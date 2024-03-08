const express = require('express');
const router = express.Router();
const Post = require('../model/posts');
const fetchUser = require('../middleware/auth')

router.get('/posts', fetchUser, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
