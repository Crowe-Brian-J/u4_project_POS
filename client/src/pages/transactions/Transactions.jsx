import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Transactions = () => {
  const [transactions, setTransactions] = useState([])

  const getTransactions = async () => {
    try {
      let res = await axios.get("http://localhost:3001/transactions")
      setTransactions(res.data)
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div className="transactions container-grid">
      {transactions.reverse().map((transaction) => (
        <div key={transaction._id}>
          <Link
            to={`${transaction._id}`}
            key={transaction._id}
            style={{ textDecoration: "none" }}
          >
            <div className="transaction-poster">
              <div className="order-number">Order #: {transaction._id}</div>{" "}
              <br />
              <div className="date-time">
                Date and Time: {new Date(transaction.date).toLocaleDateString()}{" "}
                -{new Date(transaction.date).toLocaleTimeString()}
              </div>
              <div className="number-items">
                Number of Items: {transaction.items.length}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Transactions
