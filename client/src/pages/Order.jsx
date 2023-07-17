import axios from "axios"
import { useState, useEffect } from "react"

const Order = () => {
  // Array of vendors
  const [vendors, setVendors] = useState([])
  // Single Vendor Object
  const [selectedVendor, setSelectedVendor] = useState({})
  // Array of Products
  const [products, setProducts] = useState([])

  const getVendors = async () => {
    try {
      let res = await axios.get("http://localhost:3001/vendors")
      setVendors(res.data)
    } catch (err) {
      console.error(err)
    }
  }
  const getProducts = async () => {
    try {
      console.log(selectedVendor._id)
      console.log(selectedVendor.vendorName)
      await axios.get("http://localhost:3001/products").then((res) => {
        // Filter products with selectedVendor
        const filteredProducts = res.data.filter(
          (product) => product.vendor === selectedVendor._id,
        )
        console.log(filteredProducts)
        setProducts(filteredProducts)
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getVendors()
    getProducts()
  }, [selectedVendor])

  const handleVendorChange = (evt) => {
    const selectedValue = evt.target.value
    // adding this to try and give it more time to refresh
    const selectedVendorObj = selectedValue
      ? vendors.find((vendor) => vendor._id === selectedValue)
      : {}
    setSelectedVendor(selectedVendorObj)
  }

  return (
    <div>
      <div className="order">
        <h1>Order</h1>
      </div>
      <div className="order-form">
        <div>
          <label htmlFor="vendor-name">Vendor:&nbsp;</label>
          {/* <input type="select" className="vendor-name" /> */}
          <select
            className="vendor-name"
            name="vendor-name"
            id="vendor-name"
            value={selectedVendor._id}
            onChange={handleVendorChange}
          >
            <option value="">Select a Vendor</option>
            {vendors.map((selectVendor) => (
              <option key={selectVendor._id} value={selectVendor._id}>
                {selectVendor.vendorName}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="item-name">Item Name:&nbsp;</label>
          <input type="text" className="item-name" />
          &emsp;
          <label htmlFor="item-sku">Item SKU:&nbsp;</label>
          <input type="text" className="item-sku" />
        </div>
        <br />
        <br />
        {products.map((product) => (
          <div className="product-map">{product.name}</div>
        ))}
        {/* <table className="order-table">
          <tr>
            <th>Here is a table.</th>
            <th>Here's another topper.</th>
          </tr>
          <tr>
            <td>Here's the table's piece.</td>
            <td>Here's another piece.</td>
          </tr>
        </table> */}
      </div>
    </div>
  )
}

export default Order
