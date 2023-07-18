const express = require("express")
const logger = require("morgan")
const cors = require("cors")

const PORT = process.env.PORT || 3001

const db = require("./db")

// I do not have models yet
const { Vendor, Product, Order, Transaction } = require("./models")

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger("dev"))

// vendors routes
app.get("/vendors", async (req, res) => {
  let vendors = await Vendor.find({})
  res.send(vendors)
})
app.get("/vendors/:id", async (req, res) => {
  const id = req.params.id
  let vendor = await Vendor.findById(id)
  res.send(vendor)
})
app.post("/vendors", async (req, res) => {
  let newVendor = await Vendor.create(req.body)
  res.send(newVendor)
})
app.put("/vendors/:id", async (req, res) => {
  const id = req.params.id
  let updateVendor = req.body
  try {
    const vendorUpdate = await Vendor.findOneAndUpdate(
      { _id: id },
      updateVendor,
      { new: true },
    )
    if (vendorUpdate) {
      res.send(updateVendor)
    } else {
      res.status(404).send("Vendor not found!")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred while updating the vendor!")
  }
})
app.delete("/vendors/:id", async (req, res) => {
  const id = req.params.id
  try {
    console.log(id)
    const deleteVendor = await Vendor.findByIdAndDelete(id)
    if (!deleteVendor) {
      return res.status(404).send("Vendor not found!")
    }
    res.send("Vendor deleted successfully!")
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error During Delete!")
  }
})

// product routes
app.get("/products", async (req, res) => {
  let products = await Product.find({})
  res.send(products)
})
app.get("/products/:id", async (req, res) => {
  const id = req.params.id
  let product = await Product.findById(id)
  res.send(product)
})
app.post("/products", async (req, res) => {
  let newProduct = await Product.create(req.body)
  res.send(newProduct)
})
app.put("/products/:id", async (req, res) => {
  const id = req.params.id
  let updateProduct = req.body
  try {
    const productUpdate = await Product.findOneAndUpdate(
      { _id: id },
      updateProduct,
      { new: true },
    )
    if (productUpdate) {
      res.send(updateProduct)
    } else {
      res.status(404).send("Product not found!")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred while updating the product!")
  }
})
app.patch("/products/:id", async (req, res) => {
  const id = req.params.id
  const { qtyOnHand } = req.body
  try {
    const productUpdate = await Product.findByIdAndUpdate(id, { qtyOnHand })
    if (!productUpdate) {
      return res.status(404).send("Product not found!")
    }
    res.send(productUpdate)
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred while updating the product!")
  }
})
app.delete("/products/:id", async (req, res) => {
  const id = req.params.id
  try {
    const deleteProduct = await Product.findByIdAndDelete(id)
    if (!deleteProduct) {
      return res.status(404).send("Product not found!")
    }
    res.send("Product deleted successfully!")
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error During Delete!")
  }
})

// order routes
app.get("/orders", async (req, res) => {
  let orders = await Order.find({})
  res.send(orders)
})
app.get("/orders/:id", async (req, res) => {
  const id = req.params.id
  let order = await Order.findById(id)
  res.send(order)
})
app.post("/orders", async (req, res) => {
  let newOrder = await Order.create(req.body)
  res.send(newOrder)
})
app.put("/orders/:id", async (req, res) => {
  const id = req.params.id
  let updateOrder = req.body
  try {
    const orderUpdate = await Order.findOneAndUpdate({ _id: id }, updateOrder, {
      new: true,
    })
    if (orderUpdate) {
      res.send(updateOrder)
    } else {
      res.status(404).send("Order not found!")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred while updating the order!")
  }
})
app.patch("/orders/:id", async (req, res) => {
  const id = req.params.id
  const { received, receivedDate } = req.body
  try {
    const orderUpdate = await Order.findByIdAndUpdate(
      id,
      { received, receivedDate },
      { new: true },
    )
    if (!orderUpdate) {
      return res.status(404).send("Order not found!")
    }
    res.send(orderUpdate)
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred while updating the order!")
  }
})
app.delete("/orders/:id", async (req, res) => {
  const id = req.params.id
  try {
    const deleteOrder = await Order.findByIdAndDelete(id)
    if (!deleteOrder) {
      return res.status(404).send("Order not found!")
    }
    res.send("Order deleted successfully!")
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error During Delete!")
  }
})

// transaction routes
app.get("/transactions", async (req, res) => {
  let transactions = await Transaction.find({})
  res.send(transactions)
})
app.get("/transactions/:id", async (req, res) => {
  const id = req.params.id
  let transaction = await Transaction.findById(id)
  res.send(transaction)
})
app.post("/transactions", async (req, res) => {
  let newTransaction = await Transaction.create(req.body)
  res.send(newTransaction)
})
app.put("/transactions/:id", async (req, res) => {
  const id = req.params.id
  let updateTransaction = req.body
  try {
    const transactionUpdate = await Transaction.findOneAndUpdate(
      { _id: id },
      updateTransaction,
      { new: true },
    )
    if (transactionUpdate) {
      res.send(updateTransaction)
    } else {
      res.status(404).send("Transaction not found!")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred while updating the transaction!")
  }
})
// I dont' think it makes sense to delete a transaction, ever

app.listen(PORT, () => {
  console.log("Connected to port: ", PORT)
})
