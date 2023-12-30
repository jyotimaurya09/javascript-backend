import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Creating an instance of the Express application
const app = express();

// Setting up CORS middleware to handle cross-origin requests
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Setting a limit of 16 KB on JSON data to prevent large payloads
app.use(express.json({limit: process.env.JSON_LIMIT}));

// Allowing extended URLs and setting a limit of 16 KB on URL-encoded data
app.use(express.urlencoded({
    extended: true,
    limit: process.env.URL_LIMIT
}));

// Serving static assets from the "public" directory
app.use(express.static("public"));

// Adding cookie parsing middleware to handle cookies in requests and responses
app.use(cookieParser());

export {app};