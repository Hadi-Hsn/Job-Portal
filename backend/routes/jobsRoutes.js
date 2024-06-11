const express = require("express");
const router = express.Router();
const {
  createJob,
  singleJob,
  updateJob,
  showJobs,
  getMyJobs,
  deleteJob,
} = require("../controllers/jobsController");
const {
  isAuthenticated,
  isEmployer,
  isAdminOrEmployer,
} = require("../middleware/auth");

//jobs routes
router.post("/job/create", isAuthenticated, isEmployer, createJob);
router.get("/job/:id", singleJob);
router.put("/job/update/:job_id", isAuthenticated, isEmployer, updateJob);
router.delete(
  "/job/delete/:job_id",
  isAuthenticated,
  isAdminOrEmployer,
  deleteJob
);
router.get("/jobs/show", showJobs);
router.get("/jobs/get-my-jobs", getMyJobs);

module.exports = router;
