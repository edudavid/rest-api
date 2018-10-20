const mongoose = require('mongoose');
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const LeadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    validate: { validator: validator.isEmail, message: 'This is not a valid email' },
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

LeadSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Leads', LeadSchema);
