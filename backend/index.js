const express = require('express');
const categories = require('./categories');
const movies = require('./movies');
const delay = require('./delay');

const app = express();
const api = express.Router();

app.use('/api', api);
api.use(express.json());
api.use(delay);

api.use('/categories', categories);
api.use('/movies', movies);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`backend up on ${port}`);
});
