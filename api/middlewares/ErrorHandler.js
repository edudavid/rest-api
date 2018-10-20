exports.handleError = (err, req, res) => {
  res.status(400).send(err);
};
