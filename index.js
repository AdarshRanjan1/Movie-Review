import app from './server.js';
import { MongoClient } from 'mongodb';
import reviewsDAO from './dao/reviewsDAO.js';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const port = 8000;

MongoClient.connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
})
    .catch((err) => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        console.log("✅ MongoDB connected");
        await reviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    });



// import app from './server.js';
// import mongodb from 'mongodb';
// import reviewsDAO from './dao/reviewsDAO.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const MongoClient = mongodb.MongoClient;
// const mongo_username = process.env['MONGODB_USERNAME'];
// const mongo_password = process.env['MONGODB_PASSWORD'];
// const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.akxbayh.mongodb.net/`;

// const port = 8000;

// MongoClient.connect(
//     uri,
//     {
//         maxPoolSize: 50,
//         wtimeoutMS: 2500,
//         useNewUrlParser: true
//     })
//     .catch((err) => {
//         console.error(err.stack);
//         process.exit(1);
//     })
//     .then(async client => {
//         console.log("✅ MongoDB connected");
//         await reviewsDAO.injectDB(client);
//         app.listen(port, () => {
//             console.log(`Server is listening on ${port}...`);
//         });
//     });




// const app = require('./server.js');
// const mongodb = require('mongodb');
// const reviewsDAO = require('./dao/reviewsDAO.js');
// require('dotenv').config();

// const MongoClient = mongodb.MongoClient;
// const mongo_username = process.env['MONGODB_USERNAME'];
// const mongo_password = process.env['MONGODB_PASSWORD'];
// const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.akxbayh.mongodb.net/`;

// const port = 8000;

// MongoClient.connect(
//     uri,
//     {
//         maxPoolSize: 50,
//         wtimeoutMS: 2500,
//         useNewUrlParser: true
//     })
//     .catch((err) => {
//         console.error(err.stack);
//         process.exit(1);
//     })
//     .then(async client => {
//         await reviewsDAO.injectDB(client);
//         app.listen(port, () => {
//             console.log(`Server is listening on ${port}...`);
//         })
//     })