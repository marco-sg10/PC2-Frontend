import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ResourceList from './pages/ResourceList'
import ResourceDetail from './pages/ResourceDetail'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <ResourceList />
            </PrivateRoute>
          }
        />
        <Route
          path="/resources/:id"
          element={
            <PrivateRoute>
              <ResourceDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
