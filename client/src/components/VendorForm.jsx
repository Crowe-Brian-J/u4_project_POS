import { useState } from 'react'

const VendorForm = (props) => {
  console.log('This is props: ' + props.vendorName)

  let initialState = {
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
          value={formState.vendorName}
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
          value={formState.repName}
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
          value={formState.phoneNumber}
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
          value={formState.email}
          placeholder={props.email}
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default VendorForm
