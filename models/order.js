const { Schema } = require("mongoose")

const orderSchema = new Schema(
  {
    updatedDate: { type: Date, default: Date.now },
    received: { type: Boolean, required: true },
    receivedDate: { type: Date, default: Date.now },
    vendor: {
      type: mongoose.ObjectId,
      ref: "Vendor",
      required: true,
    },
    /*
      List of Products & Product Quantities
    */
    items: {
      type: [],
      default: [],
    },
  },
  { timestamps: true },
)

module.exports = orderSchema
