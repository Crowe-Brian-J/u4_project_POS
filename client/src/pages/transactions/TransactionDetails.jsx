import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const TransactionDetails = () => {
  const [transactionDetails, setTransactionDetails] = useState(null)
  const [products, setProducts] = useState([])

  let { id: transactionId } = useParams()

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/transactions/${transactionId}`,
        )
        setTransactionDetails(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    const getItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products")
        setProducts(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getDetails()
    getItems()
  }, [transactionId])

  const getProductById = (productId) => {
    return products.find((product) => product._id === productId)
  }

  if (!transactionDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="transaction-content">
      <h1>Transaction Details - Order # {transactionDetails._id}</h1>
      <p>Date: {new Date(transactionDetails.date).toLocaleString()}</p>
      <p>Payment Method: {transactionDetails.paymentMethod}</p>
      <p>Total Paid: ${transactionDetails.totalPaid.toFixed(2)}</p>
      <p>Change Given: ${transactionDetails.changeGiven.toFixed(2)}</p>
      <h2>Items:</h2>
      <ul>
        {transactionDetails.items.map((item) => {
          const product = getProductById(item.product)
          if (!product) {
            // Product not found, display a placeholder or handle it appropriately
            return (
              <li key={item._id}>
                <p>Product Not Found</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total Item Price: ${item.totalItemPrice.toFixed(2)}</p>
                {item.taxes > 0 && <p>Taxes: ${item.taxes.toFixed(2)}</p>}
                {item.deposit > 0 && <p>Deposit: ${item.deposit.toFixed(2)}</p>}
              </li>
            )
          }

          return (
            <li key={item._id}>
              <p>Product Name: {product.name}</p>
              <p>SKU: {product.sku}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Item Price: ${item.totalItemPrice.toFixed(2)}</p>
              {item.taxes > 0 && <p>Taxes: ${item.taxes.toFixed(2)}</p>}
              {item.deposit > 0 && <p>Deposit: ${item.deposit.toFixed(2)}</p>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TransactionDetails
