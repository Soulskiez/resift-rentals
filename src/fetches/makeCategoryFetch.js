import { defineFetch } from 'resift';

const makeCategoryFetch = defineFetch({
  displayName: 'Get Category',
  make: id => ({
    key: [id],
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: `/categories/${id}`,
      }),
  }),
});

export default makeCategoryFetch;
