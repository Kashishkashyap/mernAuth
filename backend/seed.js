const mongoose = require('mongoose');
const Post = require('./model/posts');

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connected");

    const postData = [
        {
            "title": "10 Tips for Successful Investing in the Stock Market",
            "content": "Learn the best strategies for investing in the stock market and maximize your returns.",
            "author": "John Doe",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDg_UaSG8-i0YIDt---CgLgJbfCEiyIXkOMw&usqp=CAU"
        },
        {
            "title": "Navigating Volatility: How to Stay Calm Amid Market Turbulence",
            "content": "Discover effective strategies to navigate market volatility and protect your investments.",
            "author": "Jane Smith",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7MWaXWOGCFM-VYpCP107FSlr0nT4ZF7GkBA&usqp=CAU"
        },
        {
            "title": "The Future of Stock Market Investing: Trends to Watch",
            "content": "Explore emerging trends in the stock market and capitalize on future opportunities.",
            "author": "Michael Johnson",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmOMDKAqnDOLnuXs6U95Lys8BPdZ8KDa3PHg&usqp=CAU"
        },
        {
            "title": "Mastering Technical Analysis: A Comprehensive Guide",
            "content": "Learn how to analyze stock charts and make informed investment decisions.",
            "author": "Emily Johnson",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPhAv2k100NzUILLfsJPQGuCjR17a33CCig&usqp=CAU"
        },
        {
            "title": "The Psychology of Investing: How Emotions Impact Your Decisions",
            "content": "Understand the psychological factors that influence investment decisions and how to overcome them.",
            "author": "David Williams",
            "image": "data:image/jpeg;base64,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"
        }
    ];
    Post.deleteMany({}).then(() => {
        console.log('Posts deleted');
    })
        .catch(err => console.error('Error deleting post data:', err));

    Post.insertMany(postData)
        .then(() => {
            console.log('Post data inserted successfully');
            mongoose.disconnect();
        })
        .catch(err => console.error('Error inserting post data:', err));
});
