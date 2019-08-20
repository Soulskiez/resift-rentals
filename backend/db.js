const movies = require('../movies');
const { flatten } = require('lodash');
const hash = require('string-hash');

const movieLookup = movies.reduce((lookup, movie) => {
  lookup[movie.id] = movie;
  return lookup;
}, {});

const movieGenreTuples = flatten(
  movies.map(movie => movie.genres.map(genre => ({ genre, movie }))),
);

const genreLookup = Object.entries(
  movieGenreTuples.reduce((lookup, { genre, movie }) => {
    const movies = lookup[genre] || [];

    movies.push(movie);

    lookup[genre] = movies;
    return lookup;
  }, {}),
)
  .map(([genre, movies]) => ({
    id: hash(genre),
    name: genre,
    movies: movies
      .slice()
      .sort((a, b) => b.tomatoScore - a.tomatoScore)
      .map(movie => ({
        id: movie.id,
        name: movie.name,
        imageUrl: movie.imageUrl,
      })),
  }))
  .reduce((lookup, next) => {
    lookup[next.id] = next;
    return lookup;
  }, {});

const sortedMoviesByGenre = Object.values(genreLookup).sort((a, b) => {
  return b.movies.length - a.movies.length;
});

module.exports = {
  movieLookup,
  genreLookup,
  sortedMoviesByGenre,
};
