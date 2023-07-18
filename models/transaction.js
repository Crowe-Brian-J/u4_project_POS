const { Schema, mongoose } = require("mongoose")

const transactionItemSchema = new Schema({
  product: {
    type: mongoose.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  taxes: {
    type: Number, // 0.0625 * totalItemPrice when product.taxable is true
  },
  deposit: {
    type: Number, // $0.05 * product.unitSize on carbonated beverages
  },
  totalItemPrice: {
    type: Number, // Quantity *  ProductPrice
  },
})

const transactionSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  items: [transactionItemSchema],
  paymentMethod: {
    type: String,
    enum: ["cash", "credit", "debit"],
  },
  totalPaid: {
    type: Number,
  },
  changeGiven: {
    type: Number,
  },
})

module.exports = transactionSchema
