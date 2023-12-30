// index.js
import { config } from 'dotenv';
import connectDB from './db/mongoDb.js';
import {app} from './app.js';

// Load environment variables from .env file
config();

// Retrieve the port number from environment variables
const PORT = process.env.PORT;

// Connect to Database
connectDB()
.then( () => {
    app.listen(PORT, () => {
        // Start the Express server and listen on the specified port
        console.log(`Server is running at port : ${PORT}`);
    })
})
.catch((error) => {
    // Log an error message if MongoDB connection fails
    console.log("MongoDB connection failed !!! ", err);
});