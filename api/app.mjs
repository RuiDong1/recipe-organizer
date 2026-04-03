import './config.mjs';
import express from 'express';
//import session from 'express-session';
import mongoose from "mongoose";
import cors from 'cors'
//import passport from 'passport';
import { User, Recipe } from './db.mjs'

const app = express();

mongoose.connect(process.env.DSN)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*const sessionOptions = {
  secret: 'secret for signing session id',
  resave: false,
  saveUninitialized: false
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());*/


// routes
// GET all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// POST a new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a recipe
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

app.get('/', (req, res) => {
  res.send('Recipe Saver — coming soon!');
});

//start server

app.listen(process.env.PORT ?? 3000);