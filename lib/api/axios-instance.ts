import axios from "axios"
import { getSession } from "next-auth/react"
import { toast } from "sonner"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// The Interceptor: Runs BEFORE every request
api.interceptors.request.use(
  async (config) => {
    // getSession() works on the client-side to grab the current Auth.js session
    const session = await getSession()

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }

    return config
  },
  (error) => {
    console.error("Request Error:", error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      toast.error("Access Denied: You do not have permission for this action.")
    }
    if (error.response?.status === 401) {
      // Only toast if it's not a background refresh attempt
      toast.error("Session expired. Please log in again.")
    }
    return Promise.reject(error)
  }
)

export default api
