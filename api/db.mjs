import mongoose from 'mongoose' 

//user
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  passwordHash: {
    type: String,
    required: true
  }
});

//recipe

const RecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  ingredients: {
    type: [String], 
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  cookTime: {
    type: Number,    
    min: 0
  },
  sourceUrl: {
    type: String,    //link to original recipe if imported from API
    trim: true,
    required: false
  }
});

const User = mongoose.model('User', UserSchema);
const Recipe = mongoose.model('Recipe', RecipeSchema);

export { User, Recipe };