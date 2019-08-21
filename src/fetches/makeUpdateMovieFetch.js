import { defineFetch } from 'resift';

const makeUpdateMovieFetch = defineFetch({
  displayName: 'Update Movie',
  share: { namespace: 'movies' },
  make: id => ({
    key: [id],
    request: updatedMovie => ({ http }) =>
      http({
        method: 'PUT',
        route: `/movies/${id}`,
        data: updatedMovie,
      }),
  }),
});

export default makeUpdateMovieFetch;
