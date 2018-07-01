const Lead = require('../models/Lead')

exports.get = (req, res) => {
  Lead.find({}, (err, leads) => {
    if (err) { return next(err) }

    res.json(leads)
  });
};

exports.create = (req, res, next) => {
  const lead = new Lead(req.body);
  lead.save((err, lead) => {
    if (err) { return next(err) }

    res.json(lead)
  });
};

exports.findById = (req, res, next) => {
  Lead.findById(req.params.id, (err, lead) => {
    if (err || lead == null) { return next(err) }
    
    res.json(lead)
  });
};

exports.update = (req, res, next) => {
  Lead.findOneAndUpdate( {_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, lead) => {
    if (err || lead == null) { return next(err) }
    
    res.json(lead)
  });
};

exports.delete = (req, res) => {
  Lead.findOneAndRemove({ _id: req.params.id }, (err, lead) => {
    if (err)
      res.send(err)
    res.json({ message: 'Lead successfully deleted' })
  });
};