// Make imports
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import mongoose from './db/mongoose';

// Import all routes
import user from './routes/user';
import blog from './routes/blog';
import comment from './routes/comment';

// Initialize our express App
const app = express();

// Access to req.body and querystring - or any request params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Declare static content
app.use(express.static('public'));

// Register the app routes
app.use('/user', user);
app.use('/comment', comment);
app.use('/blog', blog);

// Set up http server
const port = process.env.PORT || config.port;
const hostName = 'http://localhost:' + port;
app.listen(port, () => {
    console.log('Application running on -', hostName);    
});

