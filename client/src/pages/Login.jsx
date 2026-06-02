import { useState } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

import { useContext } from 'react'                          //Used to access global context data.
import { AuthContext } from '../context/AuthContext'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { setToken , setRole} = useContext(AuthContext)          //Get auth data from AuthProvider

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await API.post('/auth/login', {
        email,
        password,
      })

      console.log(response.data)

      localStorage.setItem('token', response.data.token)               //Save token in browser storage
      localStorage.setItem('role', response.data.role)

      setToken(response.data.token)   //without this Context state doesn't know login happened $ only localstorage updates
      //stores token in Context. So Navbar re-renders automatically.
      setRole(response.data.role)

      alert('Login Successful')
      
      if (response.data.role === 'candidate') {
            navigate('/dashboard')
      } else {
            navigate('/employer-dashboard')
      }

    } catch (error) {

      console.log(error)

      alert('Login Failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#071133] flex justify-center items-center px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
          Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Welcome back to CareerHub
        </p>

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
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login