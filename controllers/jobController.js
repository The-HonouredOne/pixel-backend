const { json } = require('express');
// const Job = require('../models/Job');
const JobModel = require('../models/Job')
const Application = require('../models/Application');

// ------------------------create a job---------------------
exports.createJob = async (req, res) => {
  try {
    const { title, company, description, location, salary } = req.body;

    const job = new JobModel({
      title,
      company,
      description,
      location,
      salary,
      createdBy: req.user.id
    });

    await job.save();
    res.status(201).json({ status: true, msg: "Job created", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, msg: "Server error", error: error.message });
  }
};

// -----------get all jobs------------------------
exports.getAllJobs = async (req, res) => {
  try {
    const alljobs = await JobModel.find({});

    if (!alljobs) return res.json({ status: false, msg: 'no jobs available' })

    res.json({
      status: true,
      msg: "All jobs fetched ",
      jobs: alljobs
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};

// ---------------------------get job by id----------------------------
exports.getJobsbyId = async (req, res) => {
  try {
    const { id } = req.params
    const getjob = await JobModel.findById(id);

    if (!getjob) return res.json({ status: false, msg: 'no jobs available' })
    res.json({
      status: true,
      msg: "job fetched ",
      jobs: getjob
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};

// -------------------------update a job ---------------------
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("hello")
    const updates = req.body;


    const updatedJob = await JobModel.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      updates,
      { new: true, runValidators: true, lean: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ status: false, msg: "Job not found or not authorized" });
    }

    res.json({ status: true, msg: "Job updated", job: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};


// ----------------------------delete a job------------------------------
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    let filter = { _id: id };


    if (req.user.role === "employ") {
      filter.createdBy = req.user.id;
    }

    console.log(req.user.id)



    const deletedJob = await JobModel.findOneAndDelete(filter);

    if (!deletedJob) {
      return res.status(404).json({
        status: false,
        msg: "Job not found or not authorized to delete"
      });
    }

    res.json({
      status: true,
      msg: "Job deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};

// ----------------------apply to job-------------------
// exports.applyJob = async (req,res) => {
//   try {

//     const jobid = req.params.id;

//     const job = await JobModel.findById(jobid)

//     if (!job) return res.status(404).json({ status: false, msg: 'job not found' })

//     if (job.applicants.includes(req.user.id)) return res.status(400).json({ status: false, msg: 'already applied to this job' })

//     job.applicants.push(req.user.id);
//     await job.save()

//     res.status(200).json({
//       status: true,
//       msg: "Applied successfully",
//       job
//     });
//   } catch (error) {
//     console.error("Error applying job:", error);
//     res.status(500).json({ status: false, msg: "Server error" });
//   }
// };




exports.applyJob = async (req, res) => {
  try {
    const  jobId  = req.params.id;
    const { name, email, resume, coverLetter } = req.body;
    const userId = req.user.id;

    console.log(userId, jobId)

    const existingApp = await Application.findOne({ job: jobId, user: userId });
    if (existingApp) {
      return res.status(400).json({ message: "You already applied for this job" });
    }

    const application = new Application({
      job: jobId,
      user: userId,
      name,
      email,
      resume,
      coverLetter
    });

    await application.save();

    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// --------------------------toggle status of job----------------------
exports.toggleJobStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await JobModel.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = job.status === "active" ? "closed" : "active";
    await job.save();

    res.json({ message: `Job ${job.status} successfully`, job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





