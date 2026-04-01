import './config.mjs';
import express from 'express';
import session from 'express-session';
import mongoose from "mongoose";
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

mongoose.connect(process.env.DSN)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname, 'public')));

const sessionOptions = {
  secret: 'secret for signing session id',
  resave: false,
  saveUninitialized: false
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'hbs');

// routes

app.get('/', (req, res) => {
  res.send('Recipe Saver — coming soon!');
});

//start server

app.listen(process.env.PORT ?? 3000);