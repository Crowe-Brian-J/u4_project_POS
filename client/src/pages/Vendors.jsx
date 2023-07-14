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

  const handleDelete = (id, list) => {
    let expandList = [...list]
    expandList.splice(id, 1)
    setVendors(expandList)
  }

  return (
    <div className="vendors container-grid">
      {/* remove index, change key to vendor.id */}
      {vendors.map((vendor) => (
        <div key={vendor._id}>
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
          <button
            className="delete-button button-container"
            onClick={() => handleDelete(vendor._id, vendors)}
          >
            Delete {vendor.vendorName}
          </button>
        </div>
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
