const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const {
  applyJob,
  getApplicantsForJob,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const router = express.Router();

router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("employer"),
  getApplicantsForJob
);

router.get(
  "/my-applications",
  protect,
  authorizeRoles("candidate"),
  getMyApplications
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("employer"),
  updateApplicationStatus
);

router.post(
  "/:jobId",
  protect,
  authorizeRoles("candidate"),
  upload.single("resume"),                          //It tells Multer to accept one uploaded file from the form field named resume.
  applyJob
);

module.exports = router;