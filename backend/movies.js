const express = require('express');
const movies = express.Router();
const { movieLookup } = require('./db');

movies.get('/:id', (req, res) => {
  const { id } = req.params;

  const movie = movieLookup[id];

  if (!movie) {
    res.sendStatus(404);
  }

  res.json(movie);
});

movies.put('/:id', (req, res) => {
  const { id } = req.params;

  const movie = movieLookup[id];

  if (!movie) {
    res.sendStatus(404);
  }

  movie.name = req.body.name || movie.name;
  movie.synopsis = req.body.synopsis || movie.synopsis;

  res.json(movie);
});

module.exports = movies;
