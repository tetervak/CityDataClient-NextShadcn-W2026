import axios from "axios"
import { getSession } from "next-auth/react"

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
    return Promise.reject(error)
  }
)

export default api
