const express = require('express');
const { sortedMoviesByGenre, genreLookup } = require('./db');
const paginate = require('./paginate');

const categories = express.Router();

categories.get('/', (req, res) => {
  res.send(sortedMoviesByGenre.map(({ movies, ...genre }) => genre));
});

categories.get('/:id', (req, res) => {
  const genre = genreLookup[req.params.id];

  if (!genre) {
    res.sendStatus(404);
    return;
  }

  const { movies: movieList, ...restOfGenre } = genre;

  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const page = parseInt(req.query.page, 10) || 0;

  const movies = paginate(movieList, pageSize, page);

  res.json({
    ...restOfGenre,
    movies,
  });
});

module.exports = categories;
