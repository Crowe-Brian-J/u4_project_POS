const Total = ({
  subtotal,
  tax,
  deposit,
  total,
  calculateTotal,
  handlePayment,
}) => {
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
        <button onClick={() => handlePayment("cash")}>Cash</button>
        <button onClick={() => handlePayment("credit")}>Credit</button>
        <button onClick={() => handlePayment("debit")}>Debit</button>
      </div>
    </div>
  )
}

export default Total
