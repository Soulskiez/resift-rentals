import { defineFetch } from 'resift';

const makeCategoriesFetch = defineFetch({
  displayName: 'Get Categories',
  make: () => ({
    key: [],
    request: () => ({ http }) =>
      http({
        method: 'GET',
        route: '/categories',
      }),
  }),
});

const categoriesFetch = makeCategoriesFetch();
export default categoriesFetch;
