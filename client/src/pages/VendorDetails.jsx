import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VendorForm from '../components/VendorForm'

const VendorDetails = (props) => {
  console.log(props.key)

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

  // let { vendorId } = useParams()
  // console.log(vendorId)
  let vendor = vendies[0]

  return (
    <div className="vendor-content">
      <section className="details">
        <div className="flex-row space">
          <VendorForm
            vendorName={vendor.vendorName}
            repName={vendor.repName}
            phoneNumber={vendor.phoneNumber}
            email={vendor.email}
          />
        </div>
      </section>
    </div>
  )
}

export default VendorDetails
