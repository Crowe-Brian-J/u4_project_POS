import { useState } from 'react'
import axios from 'axios'

const NewVendor = ({ vendors, setVendors }) => {
  let initialState = {
    vendorName: '',
    repName: '',
    phoneNumber: '',
    email: ''
  }

  const [formState, setFormState] = useState(initialState)

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    let newVendor = await axios.post('http://localhost:3001/vendors', formState)
    console.log(newVendor)
    let newList = [...vendors]
    newList.push(newVendor.data)
    setVendors(newList)
    setFormState(initialState)
  }

  const handleChange = (evt) => {
    setFormState({ ...formState, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vendorName">Vendor Name:&emsp;</label>
        <input
          type="text"
          id="vendorName"
          onChange={handleChange}
          value={formState.vendorName}
        />
        <br />
        <br />
        <label htmlFor="repName">Rep Name:&emsp;</label>
        <input
          type="text"
          id="repName"
          onChange={handleChange}
          value={formState.repName}
        />
        <br />
        <br />
        <label htmlFor="phoneNumber">Phone Number:&emsp;</label>
        <input type="tel" id="phoneNumber" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="email">Email:&emsp;</label>
        <input
          type="email"
          id="email"
          className="email"
          onChange={handleChange}
          value={formState.email}
        />
      </form>
      <button className="submitButton" type="submit">
        Submit
      </button>
    </div>
  )
}

export default NewVendor
