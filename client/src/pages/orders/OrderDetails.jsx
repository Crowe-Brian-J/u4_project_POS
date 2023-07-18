import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const OrderDetails = () => {
  let { id: orderId } = useParams()
  const navigate = useNavigate()
  let dateTime = Date.now()

  const [orderDetails, setOrderDetails] = useState(null)

  const getOrderDetails = async () => {
    if (!orderId) return

    try {
      const res = await axios.get(`http://localhost:3001/orders/${orderId}`)
      console.log(res.data)
      setOrderDetails(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getOrderDetails()
  }, [orderId])

  const handleChangeQuantity = (productId, quantity) => {
    const updatedItems = orderDetails.items.map((item) =>
      item.product === productId ? { ...item, quantity } : item,
    )
    setOrderDetails({ ...orderDetails, items: updatedItems })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      await axios.patch(`http://localhost:3001/orders/${orderId}`, {
        received: true,
        receivedDate: dateTime,
      })
      const updateProductPromises = orderDetails.items.forEach(async (item) => {
        try {
          const product = await axios.get(
            `http://localhost:3001/products/${item.product}`,
          )

          if (!product || !product.data) {
            throw new Error(`Product not found for item ${item.product}`)
          }

          // Multiply casePack by quantity of cases in order
          const orderQty = item.quantity * product.data.casePack
          // Add orderQty to qtyOnHand
          const newQtyOnHand = product.data.qtyOnHand + orderQty
          return axios.patch(`http://localhost:3001/products/${item.product}`, {
            qtyOnHand: newQtyOnHand,
          })
        } catch (err) {
          console.error(err)
          return Promise.resolve()
        }
      })

      await Promise.all(updateProductPromises)

      console.log("Order received and product updated successfully")
      navigate("/orders")
    } catch (err) {
      console.error(err)
    }
  }

  if (!orderDetails) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Order Details: </h2>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item) => (
              <tr key={item.product}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(evt) =>
                      handleChangeQuantity(item.product, evt.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSubmit}>ReceiveOrder</button>
      </form>
    </div>
  )
}

export default OrderDetails
