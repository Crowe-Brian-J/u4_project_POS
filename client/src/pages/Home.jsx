import { useState, useEffect } from "react"
import axios from "axios"
import ListWindow from "../components/ListWindow"
import Total from "../components/Total"

const Home = () => {
  const [purchaseQueue, setPurchaseQueue] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [deposit, setDeposit] = useState(0)
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState([])

  const packSize = {
    "Single": 1,
    "4pk": 4,
    "6pk": 6,
    "12pk": 12,
    "18pk": 18,
    "24pk": 24,
    "30pk": 30,
    "36pk": 36,
  }

  // Get products
  const getProducts = async () => {
    try {
      let res = await axios.get("http://localhost:3001/products")
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // Add items to purchase queue
  const addToPurchaseQueue = (item) => {
    setPurchaseQueue([...purchaseQueue, item])
  }

  // Calculate Totals based on items in purchase queue
  const calculateTotal = () => {
    let calculatedSubtotal = 0
    let calculatedTax = 0
    let calculatedDeposit = 0

    purchaseQueue.forEach((item) => {
      const itemPrice = item.price * item.quantity
      calculatedSubtotal += itemPrice

      if (item.taxable) {
        calculatedTax += itemPrice * 0.0625
      }
      if (
        item.productType === "beer" ||
        item.productType === "carbonated, nonalcoholic"
      ) {
        const depositRate = 0.05
        const pack = packSize[item.unitSize]

        if (pack) {
          calculatedDeposit += depositRate * pack
        }
      }
    })

    const calculatedTotal =
      calculatedSubtotal + calculatedTax + calculatedDeposit

    setSubtotal(calculatedSubtotal)
    setTax(calculatedTax)
    setDeposit(calculatedDeposit)
    setTotal(calculatedTotal)
  }

  useEffect(() => {
    getProducts()
  }, [])

  // Handle Payment
  const handlePayment = async (paymentMethod, amountPaid, changeGiven) => {
    // Batch the transaction
    const transactionData = {
      date: new Date(),
      items: purchaseQueue.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        taxes: item.taxable ? 0.0625 * item.price * item.quantity : 0,
        deposit:
          (item.productType === "beer" ||
            item.productType === "carbonated, nonalcoholic") &&
          packSize[item.unitSize]
            ? 0.05 * packSize[item.unitSize] * item.quantity
            : 0,
        totalItemPrice: item.price * item.quantity,
      })),
      paymentMethod,
      totalPaid: amountPaid,
      changeGiven:
        paymentMethod === "cash" ? (amountPaid - total).toFixed(2) : 0,
    }
    try {
      const newTransaction = await axios.post(
        "http://localhost:3001/transactions",
        transactionData,
      )

      for (const item of purchaseQueue) {
        const productUpdate = {
          qtyOnHand: item.qtyOnHand - item.quantity,
        }

        await axios.put(
          `http://localhost:3001/products/${item._id}`,
          productUpdate,
        )
      }

      setPurchaseQueue([])
      setSubtotal(0)
      setTax(0)
      setDeposit(0)
      setTotal(0)

      console.log("Transaction Data: ", newTransaction.data)
      console.log("Change Given: ", newTransaction.data.changeGiven)
    } catch (err) {
      console.error("Error while processing payment: ", err)
    }
  }

  return (
    <div className="transaction-window">
      <ListWindow
        addToPurchaseQueue={addToPurchaseQueue}
        setPurchaseQueue={setPurchaseQueue}
        purchaseQueue={purchaseQueue}
        products={products}
        calculateTotal={calculateTotal}
      />
      <Total
        subtotal={subtotal}
        tax={tax}
        deposit={deposit}
        total={total}
        calculateTotal={calculateTotal}
        handlePayment={handlePayment}
      />
    </div>
  )
}

export default Home
