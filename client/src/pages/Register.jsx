import { useState } from 'react'
import API from '../api/axios'

function Register() {

  const [name, setName] = useState('')                         //React stores input data in state.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('candidate')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
            const response = await API.post('/auth/register', {
            name,
            email,
            password,
            role
        })
        console.log(response.data)
        alert('Registration Successful')
    } catch (error) {
            console.log(error)
            alert('Registration Failed')
        }
    }

    return (
    <div className="min-h-screen bg-[#071133] flex justify-center items-center px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
          Register
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your CareerHub account
        </p>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:border-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
        >
          Register
        </button>

      </form>

    </div>
  )
}

export default Register