import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import CandidateDashboard from '../pages/CandidateDashboard'
import EmployerDashboard from '../pages/EmployerDashboard'
import CreateJob from '../pages/CreateJob'
import Jobs from '../pages/Jobs'
import SingleJob from '../pages/SingleJob'
import MyApplications from '../pages/MyApplications'
import Applicants from '../pages/Applicants'
import MyJobs from '../pages/MyJobs'
import EditJob from '../pages/EditJob'

import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />      //if url is login . then show login component

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/jobs/:id" element={<SingleJob />} />
 

       <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
            <CandidateDashboard />
            </ProtectedRoute>
        }
        />

        <Route
        path="/employer-dashboard"
        element={
            <ProtectedRoute>
            <EmployerDashboard />
            </ProtectedRoute>
        }
        />
        

        <Route
        path="/create-job"
        element={
            <ProtectedRoute>
            <CreateJob />
            </ProtectedRoute>
        }
        />

        <Route
        path="/my-applications"
        element={
          <ProtectedRoute>
            <MyApplications />
          </ProtectedRoute>
        }
      />

      <Route
      path="/applicants/:jobId"
      element={
        <ProtectedRoute>
          <Applicants />
        </ProtectedRoute>
      }
      />

      <Route
        path="/my-jobs"
        element={
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-job/:id"
        element={
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        }
      />   // opens edit page for selected job 


    </Routes>
  )
}

export default AppRoutes

