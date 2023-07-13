import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VendorForm from '../components/VendorForm'

const VendorDetails = () => {
  const [vendorDetails, setVendorDetails] = useState({})

  let vendor = useParams()
  let vendorId = vendor.id

  console.log(vendorId) // This Works as Expected

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get(
        `http://localhost:3001/vendors/${vendorId}`
      )
      setVendorDetails(response.data)
    }
    getDetails()
  }, [vendorId])

  return (
    <div className="vendor-content">
      <section className="details">
        <div className="flex-row space">
          <VendorForm
            vendorName={vendorDetails.vendorName}
            repName={vendorDetails.repName}
            phoneNumber={vendorDetails.phoneNumber}
            email={vendorDetails.email}
          />
        </div>
      </section>
    </div>
  )
}

export default VendorDetails
