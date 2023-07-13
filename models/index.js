const mongoose = require('mongoose')
const vendorSchema = require('./vendor')

const Vendor = mongoose.model('Vendor', vendorSchema)

module.exports = {
  Vendor
}
