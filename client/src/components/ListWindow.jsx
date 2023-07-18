import { useState } from "react"

const ListWindow = ({ addToPurchaseQueue }) => {
  const [itemInput, setItemInput] = useState("")

  const handleItemInput = (evt) => {
    setItemInput(evt.target.value)
  }

  const addItemToQueue = () => {
    if (itemInput !== "") {
      addToPurchaseQueue(itemInput)
      // Set ItemInput back to blank after added to queue
      setItemInput("")
    }
  }

  return (
    <div className="item-width">
      <div className="item-enter card">
        <span className="item-sku">Enter Item/SKU: </span> &emsp; Enter Item
        Here!
      </div>
      <div className="list window">
        <div className="list card">
          <div>Here is a box for the items in purchase queue.</div>
        </div>
      </div>
    </div>
  )
}

export default ListWindow
