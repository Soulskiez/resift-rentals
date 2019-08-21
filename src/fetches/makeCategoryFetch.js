import { defineFetch } from 'resift';
import get from 'lodash/get';

const makeCategoryFetch = defineFetch({
  displayName: 'Get Category',
  share: {
    namespace: 'categories',
    merge: (prev, next) => ({
      ...prev,
      ...next,
      movies: {
        ...get(prev, ['movies']),
        ...next.movies,
        results: [...get(prev, ['movies', 'results'], []), ...next.movies.results],
      },
    }),
  },
  make: id => ({
    key: [id],
    request: page => ({ http }) =>
      http({
        method: 'GET',
        route: `/categories/${id}`,
        query: { page },
      }),
  }),
});

export default makeCategoryFetch;
