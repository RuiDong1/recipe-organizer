import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function Search() {
  const queryRef = useRef()
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [saved, setSaved] = useState([])
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    const query = queryRef.current.value
    setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/search?q=${query}`, {
        credentials: "include"
      })
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()
      setResults(data)
    } catch (err) {
      setError('Failed to search recipes. Please try again.')
    }
  }

  const handleSave = async (recipe) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: recipe.title,
          description: recipe.summary?.replace(/<[^>]*>/g, '') || '',
          ingredients: [],
          instructions: recipe.analyzedInstructions?.[0]?.steps?.map(s => s.step).join(' ') || '',
          tags: recipe.dishTypes || [],
          cookTime: recipe.readyInMinutes || 0,
          sourceUrl: recipe.sourceUrl || ''
        })
      })
      if (!res.ok) throw new Error('Failed to save')
      setSaved([...saved, recipe.id])
    } catch (err) {
      setError('Failed to save recipe.')
    }
  }

  return (
    <div>
      <h1>Search Recipes</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          ref={queryRef}
          placeholder="Search for a recipe..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="recipe-list">
        {results.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            {recipe.readyInMinutes && <p><strong>Cook Time:</strong> {recipe.readyInMinutes} minutes</p>}
            {recipe.dishTypes?.length > 0 && <p><strong>Tags:</strong> {recipe.dishTypes.join(', ')}</p>}
            {saved.includes(recipe.id) ? (
              <p style={{ color: 'green' }}>Saved!</p>
            ) : (
              <button onClick={() => handleSave(recipe)}>Save to My Recipes</button>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/recipes')}>Back to My Recipes</button>
    </div>
  )
}

export default Search