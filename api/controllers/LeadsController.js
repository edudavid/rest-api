const Lead = require('../models/Lead')
const { buildQuery } = require('../utils/QueryBuilder')
/**
 * @swagger
 * /leads:
 * 
 *   get:
 *     description: "Returns all leads"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: q
 *         description: "The query parameter. The format is attribute:value. For multiple attributes and values use: attribute1:value1,attribute2:value2 "
 *         in:  query
 *         required: false
 *         type: string
 *       - name: fields
 *         description: "The document fields you want to have in the returned documents. Ex: 'name,email'"
 *         in:  query
 *         required: false
 *         type: string
 *       - name: page
 *         description: "Page number"
 *         in:  query
 *         required: false
 *         type: integer
 *       - name: limit
 *         description: "Maximum documents per page"
 *         in:  query
 *         required: false
 *         type: string
 *       - name: sort
 *         description: "Sorting attribute. By default is asc for desc use - before attribute name. Ex: name for asc and -name for desc"
 *         in:  query
 *         required: false
 *         type: string
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
  const select = (req.query.fields || '').replace(/\,/g, ' ')
  const query = buildQuery((req.query.q || '').split(','))
  
  Lead.paginate(query, { page, limit, sort, select }, (err, leads) => {
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