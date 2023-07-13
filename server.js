const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const db = require('./db')

// I do not have models yet
const { Vendor } = require('./models')

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

app.get('/vendors', async (req, res) => {
  let vendors = await Vendor.find({})
  res.send(vendors)
})

app.post('/vendors', async (req, res) => {
  let newVendor = await Vendor.create(req.body)
  res.send(newVendor)
})

app

app.listen(PORT, () => {
  console.log('Connected to port: ', PORT)
})
