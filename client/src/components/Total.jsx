import { useState } from "react"

const Total = ({
  subtotal,
  tax,
  deposit,
  total,
  calculateTotal,
  handlePayment,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [amountPaid, setAmountPaid] = useState(0)

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)

    setAmountPaid(method === "cash" ? 0 : total)
  }

  const handleSubmitPayment = (evt) => {
    evt.preventDefault()

    if (!amountPaid || isNaN(parseFloat(amountPaid))) {
      alert("Please enter a valid payment amount.")
      return
    }

    if (paymentMethod === "cash") {
      const parsedPaid = parseFloat(amountPaid)
      if (parsedPaid >= total) {
        const returnedChange = parsedPaid - total
        handlePayment(paymentMethod, parsedPaid, returnedChange)
      } else {
        alert("Insufficient funds.")
      }
    } else {
      handlePayment(paymentMethod, total)
    }
  }

  const handleChange = (evt) => {
    setAmountPaid(evt.target.value)
  }

  return (
    <div className="total-section">
      <div className="total-row">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="total-row">
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="total-row">
        <span>Deposit:</span>
        <span>${deposit.toFixed(2)}</span>
      </div>
      <div className="total-row">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="total-buttons">
        <button onClick={calculateTotal}>Calculate Total</button>
        <button
          className={paymentMethod === "cash" ? "selected-button" : ""}
          onClick={() => handlePaymentMethodChange("cash")}
        >
          Cash
        </button>
        <button
          className={paymentMethod === "credit" ? "selected-button" : ""}
          onClick={() => handlePaymentMethodChange("credit")}
        >
          Credit
        </button>
        <button
          className={paymentMethod === "debit" ? "selected-button" : ""}
          onClick={() => handlePaymentMethodChange("debit")}
        >
          Debit
        </button>
      </div>
      {paymentMethod === "cash" && (
        <div>
          <form onSubmit={handleSubmitPayment}>
            <label htmlFor="payment-amount">Payment Amount:</label>
            <input
              name="payment-amount"
              className="payment-amount"
              type="text"
              value={amountPaid}
              onChange={handleChange}
              placeholder="Enter Amount Paid"
            />
            <button onClick={() => handlePayment("cash", amountPaid)}>
              Submit Payment
            </button>
          </form>
        </div>
      )}
      {paymentMethod === "credit" && (
        <div>
          <button onClick={() => handlePayment("credit", total)}>
            Submit Payment
          </button>
        </div>
      )}
      {paymentMethod === "debit" && (
        <div>
          <button onClick={() => handlePayment("debit", total)}>
            Submit Payment
          </button>
        </div>
      )}
    </div>
  )
}

export default Total
