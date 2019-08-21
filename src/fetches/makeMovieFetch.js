import { defineFetch } from 'resift';

const makeMovieFetch = defineFetch({
  displayName: 'Get Movie',
  share: { namespace: 'movies' },
  make: id => ({
    key: [id],
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: `/movies/${id}`,
      }),
  }),
});

export default makeMovieFetch;
