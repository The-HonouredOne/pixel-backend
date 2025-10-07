const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobsbyId , updateJob, deleteJob, applyJob, toggleJobStatus} = require('../controllers/jobController');
const { protect, allowRoles,   } = require('../middleware/authMiddleware');



router.post('/create', protect, allowRoles('employ'), createJob)
router.get('/', getAllJobs)
router.get('/:id', getJobsbyId)
router.put('/:id', protect, allowRoles('employ'), updateJob)
router.delete('/:id', protect, allowRoles('employ'), deleteJob) 
router.post('/:id/apply', protect, allowRoles('jobseeker'), applyJob)
router.put('/:id/togglestatus', protect, allowRoles('employ', 'admin'), toggleJobStatus)




module.exports = router;