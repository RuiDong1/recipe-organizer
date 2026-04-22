import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function RecipeDetail() {
  const navigate = useNavigate()

  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/recipes/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(() => setError('Failed to load recipe'))
  }, [id])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!recipe) return <p>Loading...</p>

  return (
    <div>
      <h1>{recipe.title}</h1>
      {recipe.description && <p>{recipe.description}</p>}
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      {recipe.tags.length > 0 && <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>}
      {recipe.cookTime > 0 && <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>}
      <button onClick={() => navigate(`/recipes/${id}/edit`)}>Edit</button>
      <button onClick={() => navigate('/recipes')}>Back</button>
    </div>
  )
}

export default RecipeDetail