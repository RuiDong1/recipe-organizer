import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function EditRecipe() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [tags, setTags] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [error, setError] = useState('')

  // fetch existing recipe data to pre-fill the form
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/recipes/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setTitle(data.title)
        setDescription(data.description || '')
        setIngredients(data.ingredients.join(', '))
        setInstructions(data.instructions)
        setTags(data.tags.join(', '))
        setCookTime(data.cookTime || '')
      })
      .catch(() => setError('Failed to load recipe'))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title,
          description,
          ingredients: ingredients.split(',').map(i => i.trim()),
          instructions,
          tags: tags.split(',').map(t => t.trim()),
          cookTime: Number(cookTime)
        })
      })
      if (!res.ok) throw new Error('Failed to update recipe')
      navigate('/recipes')
    } catch (err) {
      setError('Failed to update recipe. Please try again.')
    }
  }

  return (
    <div>
      <h1>Edit Recipe</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Ingredients (comma separated):</label>
          <input type="text" value={ingredients} onChange={e => setIngredients(e.target.value)} required />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea value={instructions} onChange={e => setInstructions(e.target.value)} required />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input type="text" value={tags} onChange={e => setTags(e.target.value)} />
        </div>
        <div>
          <label>Cook Time (minutes):</label>
          <input type="number" value={cookTime} onChange={e => setCookTime(e.target.value)} min="0" />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/recipes')}>Cancel</button>
      </form>
    </div>
  )
}

export default EditRecipe