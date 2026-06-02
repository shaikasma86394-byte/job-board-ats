
import axios from 'axios'

const API = axios.create({                                    //creates a custom axios object.
  baseURL: 'http://localhost:5000/api',        // baseURL means common backend url
})

API.interceptors.request.use((req) => {             //interceptor means Runs before every request

  const token = localStorage.getItem('token')

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

export default API