import { useState } from 'react'
import API from '../api/axios'
import "./CreateJob.css";

function CreateJob() {

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [salary, setSalary] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await API.post('/jobs', {
        title,
        company,
        salary,
        location,
        description,
      })

      console.log(response.data)

      alert('Job Created Successfully')

    } catch (error) {

      console.log(error)

      alert('Failed To Create Job')
    }
  }

  return (
    <div className="create-job-page">
      <div className="form-container">

        <h2>Create New Job</h2>

        <p className="form-subtitle">
          Post a job and find the best candidates
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="text"
            placeholder="Salary (₹)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="create-btn"
          >
            Create Job
          </button>

        </form>

      </div>
    </div>
  )
}

export default CreateJob