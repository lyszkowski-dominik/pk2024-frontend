import './App.css'
import { Route, Routes, useNavigate } from 'react-router'
import LoginPage from './pages/LoginPage'
import Menu from './components/menuBar/Menu'
import HomePage from './pages/HomePage'
import UserProfile from './pages/UserProfile'
import { validateToken } from './utils/ValidateToken'
import { useEffect } from 'react'

const App = () => {
  const isTokenValid = validateToken()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isTokenValid) {
      navigate('/login', { replace: true })
    }
  }, [navigate, isTokenValid])
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default App
