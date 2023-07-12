const VendorCard = (props) => {
  // props.vendorName, props.repName, props.phoneNumber, props.email

  return (
    <div className="vendor-card">
      <h3>{props.vendorName}</h3>
      <div className="info-wrapper flex-col">
        <p>{props.repName}</p>
        <p>{props.phoneNumber}</p>
        <p>{props.email}</p>
        <p>
          <button>Edit</button>
        </p>
        <br />
      </div>
    </div>
  )
}

export default VendorCard
