import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Orders = () => {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      let res = await axios.get("http://localhost:3001/orders")
      setOrders(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getOrders()
  })

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
    </div>
  )
}

export default Orders
