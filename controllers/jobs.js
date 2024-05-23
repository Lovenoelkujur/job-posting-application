const jobModel = require("../models/jobs");

const createJob = async(req, res) => {
    try {
        const jobObj = req.body;
        const newJob = new jobModel(jobObj);
        const newlySavedJob = await newJob.save();
        console.log(newlySavedJob);
    
        res.status(201).json({
            success : true,
            message : "Job Created Successfully",
            jobId : newlySavedJob._id,
        });
    } 
    catch (error) {
        res.status(404).json({
            success : false,
            message : "Something went wrong please try again later",
        })
    }
};

const listJob = async(req, res) => {
    try {
        const {minSalary, maxSalary} = req.query;
    
        const jobList = await jobModel.find({
            $and: [
                {
                    salary : {$gte : minSalary}
                },
                {
                    salary : {$lte : maxSalary}
                }
            ]
        });
        console.log(jobList);
    
        res.status(200).json({
            success : true,
            message : "Job Data Fetch Successfully",
            data : jobList,
        });   
    } 
    catch (error) {
        res.status(404).json({
            success : false,
            message : "Something went wrong please try again later",
        })
    }
};

const editJob = async(req, res) => {
    try {
        const jobId = req.params.id;
        console.log(jobId);
        console.log(req.body);
        await jobModel.findByIdAndUpdate(jobId, req.body);
    
        res.status(200).json({
            success : true,
            message : "Job Updated Successfully",
        });
    } 
    catch (error) {
        res.status(404).json({
            success : false,
            message : "Something went wrong please try again later",
        })
    }
};

const deleteJob = async(req, res) => {
    const jobId = req.params.id;
    await jobModel.findByIdAndDelete(jobId);

    res.status(200).json({
        success : true,
        message : "Job Deleted Successfully",
    });
};

const jobController = {
    createJob,
    listJob,
    editJob,
    deleteJob,
};

module.exports = jobController;