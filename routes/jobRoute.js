const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobsbyId , updateJob, deleteJob, applyJob} = require('../controllers/jobController');
const { protect, allowRoles,   } = require('../middleware/authMiddleware');



router.post('/create', protect, allowRoles('employer'), createJob)
router.get('/', getAllJobs)
router.get('/:id', getJobsbyId)
router.put('/:id', protect, allowRoles('employer'), updateJob)
router.delete('/:id', protect, allowRoles('employer'), deleteJob) 
router.post('/:id/apply', protect, allowRoles('jobseeker'), applyJob)



module.exports = router;