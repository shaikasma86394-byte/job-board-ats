import { useEffect, useState } from 'react'
import API from '../api/axios'

function MyApplications() {

  const [applications, setApplications] = useState([])

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const response = await API.get('/applications/my-applications')

        setApplications(response.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchApplications()

  }, [])

  console.log(applications)

  return (
  <div className="p-6">

    <h1 className="text-4xl font-bold text-white mb-8">
      My Applications
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {
        applications.map((application) => (
          <div
            key={application._id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
          >

            <h2 className="text-xl font-bold text-blue-600 mb-3">
              {application.job?.title}
            </h2>

            <p className="text-green-600 font-bold text-lg mb-2">
              💰 ₹ {application.job?.salary}
            </p>

            <p
              className={`font-semibold ${
                application.status === "accepted"
                  ? "text-green-600"
                  : application.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-500"
              }`}
            >
              Status: {application.status}
            </p>

          </div>
        ))
      }

    </div>

  </div>
)
}

export default MyApplications