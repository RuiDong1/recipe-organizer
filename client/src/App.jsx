import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/recipes`)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err))
  }, [])

  return (
    <div>
      <h1>My Recipe Organizer</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App