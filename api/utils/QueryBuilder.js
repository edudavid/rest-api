exports.buildQuery = search => (search.reduce((acc, curr) => {
  const params = curr.split(':');
  if (params.length > 1) {
    acc[params[0]] = new RegExp(params[1]);
  }
  return acc;
}, {}));
