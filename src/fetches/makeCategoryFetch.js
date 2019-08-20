import { defineFetch } from 'resift';
import get from 'lodash/get';

const makeCategoryFetch = defineFetch({
  displayName: 'Get Category',
  share: {
    namespace: 'category',
    merge: (prev, next) => ({
      ...prev,
      movies: {
        ...get(prev, ['movies']),
        ...next.movies,
        results: [...get(prev, ['movies', 'results'], []), ...next.movies.results],
      },
    }),
  },
  make: categoryId => ({
    key: [categoryId],
    request: page => ({ http }) =>
      http({
        method: 'GET',
        route: `/categories/${categoryId}`,
        query: {
          page,
        },
      }),
  }),
});

export default makeCategoryFetch;
