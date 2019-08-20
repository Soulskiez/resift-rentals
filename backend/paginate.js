function paginate(list, pageSize, page) {
  if (!pageSize) {
    throw new Error('pageSize is required');
  }

  const start = page * pageSize;
  const end = (page + 1) * pageSize;

  return {
    results: list.slice(start, end),
    pagination: {
      pageSize,
      page: page || 0,
      total: list.length,
    },
  };
}

module.exports = paginate;
