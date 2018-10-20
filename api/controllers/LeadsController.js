const Lead = require('../models/Lead')
const { buildQuery } = require('../utils/QueryBuilder')

exports.get = (req, res, next) => {
  const page = parseInt(req.query.page || 1)
  const limit = parseInt(req.query.limit || 10)
  const sort = req.query.sort || 'createdAt'
  const select = (req.query.fields || '').replace(/\,/g, ' ')
  const query = buildQuery((req.query.q || '').split(','))
  
  Lead.paginate(query, { page, limit, sort, select }, (err, leads) => {
    if (err) { return next(err) }

    res.json(leads)
  });
};

exports.create = (req, res, next) => {
  const lead = new Lead(req.body);
  lead.save((err, lead) => {
    if (err) { return next(err) }

    res.location(`leads/${lead._id}`)
    res.status(201).json(lead)
  });
};

exports.findById = (req, res, next) => {
  Lead.findById(req.params.id, (err, lead) => {
    if (err) { return next(err) }
    if (!lead) { return next() }
    
    res.setHeader('Cache-Control', 'public, max-age=3000');
    res.json(lead)
  });
};


exports.update = (req, res, next) => {
  Lead.findOneAndUpdate(
    { _id: req.params.id}, req.body, { runValidators: true, new: true }, (err, lead) => {
      if (err) { return next(err) }
      if (!lead) { return next() }
    
      res.json(lead)
  });
};


exports.delete = (req, res, next) => {
  Lead.findOneAndRemove({ _id: req.params.id }, (err, lead) => {
    if (err) { return next(err) }
    if (!lead) { return next() }

    res.json({ message: 'Lead successfully deleted' })
  });
};