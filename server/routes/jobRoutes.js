const express = require("express");
const { createJob , getJobs, getJobById, getMyJobs , deleteJob, updateJob, searchJobs, } = require("../controllers/jobController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(                       //otherwise Express will think "my-jobs" is an ID.
  "/my-jobs",
  protect,
  authorizeRoles("employer"),
  getMyJobs
);

router.get(
  "/search",
  searchJobs
);
// search jobs by title

router.get("/", getJobs);

router.delete(
  "/:id",
  protect,
  authorizeRoles("employer"),
  deleteJob
);
// only employer can delete jobs

router.put(
  "/:id",
  protect,
  authorizeRoles("employer"),
  updateJob
);
// only employer can update own jobs

router.get("/:id", getJobById);

router.post(
  "/",
  protect,
  authorizeRoles("employer"),
  createJob
);

module.exports = router;