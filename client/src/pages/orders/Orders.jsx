import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [vendorNames, setVendorNames] = useState({})

  const getOrders = async () => {
    try {
      let res = await axios.get("http://localhost:3001/orders")
      setOrders(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const getVendors = async () => {
    try {
      let res = await axios.get(`http://localhost:3001/vendors/`)
      const vendorsData = res.data.reduce((acc, vendor) => {
        acc[vendor._id] = vendor.vendorName
        return acc
      }, {})
      setVendorNames(vendorsData)
    } catch (err) {
      console.error("Error getting vendor data:", err)
    }
  }

  useEffect(() => {
    getOrders()
    getVendors()
  }, [])

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

  // Singular This time
  const getVendorName = (orderId) => {
    return vendorNames[orders.find((order) => order._id === orderId)?.vendor]
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
            <th>Order Date:</th>
            <th>Order Time:</th>
            <th>Order Received?</th>
            <th>Order #:</th>
          </tr>
        </thead>
        <tbody>
          {orders.reverse().map((order) => (
            <tr key={order._id}>
              <td>
                {!order.received && (
                  <button
                    className="delete-button smaller-button"
                    onClick={() => handleDelete(order._id)}
                  >
                    X
                  </button>
                )}
              </td>
              <td>{getVendorName(order._id)}</td>
              <td>{new Date(order.updatedDate).toLocaleDateString()}</td>
              <td>{new Date(order.updatedDate).toLocaleTimeString()}</td>
              <td>{order.received}</td>
              <td>
                <Link
                  to={`/orders/${order._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {order._id}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
