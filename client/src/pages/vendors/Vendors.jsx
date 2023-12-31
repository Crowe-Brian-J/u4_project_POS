import VendorCard from '../../components/VendorCard'
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
      console.error(err)
    }
  }

  useEffect(() => {
    getVendors()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/vendors/${id}`)
      setVendors((previousVendors) =>
        previousVendors.filter((vendor) => vendor._id !== id)
      )
      console.log('Vendor deleted successfully!')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Link
        to={{ pathname: 'new', state: { vendors, setVendors } }}
        style={{ textDecoration: 'none' }}
      >
        <button className="add-vendor">Add a Vendor</button>
      </Link>
      <div className="vendors container-grid">
        {vendors.map((vendor) => (
          <div key={vendor._id}>
            <button
              className="delete-button button-container"
              onClick={() => handleDelete(vendor._id, vendors)}
            >
              Delete {vendor.vendorName}
            </button>
            <Link
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vendors
