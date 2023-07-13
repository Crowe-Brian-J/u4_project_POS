import VendorCard from '../components/VendorCard'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Vendors = () => {
  const [vendors, setVendors] = useState([])

  const getVendors = async () => {
    try {
      let res = await axios.get('http://localhost:3001/vendors')
      setVendors(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getVendors()
  }, [])

  return (
    <div className="vendors container-grid">
      {/* remove index, change key to vendor.id */}
      {vendors.map((vendor) => (
        <Link
          // Don't use leading vendors/anything for link here.
          to={`${vendor._id}`}
          key={vendor._id}
          style={{ textDecoration: 'none' }}
        >
          <VendorCard
            key={vendor._id}
            vendorName={vendor.vendorName}
            repName={vendor.repName}
            phoneNumber={vendor.phoneNumber}
            email={vendor.email}
          />
        </Link>
      ))}
      <Link
        to={{ pathname: 'new', state: { vendors, setVendors } }}
        //   'new'}
        // state={(vendors, setVendors)}
        style={{ textDecoration: 'none' }}
      >
        <button className="add-vendor">Add a Vendor</button>
      </Link>
    </div>
  )
}

export default Vendors
