import { useState } from 'react'

const VendorEdit = (props) => {
  const initialState = {
    vendorName: props.vendorName,
    repName: props.repName,
    phoneNumber: props.phoneNumber,
    email: props.email
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (evt) => {
    setFormState({ ...formState, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <br />
      <br />
      <form method="POST">
        <label htmlFor="vendorName">Vendor Name:&emsp;</label>
        <input
          type="text"
          id="vendorName"
          className="vendorName"
          onChange={handleChange}
          value={props.vendorName}
          placeholder={props.vendorName}
        />
        <br />
        <br />
        <label htmlFor="repName">Rep Name:&emsp;</label>
        <input
          type="text"
          id="repName"
          className="repName"
          onChange={handleChange}
          value={props.repName}
          placeholder={props.repName}
        />
        <br />
        <br />
        <label htmlFor="phoneNumber">Phone Number:&emsp;</label>
        <input
          type="tel"
          id="phoneNumber"
          className="phoneNumber"
          onChange={handleChange}
          value={props.phoneNumber}
          placeholder={props.phoneNumber}
        />
        <br />
        <br />
        <label htmlFor="email">Email:&emsp;</label>
        <input
          type="email"
          id="email"
          className="email"
          onChange={handleChange}
          value={props.email}
          placeholder={props.email}
        />
      </form>
      <button className="submitButton" type="submit">
        Submit
      </button>
    </div>
  )
}

export default VendorEdit
