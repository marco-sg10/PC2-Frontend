import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/api/auth/login', '/api/auth/register', '/api/health']

// Interceptor request: agregar JWT Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor response: manejar 401 y redirigir a login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isPublicRoute = publicRoutes.some((route) =>
      error.config?.url?.includes(route)
    )

    if (error.response?.status === 401 && !isPublicRoute) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api
