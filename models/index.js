const mongoose = require('mongoose')
const vendorSchema = require('./vendor')
const productSchema = require('./product')

const Vendor = mongoose.model('Vendor', vendorSchema)
const Product = mongoose.model('Product', productSchema)

module.exports = {
  Vendor,
  Product
}
