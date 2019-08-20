import { defineFetch } from 'resift';

const makeMovieFetch = defineFetch({
  displayName: 'Get Movie',
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
