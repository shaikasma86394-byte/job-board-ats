import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/jobs/my-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyJobs();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Deleted");

      setJobs(
        jobs.filter((job) => job._id !== jobId)
        //To update React state immediately and remove the deleted job from UI without refreshing the page.
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="p-6">

    <h1 className="text-4xl font-bold text-white mb-8">
      Employer Dashboard
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
        >

          <h3 className="text-xl font-bold text-blue-600 mb-2">
            {job.title}
          </h3>

          <p className="text-gray-700 mb-4">
            {job.company}
          </p>

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => deleteJob(job._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete Job
            </button>

            <button
              onClick={() =>
                window.location.href =
                  `/edit-job/${job._id}`
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              Edit Job
            </button>

            <button
              onClick={() => {
                console.log("Clicked", job._id);
                window.location.href = `/applicants/${job._id}`;
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              View Applicants
            </button>

          </div>

        </div>
      ))}

    </div>

  </div>
);
}

export default EmployerDashboard;