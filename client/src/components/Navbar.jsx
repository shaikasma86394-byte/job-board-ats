import { Link } from 'react-router-dom'               // link is a react router navigation component
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Navbar() {

  const {
    token,
    setToken,
    role,
    setRole
  } = useContext(AuthContext)      // gets auth data from global Context

  const handleLogout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('role')

    setToken(null)
    setRole(null)

    // removes token and role from Context
    // Navbar changes automatically after logout
  }

 return (
    <nav className="bg-white shadow-md text-white px-8 py-4 shadow-lg">
      {/* Navbar background, text color, padding, shadow */}

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Container
            max-w-7xl = prevents content stretching too much
            mx-auto = center container
            flex = horizontal layout
            justify-between = logo left, links right
            items-center = vertically align items
        */}

        <h1 className="text-3xl font-bold text-blue-600">
          CareerHub
        </h1>
        {/* Website Logo / Brand Name */}

        <div className="flex items-center gap-6">
          {/* Navigation links section */}

          <Link
            to="/"
            className="text-gray-700
            hover:text-blue-600"
          >
            Home
          </Link>
          {/* Home link */}

          {
            token && role === "candidate" && (
              <>
                {/* Show only for candidate */}

                <Link
                  to="/jobs"
                  className="
                  text-gray-700
                  hover:text-blue-600"
                >
                  Jobs
                </Link>

                <Link
                  to="/my-applications"
                  className="
                  text-gray-700 hover:text-blue-600"
                >
                  My Applications
                </Link>
              </>
            )
          }

          {
            token && role === "employer" && (
              <>
                {/* Show only for employer */}

                <Link
                  to="/create-job"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Create Job
                </Link>

                <Link
                  to="/my-jobs"
                  className="text-gray-700 hover:text-blue-600"
                >
                  My Jobs
                </Link>

                <Link
                  to="/employer-dashboard"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Applicants
                </Link>
              </>
            )
          }

          {
            !token && (
              <>
                {/* Show when user is not logged in */}

                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
              </>
            )
          }

          {
            token && (
              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  px-4
                  py-2
                  rounded
                  hover:bg-red-600
                "
              >
                Logout
              </button>
            )
          }
          {/* Show logout button only after login */}

        </div>

      </div>

    </nav>
  )
}

export default Navbar