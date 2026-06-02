//manages create job , get job , get single job

const Job = require("../models/Job");
const { get } = require("../routes/authRoutes");

const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      postedBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "postedBy",
      "name email"
    );

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyJobs = async (req, res) => {
  try {

    const jobs = await Job.find({
      postedBy: req.user._id,
    })

    res.json(jobs)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}

const deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id)
    // finds job by id from URL

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      })
    }

    if (
      job.postedBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      })
    }
    // employer can delete only their own jobs

    await job.deleteOne()
    // removes job from MongoDB
    //To permanently remove the document from MongoDB.

    res.json({
      message: "Job deleted successfully",
    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}

const updateJob = async (req, res) => {
  try {

    const job = await Job.findById(
      req.params.id
    )

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      })
    }

    if (
      job.postedBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      })
    }

    const updatedJob =
      await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )

    res.json(updatedJob)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}

const searchJobs = async (req, res) => {
  try {

    const keyword = req.query.keyword
    // gets search text from URL

    const jobs = await Job.find({
      title: {
        $regex: keyword,          //Regex (Regular Expression) is a pattern matching technique used to search text efficiently.
        $options: "i",              //here i case insensitive
      },
    })

    res.json(jobs)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  deleteJob,
  updateJob,
  searchJobs,
};