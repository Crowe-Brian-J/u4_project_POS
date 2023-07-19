import { useState } from "react"
import axios from "axios"
import TransactionSearch from "./TransactionSearch"

const ListWindow = ({
  addToPurchaseQueue,
  setPurchaseQueue,
  purchaseQueue,
  products,
}) => {
  const [itemInput, setItemInput] = useState("")

  const handleItemInput = (evt) => {
    setItemInput(evt.target.value)
  }

  const handleProductSelect = (product) => {
    const existingItem = purchaseQueue.find((item) => item._id === product._id)
    if (!existingItem) {
      addToPurchaseQueue({ ...product, quantity: 1 })
    } else {
      const updatedQueue = purchaseQueue.map((item) =>
        item._id === existingItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
      setPurchaseQueue(updatedQueue)
    }
  }

  const handleQuantityChange = (itemId, newQty) => {
    const updatedQueue = purchaseQueue.map((item) =>
      item._id === itemId ? { ...item, quantity: Number(newQty) } : item,
    )
    addToPurchaseQueue(updatedQueue)
  }

  return (
    <div className="list-window">
      <TransactionSearch
        products={products}
        onSearch={handleItemInput}
        onProductSelect={handleProductSelect}
      />
      <div className="purchase-queue">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {purchaseQueue.map((item) => (
              <tr key={item._id}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(evt) =>
                      handleQuantityChange(item._id, evt.target.value)
                    }
                  />
                </td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListWindow
