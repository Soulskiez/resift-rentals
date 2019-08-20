import { createDataService, createHttpService } from 'resift';

const http = createHttpService({
  prefix: '/api',
});

const dataService = createDataService({
  services: { http },
  onError: e => {
    throw e;
  },
});

export default dataService;
