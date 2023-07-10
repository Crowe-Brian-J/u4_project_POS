const { Schema } = require('mongoose')

const orderSchema = new Schema(
  {
    updatedDate: { type: Date, default: Date.now },
    received: { type: Boolean, required: true },
    receivedDate: { type: Date, default: Date.now }
    /*
      Vendor as FK -> Use List of Products that belong to vendors to validate order
      List of Products & Product Quantities
    */
  },
  { timestamps: true }
)

module.exports = orderSchema
