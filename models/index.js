const mongoose = require("mongoose")
const vendorSchema = require("./vendor")
const productSchema = require("./product")
const orderSchema = require("./order")

const Vendor = mongoose.model("Vendor", vendorSchema)
const Product = mongoose.model("Product", productSchema)
const Order = mongoose.model("Order", orderSchema)

// const generateSKU = async (product) => {
//   const prevProduct = await Product.findOne({}, {}, { sort: { createdAt: -1 } })
//   let prevSKU = 0
//   if (prevProduct) {
//     prevSKU = parseInt(prevProduct.sku, 10)
//   }
//   const nextSKU = (prevSKU + 1).toString().padStart(4, '0')
//   product.sku = nextSKU
// }

// productSchema.pre('save', async () => {
//   await generateSKU(this)
// })

module.exports = {
  Product,
  Vendor,
  Order,
}
