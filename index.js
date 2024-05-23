const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const jobRoutes = require("./routes/jobs")

const PORT = 10000;

const app = express();

dotenv.config();

// JSON Middleware
app.use(express.json());
// console.log("URL:-", process.env.DB_CONNECTION_URL);

// Connection of MongoDB
mongoose.connect(process.env.DB_CONNECTION_URL)
.then(() => 
    console.log("Connection with Database Eastablished Successfully")
)
.catch((err) => 
    console.log("Error Connecting with Database", err)
)

// Routes
app.use(jobRoutes)


app.listen(PORT, () => {
    console.log(`Job Posting Server running at port ${PORT}`);
})
