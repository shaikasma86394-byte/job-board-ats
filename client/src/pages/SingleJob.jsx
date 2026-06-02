import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/axios'

function SingleJob() {

  const { id } = useParams()                               //gets url value

  const [job, setJob] = useState(null)
  const [resume, setResume] = useState(null)
// stores selected PDF file

  useEffect(() => {

    const fetchJob = async () => {

      try {

        const response = await API.get(`/jobs/${id}`)

        setJob(response.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchJob()

  }, [id])

  if (!job) {
    return <h1>Loading...</h1>
  }
 
  const handleApply = async () => {         //handleApply is the function that runs when the user clicks the Apply Job button.
    try {

      const formData = new FormData()

      formData.append(
        "resume",
        resume
      )
      // sends PDF file

      const response = await API.post(
        `/applications/${job._id}`,
        formData
      )

      console.log(response.data)

      alert('Applied Successfully')

    } catch (error) {

      console.log(error)

      alert('Application Failed')
    }
  }
  

  return (
  <div className="max-w-4xl mx-auto p-6">

    <div className="bg-white rounded-2xl shadow-xl p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        {job.title}
      </h1>

      <p className="text-xl text-gray-700 mb-3">
        🏢 {job.company}
      </p>

      <p className="font-bold text-green-600 text-2xl mb-3">
        💰 ₹ {job.salary}
      </p>

      <p className="text-gray-600 mb-4">
        📍 {job.location}
      </p>

      <div className="border-t pt-4">
        <h3 className="font-bold text-lg mb-2">
          Job Description
        </h3>

        <p className="text-gray-700 leading-relaxed">
          {job.description}
        </p>
      </div>

      <div className="mt-6">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setResume(e.target.files[0])
          }
          className="border border-gray-300 rounded-lg p-2 w-full"
        />

      </div>

      <button
        onClick={handleApply}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl mt-6 font-semibold"
      >
        Apply Job
      </button>

    </div>

  </div>
)
}

export default SingleJob