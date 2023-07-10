const { Schema } = require('mongoose')

const vendorSchema = new Schema({
  vendorName: { type: String, required: true },
  repName: { type: String, required: true },
  phoneNumber: {
    type: Number,
    match: /^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
    required: true
  },
  email: { type: String, required: true }
})

module.exports = vendorSchema
