import mongoose from 'mongoose';
import config from './config';
//Connection file for connecting mongoDB

mongoose.Promise = global.Promise;
mongoose.connect(config.connectionString, { useNewUrlParser: true })
.then(() => {
    console.log('Connected to the database!');
})
.catch((err) => {
    console.log('Connection failed', err);
});

module.exports = { mongoose };
