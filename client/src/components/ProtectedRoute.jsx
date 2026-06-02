// Prevent users from accessing protected pages without login. example dashboard , apply jobs , my applications 

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

function ProtectedRoute({ children }) {    //here childern means component inside protecteddRoute

  const { token } = useContext(AuthContext)

  if (!token) {
    return <Navigate to="/login" />                       //token not there then user is not untenticated . so it Redirect user to login page 
  }

  return children
}

export default ProtectedRoute