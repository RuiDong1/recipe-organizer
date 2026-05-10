import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipes from './pages/Recipes'
import EditRecipe from './pages/EditRecipe'
import RecipeDetail from './pages/RecipeDetail'
import Search from './pages/Search'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/me`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUser(data.username)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/recipes" /> : <Login setUser={setUser} />
        } />
        <Route path="/register" element={
          user ? <Navigate to="/recipes" /> : <Register />
        } />
        <Route path="/recipes" element={
          user ? <Recipes user={user} setUser={setUser} /> : <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to="/recipes" />} />

        <Route path="/recipes/:id/edit" element={
          user ? <EditRecipe /> : <Navigate to="/login" />
        } />

        <Route path="/recipes/:id" element={
          user ? <RecipeDetail /> : <Navigate to="/login" />
        } />

        <Route path="/search" element={
          user ? <Search /> : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App