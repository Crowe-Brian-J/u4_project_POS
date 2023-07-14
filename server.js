const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const db = require('./db')

// I do not have models yet
const { Vendor, Product } = require('./models')

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

// vendors routes
app.get('/vendors', async (req, res) => {
  let vendors = await Vendor.find({})
  res.send(vendors)
})
app.get('/vendors/:id', async (req, res) => {
  const id = req.params.id
  let vendor = await Vendor.findById(id)
  res.send(vendor)
})
app.post('/vendors', async (req, res) => {
  let newVendor = await Vendor.create(req.body)
  res.send(newVendor)
})
app.put('/vendors/:id', async (req, res) => {
  const id = req.params.id
  let updateVendor = req.body
  try {
    const vendorUpdate = await Vendor.findOneAndUpdate(
      { _id: id },
      updateVendor,
      { new: true }
    )
    if (vendorUpdate) {
      res.send(updateVendor)
    } else {
      res.status(404).send('Vendor not found!')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occurred while updating the vendor!')
  }
})
app.delete('/vendors/:id', async (req, res) => {
  const id = req.params.id
  try {
    console.log(id)
    const deleteVendor = await Vendor.findByIdAndDelete(id)
    if (!deleteVendor) {
      return res.status(404).send('Vendor not found!')
    }
    res.send('Vendor deleted successfully!')
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error During Delete!')
  }
})

// product routes
app.get('/products', async (req, res) => {
  let products = await Product.find({})
  res.send(products)
})
app.get('/products/:id', async (req, res) => {
  const id = req.params.id
  let product = await Product.findById(id)
  res.send(product)
})
app.post('/products', async (req, res) => {
  let newProduct = await Product.create(req.body)
  res.send(newProduct)
})
app.put('/products/:id', async (req, res) => {
  const id = req.params.id
  let updateProduct = req.body
  try {
    const productUpdate = await Product.findOneAndUpdate(
      { _id: id },
      updateProduct,
      { new: true }
    )
    if (productUpdate) {
      res.send(updateProduct)
    } else {
      res.status(404).send('Product not found!')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occurred while updating the product!')
  }
})
app.delete('/products/:id', async (req, res) => {
  const id = req.params.id
  try {
    const deleteProduct = await Product.findByIdAndDelete(id)
    if (!deleteProduct) {
      return res.status(404).send('Product not found!')
    }
    res.send('Product deleted successfully!')
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error During Delete!')
  }
})

app.listen(PORT, () => {
  console.log('Connected to port: ', PORT)
})
