import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import WorkoutLog from './components/WorkoutLog'
import Goals from './components/Goals'
import FitnessGroups from './components/FitnessGroups'
import Auth from './components/Auth'

function App() {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <header>
          <div className="header-content">
            <h1>Fitness Tracker</h1>
            <div>
              <button onClick={toggleDarkMode} className="dark-mode-toggle">
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
              {user ? (
                <button onClick={handleLogout} className="auth-button">Logout</button>
              ) : (
                <NavLink to="/auth" className="auth-button">Login</NavLink>
              )}
            </div>
          </div>
          {user && (
            <nav>
              <NavLink to="/" end>Dashboard</NavLink>
              <NavLink to="/workout-log">Workout Log</NavLink>
              <NavLink to="/goals">Goals</NavLink>
              <NavLink to="/groups">Fitness Groups</NavLink>
            </nav>
          )}
        </header>
        <main>
          <Routes>
            <Route path="/auth" element={!user ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/auth" />} />
            <Route path="/workout-log" element={user ? <WorkoutLog user={user} /> : <Navigate to="/auth" />} />
            <Route path="/goals" element={user ? <Goals user={user} /> : <Navigate to="/auth" />} />
            <Route path="/groups" element={user ? <FitnessGroups user={user} /> : <Navigate to="/auth" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App