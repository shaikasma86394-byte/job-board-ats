import { createContext, useState } from 'react'

export const AuthContext = createContext()         //Creates global shared state.

function AuthProvider({ children }) {   //Provides auth data to entire app.   and here childern means All components inside provider

  const [token, setToken] = useState(
    localStorage.getItem('token') || null     //gets token from browser storage.So user stays logged in after refresh.
  )

  const [role, setRole] = useState(
  localStorage.getItem('role') || null
  )

  return (
    <AuthContext.Provider
      value={{                               //data shared globally
        token,
        setToken,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
//Makes these values available everywhere in the app.Any component can access them using: useContext(AuthContext)
export default AuthProvider