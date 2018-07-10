const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate')

/**
 * @swagger
 * definitions:
 *   Lead:
 *     type: object
 *     required:
 *       - name
 *       - email
 *       - message
 *     properties:
 *       name:
 *         type: string
 *         description: Contact name sent on the lead
 *       email:
 *         type: string
 *         format: email
 *         description: Email provided by the lead. Must by in a valid email format
 *       phone:
 *         type: string
 *         description: Phone number provided by the lead
*       message:
 *         type: string
 *         description: Message sent by the lead
 */

var LeadSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    validate: { validator: validator.isEmail, message: 'This is not a valid email' }
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

LeadSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Leads', LeadSchema);