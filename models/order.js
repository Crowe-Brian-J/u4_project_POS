const { Schema, mongoose } = require("mongoose")

const orderSchema = new Schema(
  {
    updatedDate: { type: Date, default: Date.now },
    received: { type: Boolean, required: true },
    receivedDate: { type: Date, default: null },
    vendor: {
      type: mongoose.ObjectId,
      ref: "Vendor",
      required: true,
    },
    /*
      List of Products & Product Quantities
    */
    items: {
      product: {
        type: mongoose.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
)

module.exports = orderSchema
