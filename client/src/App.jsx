import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function App() {
  const [recipes, setRecipes] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [tags, setTags] = useState('')
  const [cookTime, setCookTime] = useState('')

  // fetch all recipes when page loads
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/recipes`)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err))
  }, [])

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newRecipe = {
      title,
      description,
      ingredients: ingredients.split(',').map(i => i.trim()), 
      instructions,
      tags: tags.split(',').map(t => t.trim()),    
      cookTime: Number(cookTime),
    }
    try{
      const res = await fetch(`${API_BASE_URL}/api/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
      })

      const saved = await res.json()
      setRecipes([...recipes, saved])

      // clear the form
      setTitle('')
      setDescription('')
      setIngredients('')
      setInstructions('')
      setTags('')
      setCookTime('')
    } catch (err){
      console.error("Error adding recipe: ", err)
    }
  }

  // handle delete
  const handleDelete = async (e, id) => {
    await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
      method: 'DELETE'
    })
    setRecipes(recipes.filter(recipe => recipe._id !== id))
  }

  return (
    <div>
      <h1>Recipe Organizer</h1>

      {/* Add Recipe Form */}
      <h2>Add a Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients (comma separated):</label>
          <input
            type="text"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>
        <div>
          <label>Cook Time (minutes):</label>
          <input
            type="number"
            value={cookTime}
            onChange={e => setCookTime(e.target.value)}
            min="0"
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>

      {/* Recipe List */}
      <h2>My Recipes</h2>
      {recipes.length === 0 && <p>No recipes yet. Add one above!</p>}
      {recipes.map(recipe => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          {recipe.description && <p>{recipe.description}</p>}
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          {recipe.tags.length > 0 && <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>}
          {recipe.cookTime && <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>}
          <button onClick={(e) => handleDelete(e, recipe._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default App