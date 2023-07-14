import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const NewVendor = ({ location }) => {
  let initialState = {
    vendorName: '',
    repName: '',
    phoneNumber: '',
    email: ''
  }

  location = useLocation()
  const { vendors, setVendors } = location.state || {
    vendors: [],
    setVendors: () => {}
  }

  const [formState, setFormState] = useState(initialState)

  const navigate = useNavigate()

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const newVendor = await axios.post(
        'http://localhost:3001/vendors',
        formState
      )
      let newList = [...vendors]
      newList.push(newVendor.data)
      setVendors(newList)
      setFormState(initialState)
      navigate('/vendors')
    } catch (error) {
      console.error(error)
    }
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
          pattern="^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$"
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
