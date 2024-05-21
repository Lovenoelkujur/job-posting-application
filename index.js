const express = require("express");
const mongoose = require("mongoose");

const jobRoutes = require("./routes/jobs")

const PORT = 9000;

const app = express();

// JSON Middleware
app.use(express.json());

// Connection of MongoDB
mongoose.connect("mongodb://localhost:27017/jobapp")
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