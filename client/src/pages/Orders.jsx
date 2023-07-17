import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [vendorName, setVendorName] = useState("")

  const getOrders = async () => {
    try {
      let res = await axios.get("http://localhost:3001/orders")
      setOrders(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const getVendor = async () => {
    try {
      let res = await axios.get("http://localhost:3001/vendors/${order.vendor}")
      setVendorName(response.data.vendorName)
    } catch (err) {
      console.error("Error getting vendor data:", err)
    }
  }

  useEffect(() => {
    getOrders()
    getVendor()
  }, [vendorName])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/orders/${id}`)
      setOrders((previousOrders) =>
        previousOrders.filter((order) => order._id !== id),
      )
      console.log("Order deleted successfully!")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Link
        to={{ pathname: "new", state: { orders, setOrders } }}
        style={{ textDecoration: "none" }}
      >
        <button className="new-order">New Order</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Delete Order</th>
            <th>Vendor:</th>
            <th>Order #:</th>
            <th>Order Date:</th>
            <th>Order Received?</th>
          </tr>
        </thead>
        <tbody>
          {orders.reverse().map((order) => (
            <tr key={order._id}>
              <td>
                {!order.received && <button onClick={handleDelete}>X</button>}
              </td>
              <td>{vendorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
