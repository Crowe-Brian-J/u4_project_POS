import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const VendorDetails = () => {
  const [vendorDetails, setVendorDetails] = useState({
    vendorName: '',
    repName: '',
    phoneNumber: '',
    email: ''
  })

  let { id: vendorId } = useParams()

  useEffect(() => {
    const getDetails = async () => {
      // const response = await axios.get(
      //   `http://localhost:3001/vendors/${vendorId}`
      // )
      // console.log(response.data)
      // setVendorDetails(response.data)
      try {
        const response = await axios.get(
          `http://localhost:3001/vendors/${vendorId}`
        )
        setVendorDetails(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getDetails()
  }, [vendorId])

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    // let updateData = await axios.put(
    //   `http://localhost:3001/vendors/${vendorId}`,
    //   vendorDetails
    // )
    // console.log(updateData)
    try {
      const response = await axios.put(
        `http://localhost:3001/vendors/${vendorId}`,
        vendorDetails
      )
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setVendorDetails((vendorDetails) => ({
      ...vendorDetails,
      [name]: value
    }))
    console.log(vendorDetails)
  }

  return (
    <div className="vendor-content">
      <section className="details">
        <div className="flex-row space">
          {/* <VendorForm
            vendorName={vendorDetails.vendorName}
            repName={vendorDetails.repName}
            phoneNumber={vendorDetails.phoneNumber}
            email={vendorDetails.email}
          /> */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="vendorName">Vendor Name:</label>
            <br />
            <input
              type="text"
              className="vendorName"
              name="vendorName"
              value={vendorDetails.vendorName}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="repName">Rep Name:</label>
            <br />
            <input
              type="text"
              className="repName"
              name="repName"
              value={vendorDetails.repName}
              onChange={handleChange}
            />{' '}
            <br />
            <label htmlFor="phoneNumber">Phone Number:</label> <br />
            <input
              type="text"
              className="phoneNumber"
              name="phoneNumber"
              value={vendorDetails.phoneNumber}
              onChange={handleChange}
            />{' '}
            <br />
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              className="email"
              name="email"
              value={vendorDetails.email}
              onChange={handleChange}
            />
            <button type="submit" className="submitButton">
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default VendorDetails
