# Recipe Organizer 

## Overview
A web application for saving, organizing, and discovering recipes. Users can create and account and login, add their own recipes, browse recipes (potentially from an external API), and filter by tags or ingredients.

## Data Model

The application stores two types of documents: Users and Recipes.

* users can have multiple recipes (via references)
* each recipe stores its ingredients as an embedded array of strings

(___TODO__: sample documents_)

An Example User:

```javascript
{
  username: "chefmike",
  hash: // a password hash
}
```

An Example Recipe:

```javascript
{
  user: // a reference to a User object,
  title: "Spaghetti Carbonara",
  description: "A classic Roman pasta dish.",
  ingredients: [
    "200g spaghetti",
    "100g pancetta",
    "2 eggs",
    "50g pecorino romano"
  ],
  instructions: "Boil pasta until al dente...",
  tags: ["Italian", "pasta", "dinner"],
  cookTime: 20,   // in minutes
  sourceUrl: // optional link if imported from an API,
}
```


## [Link to Commented First Draft Schema](db.mjs) 

db.mjs(db.mjs)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/recipes - page showing all of a user's saved recipes

![recipes list](documentation/recipes.png)

/recipes/add - page for adding a new recipe manually

![add recipe](documentation/recipes-add.png)

/recipes/:id - page for viewing a single recipe

![recipe detail](documentation/recipes-id.png)

/search - page for searching the a recipe API

![search](documentation/search.png)


## Site map

```
/                    
├── /register        ← Register form
├── /login           ← Login form
├── /recipes         ← Dashboard: all saved recipes (requires login)
│   ├── /recipes/add         ← Add a recipe manually
│   ├── /recipes/:id         ← View a single recipe
│   └── /recipes/:id/edit    ← Edit a recipe
└── /search          ← Search Spoonacular API, save results
```

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. As a non-registered user, I can create a new account with the site
2. As a user, I can log in to the site
3. As a user, I can add a recipe manually using a form
4. As a user, I can view all of my saved recipes in one place
5. As a user, I can search for recipes via an external API
6. As a user, I can edit a recipe I've already saved
7. As a user, I can delete a recipe from my collection
8. As a user, I can filter my saved recipes by tag (e.g. "dinner", "Italian")

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (4 points) User authentication with Passport.js
    * Using `passport-local` strategy for username/password login
    * Passwords stored as hashes
    * Sessions managed via `express-session`
* (2 points) CSS framework — Bootstrap with custom theme
* (3 points) Unit testing with Jest
    * Writing unit tests for schema logic and utility functions
    * Minimum 4 tests; link to test files and screenshot to be added
* (2 points) External API 
    * Used to search for recipes by keyword from within the app
    * Results can be previewed and saved to the user's personal collection
11 points total out of 10 required points


## [Link to Initial Main Project File](app.mjs)

app.mjs(app.mjs)

## Annotations / References Used

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. 
