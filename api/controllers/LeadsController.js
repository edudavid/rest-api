const Lead = require('../models/Lead')

/**
 * @swagger
 * /leads:
 * 
 *   get:
 *     description: "Returns all leads"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "successful operation"
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Lead'
 */ 
exports.get = (req, res, next) => {
  const page = parseInt(req.query.page || 1)
  const limit = parseInt(req.query.limit || 10)
  const sort = req.query.sort || 'createdAt'
  const term = req.query.term || ''
  const searchField = req.query.searchField
  const query = {}
  if(searchField) {query[searchField] = new RegExp(term)}
  
  Lead.paginate(query, { page, limit, sort }, (err, leads) => {
    if (err) { return next(err) }

    res.json(leads)
  });
};

/**
 * @swagger
 * /leads:
 * 
 *   post:
 *     description: "Creates a lead"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lead
 *         description: "Lead object"
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Lead'
 *     responses:
 *       200:
 *         description: "Creates a lead"
 *       400:
 *         description: "An error was fount on the request payload or the payload is invalid"
 */
exports.create = (req, res, next) => {
  const lead = new Lead(req.body);
  lead.save((err, lead) => {
    if (err) { return next(err) }

    res.json(lead)
  });
};

/**
 * @swagger
 * /leads/{id}:
 * 
 *   get:
 *     description: "Returns a lead by id"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: "Lead id"
 *         in:  path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "successful operation"
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Lead'
 *       404:
 *         description: "Lead not found"
 *       400:
 *         description: "Invalid ID supplied"
 */
exports.findById = (req, res, next) => {
  Lead.findById(req.params.id, (err, lead) => {
    if (err) { return next(err) }
    if (!lead) { return next() }
    
    res.json(lead)
  });
};

/**
 * @swagger
 * /leads/{id}:
 * 
 *   put:
 *     description: "Updates a lead by id"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: "Lead id"
 *         in:  path
 *         required: true
 *         type: string
 *       - name: lead
 *         description: "Lead object"
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Lead'
 *     responses:
 *       200:
 *         description: "successful operation"
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Lead'
 *       404:
 *         description: "Lead not found"
 *       400:
 *         description: "Invalid ID supplied"
 */ 
exports.update = (req, res, next) => {
  Lead.findOneAndUpdate(
    { _id: req.params.id}, req.body, { runValidators: true, new: true }, (err, lead) => {
      if (err) { return next(err) }
      if (!lead) { return next() }
    
      res.json(lead)
  });
};

/**
 * @swagger
 * /leads/{id}:
 * 
 *   delete:
 *     description: "Deletes a lead by id"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: "Lead id"
 *         in:  path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "Lead successfully deleted"
 *       404:
 *         description: "Lead not found"
 *       400:
 *         description: "Invalid ID supplied"
 */
exports.delete = (req, res, next) => {
  Lead.findOneAndRemove({ _id: req.params.id }, (err, lead) => {
    if (err) { return next(err) }
    if (!lead) { return next() }

    res.json({ message: 'Lead successfully deleted' })
  });
};