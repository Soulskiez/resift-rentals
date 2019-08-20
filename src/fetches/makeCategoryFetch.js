import { defineFetch } from 'resift';

const makeCategoryFetch = defineFetch({
  displayName: 'Get Category',
  make: categoryId => ({
    key: [categoryId],
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: `/categories/${categoryId}`,
      }),
  }),
});

export default makeCategoryFetch;
