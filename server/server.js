const express = require("express");
const path = require("path");
const dotenv = require("dotenv");                         //vthout this , node.js cannot read these vars
const cors = require("cors");      
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();      
connectDB();

const app = express();

app.use(cors());                            //enables comminucation --> “Allow frontend to talk to backend.”
app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
// makes uploaded files publicly accessible

app.use("/api/auth", authRoutes);           // All routes inside authRoutes.js
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;                    //reading the value from .env.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});