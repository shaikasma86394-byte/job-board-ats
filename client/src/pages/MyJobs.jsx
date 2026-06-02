import { useEffect, useState } from 'react'     //useState is used to store and update data that changes during the component lifecycle.
//useEffect is used to perform side effects such as API calls when the component loads.

import API from '../api/axios'

function MyJobs() {

  const [jobs, setJobs] = useState([])
  // stores employer jobs from backend

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const response = await API.get('/jobs/my-jobs')
        // calls backend API
        // gets only jobs created by logged-in employer

        setJobs(response.data)
        // stores jobs in React state

      } catch (error) {

        console.log(error)
      }
    }

    fetchJobs()
    // function call

  }, [])
  // [] means run only once when component loads
  //Empty dependency array means the effect runs only once after the initial render.

  return (

  <div className="p-6">

    <h1 className="text-3xl font-bold mb-6 text-white">
      My Jobs
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {
        jobs.map((job) => (
          // loops through all jobs
          //map() is used to iterate through an array and render UI elements dynamically.

          <div
            key={job._id}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300"
          >

            <h2 className="text-xl font-bold text-blue-600 mb-2">
              {job.title}
            </h2>

            <p className="text-gray-700 font-medium mb-2">
              {job.company}
            </p>

            <p className="text-gray-500">
              📍 {job.location}
            </p>

            <p className="text-green-600 font-semibold mt-2">
              💰 ₹ {job.salary}
            </p>

          </div>

        ))
      }

    </div>

  </div>

)
}

export default MyJobs