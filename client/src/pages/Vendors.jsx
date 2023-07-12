import VendorCard from '../components/VendorCard'
import { Link } from 'react-router-dom'

const vendies = [
  {
    vendorName: 'Bud',
    repName: 'John Gaffney',
    phoneNumber: '978-555-1234',
    email: 'john.gaffney@augustabusch.com'
  },
  {
    vendorName: 'Burke',
    repName: 'John Simpson',
    phoneNumber: '617-555-4321',
    email: 'john.simpson@burkedistributing.com'
  },
  {
    vendorName: 'Horizon',
    repName: 'John Quinn',
    phoneNumber: '781-555-6789',
    email: 'john.quinn@horizonbeverage.com'
  },
  {
    vendorName: 'Martignetti',
    repName: 'Joe Sciarappa',
    phoneNumber: '781-555-9269',
    email: 'scraps@martignetti.com'
  },
  {
    vendorName: 'MS Walker',
    repName: 'Kelly Quinn',
    phoneNumber: '978-555-3991',
    email: 'kelly.quinn@mswalker.com'
  },
  {
    vendorName: 'Pine State',
    repName: 'Jerkface McJerkerson',
    phoneNumber: '617-555-3206',
    email: 'jerk@off.com'
  }
]

const Vendors = () => {
  return (
    <div className="vendors">
      <br />
      {/* remove index, change key to vendor.id */}
      {vendies.map((vendor, index) => (
        <Link
          // Don't use leading vendors/anything for link here.
          to={`${index}`}
          key={index}
          style={{ textDecoration: 'none' }}
        >
          <VendorCard
            key={index}
            vendorName={vendor.vendorName}
            repName={vendor.repName}
            phoneNumber={vendor.phoneNumber}
            email={vendor.email}
          />
        </Link>
      ))}
      <button className="add-vendor">Add a Vendor</button>
    </div>
  )
}

export default Vendors
