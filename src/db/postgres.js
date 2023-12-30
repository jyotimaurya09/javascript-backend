
/*
const express = require('express');
// const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/tasks');
const { Pool } = require('pg');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const connectionString = process.env.DATABASE_URL;
*/
/*
// Create a PostgreSQL connection pool
const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }, // Required for connecting to some hosted databases
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Check connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL database:', err));


const result = pool.query('SELECT * FROM tasks', (err, res) => {
    if (!err) {
        onsole.log('Got result');
        return 1;
        //return result.rows.map(row => new Task(row.id, row.title, row.description, row.due_date, row.priority, row.completed));
    } else {
        console.error('Error executing query', err);
        throw err;
    }
});
*/
/*
// Middleware to parse JSON requests
app.use(express.json());

console.log("Atleast json is parsed");

// Use task routes
app.use('/api', taskRoutes)
*/
/*
console.log("Atleast json is parsed");
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = () => pool;
*/