import { useEffect, useState } from 'react'
import API from '../api/axios'
import { Link } from 'react-router-dom'

function Jobs() {

  const [jobs, setJobs] = useState([])                        //store jobs
  const [keyword, setKeyword] = useState('')
// stores search text

   // fetch all jobs from backend
  const fetchJobs = async () => {

    try {

      const response = await API.get('/jobs')

      setJobs(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {                                                       //useeffect : runs code when page reloads
    fetchJobs()
  }, [])

  const searchJobs = async () => {

  try {

    const response = await API.get(
      `/jobs/search?keyword=${keyword}`
    )

    setJobs(response.data)
    // updates jobs with search results

  } catch (error) {

    console.log(error)
  }
}

  return (
  <div className="p-6">

    <h1 className="text-4xl font-bold text-white mb-6">
      All Jobs
    </h1>

    <div className="mb-8 flex flex-wrap gap-3">

      <input
        type="text"
        placeholder="Search Jobs"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        className="px-4 py-2 rounded-lg border border-white bg-transparent text-white placeholder:text-white w-72"
      />

      <button
        onClick={searchJobs}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Search
      </button>

      <button
        onClick={fetchJobs}
        className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
      >
        Show All
      </button>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {
        jobs.map((job) => (                                                       //maps : display list
        <Link
            to={`/jobs/${job._id}`}
            key={job._id}
            >
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300 h-full">

                <h2 className="text-xl font-bold text-blue-600 mb-2">
                {job.title}
                </h2>

                <p className="text-gray-700 mb-2">
                  🏢 {job.company}
                </p>

                <p className="text-gray-600 mb-2">
                  📍 {job.location}
                </p>

                <p className="font-bold text-green-600 text-lg">
                  ₹ {job.salary}
                </p>

            </div>
        </Link>
        ))
      }

    </div>

  </div>
)
}

export default Jobs