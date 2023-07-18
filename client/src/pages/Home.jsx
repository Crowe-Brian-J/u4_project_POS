import { useState } from "react"
import ListWindow from "../components/ListWindow"
import Total from "../components/Total"

const Home = () => {
  const [purchaseQueue, setPurchaseQueue] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [deposit, setDeposit] = useState(0)
  const [total, setTotal] = useState(0)

  // Add items to purchase queue
  const addToPurchaseQueue = (item) => {
    setPurchaseQueue([...purchaseQueue, item])
  }

  // Calculate Totals based on items in purchase queue
  const calculateTotal = () => {}

  // Handle Payment
  const handlePayment = (paymentMethod) => {}

  return (
    <div>
      <div className="home">
        <h1>Irish Spirits</h1>
      </div>
      <div className="main-transaction">
        <ListWindow addToPurchaseQueue={addToPurchaseQueue} />
      </div>
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
