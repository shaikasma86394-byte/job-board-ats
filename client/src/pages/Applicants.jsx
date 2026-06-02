import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/axios'
import { Link } from "react-router-dom";

function Applicants() {

  const { jobId } = useParams()

  const [applications, setApplications] = useState([])

  useEffect(() => {

    const fetchApplicants = async () => {

      try {

        const response = await API.get(
          `/applications/job/${jobId}`
        )
        console.log(response.data)
        setApplications(response.data)
        

      } catch (error) {
        console.log(error)
      }
    }

    fetchApplicants()

  }, [jobId])

  const updateStatus = async (id, status) => {
    try {

      await API.patch(
        `/applications/${id}/status`,
        { status }
      )

      setApplications(
        applications.map((application) =>
          application._id === id
            ? { ...application, status }
            : application
        )
      )

      alert('Status Updated')

    } catch (error) {

      console.log(error)
    }
  }

  return (
  <div className="p-6">

    <h1 className="text-4xl font-bold text-white mb-8">
      Applicants
    </h1>

    <div className="grid md:grid-cols-2 gap-6">

      {
        applications.map((application) => (
          <div
            key={application._id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
          >

            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              {application.applicant.name}
            </h2>

            <p className="text-gray-600 mb-3">
              {application.applicant.email}
            </p>

            <p
              className={`font-semibold mb-4 ${
                application.status === "accepted"
                  ? "text-green-600"
                  : application.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-500"
              }`}
            >
              Status: {application.status}
            </p>

            {
              application.resume && (
                <a
                  href={`http://localhost:5000/uploads/${application.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
                >
                  View Resume
                </a>
              )
            }

            <div className="flex gap-3">

              <button
                onClick={() =>
                updateStatus(
                  application._id,
                  'accepted'
                )
              }
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Accept
              </button>

              <button
                onClick={() =>
                updateStatus(
                  application._id,
                  'rejected'
                )
              }
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>

            </div>

          </div>
        ))
      }

    </div>

  </div>
)
}

export default Applicants