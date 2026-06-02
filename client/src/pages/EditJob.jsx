import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditJob() {

  const { id } = useParams();
  // gets job id from URL , useParams extracts dynamic values from the URL such as job id.

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  // form states

  useEffect(() => {

    const fetchJob = async () => {

      try {

        const { data } = await axios.get(
          `http://localhost:5000/api/jobs/${id}`
        );

        setTitle(data.title);
        setCompany(data.company);
        setLocation(data.location);
        setSalary(data.salary);
        setDescription(data.description);

      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();

  }, [id]);
  // loads existing job data into form

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/jobs/${id}`,
        {
          title,
          company,
          location,
          salary,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Updated");

      navigate("/employer-dashboard");

    } catch (error) {

      console.log(error);

      alert("Update Failed");
    }
  };

  return (
  <div className="flex justify-center items-center min-h-screen p-6">

    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
        Edit Job
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Update your job details
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Title"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          placeholder="Company"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          placeholder="Location"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          value={salary}
          onChange={(e) =>
            setSalary(e.target.value)
          }
          placeholder="Salary"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Description"
          rows="5"
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Update Job
        </button>

      </form>

    </div>

  </div>
);
}

export default EditJob;