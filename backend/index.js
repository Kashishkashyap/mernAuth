const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express();
const userAuth = require('./routes/user');
const post = require('./routes/posts');
const path = require('path');
app.use(cors(
    // {
    //     origin: "",
    //     method: ["GET", "POST"],
    //     credentials: true
    // }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DataBase Connected");
});


app.use('/', userAuth);
app.use('/', post);

app.get('/', (req, res) => {
    res.send("Hi")
})
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})