import axios from 'axios'
import { useEffect, useState } from 'react'

const ProductCard = (props) => {
  /*
props.(insert here)
  key, name, description, upc, sku, productType, alcoholContent,
  taxable, activeStatus, unitSize, casePack, dietaryRestrictions, aisle, vendor
*/

  const [vendor, setVendor] = useState([])

  //Don't need on this page: taxable, unitSize, dietaryRestrictions,aisle

  const getVendor = async () => {
    try {
      let res = await axios.get(`http://localhost:3001/vendors/${props.vendor}`)
      setVendor(res.data.vendorName)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getVendor()
  }, [])

  return (
    <div className="product-card">
      <h3 className="name-wrapper">{props.name}</h3>
      <div className="info-wrapper flex-col">
        <p>Description: {props.description}</p>
        <p>
          UPC: {props.upc}&emsp;SKU: {props.sku}&emsp;{' '}
          {props.productType.charAt(0).toUpperCase() +
            props.productType.slice(1)}
        </p>
        <p>
          Status:{' '}
          {props.activeStatus.charAt(0).toUpperCase() +
            props.activeStatus.slice(1)}
          &emsp;Case Pack: {props.casePack}
        </p>
        <p>Vendor: {vendor}</p>
      </div>
    </div>
  )
}

export default ProductCard
