const { Schema } = require('mongoose')

// Does this belong here? Should this be inside productSchema? I think I had it outside in previous products
const generateSKU = async (product) => {
  const prevProduct = await Product.findOne({}, {}, { sort: { createdAt: -1 } })
  let prevSKU = 0
  if (prevProduct) {
    prevSKU = parseInt(prevProduct.sku, 10)
  }
  const nextSKU = (lastSKU + 1).toString().padStart(4, '0')
  product.sku = nextSKU
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    upc: {
      type: Number,
      match: /^(?!0{11})\d{12}$/,
      unique: true,
      required: false
    },
    sku: { type: String, unique: true, required: true }
    /*
       - UPC Code
       - SKU Number (Incremental number. Not the same as id, needs to be simpler)
       - Product Type (Beer, Wine, Liquor, Miscellaneous Taxable, Miscellaneous Non-Taxable, Carbonated Non-Alcoholic, Snacks)
       - Alcohol Content
       - Taxable (T/F)
       - Status (Active/Inactive)
       - Unit Size
       - Case Pack (size: 12, 2, 6, etc)
       - Misc Checkboxes: Kosher, Organic, No Discos
       - Par Levels, Min/Max,
       - Aisle (optional)
       - Vendor (as FK)
    */
  },
  { timestamps: true }
)

productSchema.pre('save', async () => {
  await generateSKU(this)
})

module.exports = productSchema
