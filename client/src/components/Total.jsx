const Total = () => {
  return (
    <div className="bottom-total">
      <div>
        <h5>Subtotal: $10.75</h5>
        <h5>Tax: $0.00</h5>
        <h5>Deposit: $0.20</h5>
      </div>
      <div>
        <h1>Total: $10.95</h1>
        <button className="pay-button">
          <strong>Cash</strong>
        </button>
        &nbsp;
        <button className="pay-button">
          <strong>Card/Tap</strong>
        </button>
      </div>
    </div>
  )
}

export default Total
