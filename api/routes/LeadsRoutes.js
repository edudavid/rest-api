const LeadsController = require('../controllers/LeadsController')

module.exports = (app) => {
  
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
 *
 * /leads/{id}:
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
  app.route('/leads')
    .get(LeadsController.get)
    .post(LeadsController.create);


  app.route('/leads/:id')
    .get(LeadsController.findById)
    .put(LeadsController.update)
    .delete(LeadsController.delete)
};