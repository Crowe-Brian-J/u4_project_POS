const Total = (props) => {
  // props.subtotal, props.tax, props.deposit, props.total, props.calculateTotal, props.handlePayment
  return (
    <div className="bottom-total">
      <div>
        <h5>Subtotal: ${props.subtotal.toFixed(2)}</h5>
        <h5>Tax: ${props.tax.toFixed(2)}</h5>
        {/* .toFixed(2) for uniformity */}
        <h5>Deposit: ${props.deposit.toFixed(2)}</h5>
      </div>
      <div>
        <h1>Total: ${props.total.toFixed(2)}</h1>
        <div className="payment-button-container">
          <button className="pay-button">
            <strong>Cash</strong>
          </button>
          &nbsp;
          <button className="pay-button">
            <strong>Card/Tap</strong>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Total
