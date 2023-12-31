const { Schema, mongoose } = require("mongoose")

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    upc: {
      type: Number,
      match: /^(?!0{11})\d{12}$/,
    },
    sku: { type: String, unique: true },
    productType: {
      type: String,
      enum: [
        "beer",
        "wine",
        "liquor",
        "misc - taxable",
        "misc - nontaxable",
        "snacks",
        "carbonated, nonalcoholic",
      ],
      required: true,
    },
    alcoholContent: {
      type: String,
      enum: [
        "> 36% / 72 proof (Liquor)",
        "> 14%, < 24% (Wines)",
        "~12-15% (Malt Beverages)",
        "~4-14% (Beer)",
        "Nonalcoholic",
      ],
    },
    taxable: { type: Boolean, default: false, required: true },
    activeStatus: {
      type: String,
      default: "active",
      enum: ["active", "inactive (i.e. seasonally unavailable)"],
    },
    unitSize: {
      type: String,
      required: () => {
        if (this.productType === "beer") {
          return {
            // Think about importing enums as array of strings/key value for something to process for deposit
            enum: [
              "Single",
              "4pk",
              "6pk",
              "8pk",
              "12pk",
              "18pk",
              "24pk",
              "30pk",
              "36pk",
            ],
          }
        } else if (this.productType === "wine") {
          return {
            enum: [
              "187mL",
              "4pk",
              "375mL",
              "500mL",
              "750mL",
              "1.5L",
              "3L",
              "4.5L",
              "5L",
            ],
          }
        } else if (this.productType === "liquor") {
          return {
            enum: [
              "50mL",
              "100mL",
              "200mL",
              "375mL",
              "750mL",
              "1L",
              "1.5L",
              "1.75L",
            ],
          }
        } else if (this.productType === "carbonated, nonalcoholic") {
          return {
            enum: ["Single", "4pk", "6pk", "12pk"],
          }
        } else if (this.productType === "snacks") {
          return {
            enum: ["0.5oz", "1oz", "8.5oz", "10oz", "13oz"],
          }
        } else {
          return "Pkg"
        }
      },
    },
    casePack: {
      type: Number,
      enum: [1, 2, 4, 6, 8, 10, 12, 24],
      required: true,
    },
    dietaryRestrictions: {
      type: [
        {
          type: String,
          enum: ["Kosher", "Organic"],
        },
      ],
      default: [],
    },
    aisle: {
      type: Number,
    },
    vendor: {
      type: mongoose.ObjectId,
      ref: "Vendor",
      required: true,
    },
    qtyOnHand: {
      type: Number,
      default: 0,
      required: true,
    },
    cost: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true },
)

module.exports = productSchema
