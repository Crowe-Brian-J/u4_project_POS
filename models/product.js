const { Schema } = require('mongoose')

// Does this belong here? Should this be inside productSchema? I think I had it outside in previous products
const generateSKU = async (product) => {
  const prevProduct = await Product.findOne({}, {}, { sort: { createdAt: -1 } })
  let prevSKU = 0
  if (prevProduct) {
    prevSKU = parseInt(prevProduct.sku, 10)
  }
  const nextSKU = (prevSKU + 1).toString().padStart(4, '0')
  product.sku = nextSKU
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    upc: {
      type: Number,
      match: /^(?!0{11})\d{12}$/
    },
    sku: { type: String, unique: true },
    productType: {
      type: String,
      enum: [
        'beer',
        'wine',
        'liquor',
        'misc - taxable',
        'misc - nontaxable',
        'snacks',
        'carbonated, nonalcoholic'
      ],
      required: true
    },
    alcoholContent: {
      type: String,
      enum: [
        '> 36% / 72 proof (Liquor)',
        '> 14%, < 24% (Wines)',
        '~12-15% (Malt Beverages)',
        '~4-14% (Beer)',
        'Nonalcoholic'
      ]
    },
    taxable: { type: Boolean, required: true },
    activeStatus: {
      type: String,
      enum: ['active', 'inactive (i.e. seasonally unavailable)']
    },
    unitSize: {
      type: String,
      required: () => {
        if (this.productType === 'beer') {
          return {
            // Think about importing enums as array of strings
            enum: [
              '7.5oz',
              '11.5oz',
              '12oz',
              '16oz',
              '18oz',
              '24oz',
              '40oz',
              '4pk',
              '6pk',
              '8pk',
              '12pk',
              '18pk',
              '24pk',
              '30pk',
              '36pk'
            ]
          }
        } else if (this.productType === 'wine') {
          return {
            enum: [
              '187mL',
              '4pk',
              '375mL',
              '500mL',
              '750mL',
              '1.5L',
              '3L',
              '4.5L',
              '5L'
            ]
          }
        } else if (this.productType === 'liquor') {
          return {
            enum: [
              '50mL',
              '100mL',
              '200mL',
              '375mL',
              '750mL',
              '1L',
              '1.5L',
              '1.75L'
            ]
          }
        } else if (this.productType === 'carbonated, nonalcoholic') {
          return {
            enum: ['Single (20oz, 2L, etc.)', '4pk', '6pk', '12pk']
          }
        } else if (this.productType === 'snacks') {
          return {
            enum: ['0.5oz', '1oz', '8.5oz', '10oz', '13oz']
          }
        } else {
          return 'Pkg'
        }
      }
    },
    casePack: {
      type: Number,
      enum: [1, 2, 4, 6, 8, 10, 12, 24],
      required: true
    },
    dietaryRestrictions: {
      type: String,
      enum: ['Kosher', 'Organic', 'No Discos']
    },
    parLevelsMin: {
      type: Number
    },
    parLevelsMax: {
      type: Number
    },
    aisle: {
      type: Number
    },
    vendor: {
      type: mongoose.ObjectId,
      ref: 'Vendor',
      required: true
    }
  },
  { timestamps: true }
)

productSchema.pre('save', async () => {
  await generateSKU(this)
})

module.exports = productSchema
