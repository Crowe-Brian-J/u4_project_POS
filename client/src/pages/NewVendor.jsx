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
          value={formState.vendorName}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="repName">Rep Name:&emsp;</label>
        <input
          type="text"
          id="repName"
          value={formState.repName}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="phoneNumber">Phone Number:&emsp;</label>
        <input
          type="text"
          id="phoneNumber"
          value={formState.phoneNumber}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="email">Email:&emsp;</label>
        <input
          type="email"
          id="email"
          className="email"
          value={formState.email}
          onChange={handleChange}
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewVendor
