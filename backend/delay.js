const delay = 300;

const delayMiddleware = (_req, _res, next) => {
  setTimeout(next, delay);
};

module.exports = delayMiddleware;
