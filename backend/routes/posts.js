const express = require('express');
const router = express.Router();
const Post = require('../model/posts');
const fetchUser = require('../middleware/auth');

router.get('/posts', fetchUser, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;
        const posts = await Post.find()
            .skip(skip)
            .limit(limit)
            .exec();

        const totalCount = await Post.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        res.json({ posts, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
