const { Schema } = require('mongoose')

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  banned: { type: Boolean, required: true, default: false }
  // Warning level: based on number of transactions with alcohol daily/poss. hourly, like if you make a transaction at 8am and then one at 4pm, no worries, but if hourly transactions, warning level increases. Pop Up on checkAlert()
})

module.exports = customerSchema
