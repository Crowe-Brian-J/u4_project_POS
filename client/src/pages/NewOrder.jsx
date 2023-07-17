import axios from "axios"
import { useState, useEffect } from "react"

const NewOrder = () => {
  // Array of vendors
  const [vendors, setVendors] = useState([])
  // Single Vendor Object
  const [selectedVendor, setSelectedVendor] = useState({})
  // Array of Products
  const [products, setProducts] = useState([])
  // Array of CreateOrder
  const [order, setOrder] = useState([])

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
      await axios.get("http://localhost:3001/products").then((res) => {
        // Filter products with selectedVendor
        const filteredProducts = res.data.filter(
          (product) => product.vendor === selectedVendor._id,
        )
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
        <h1>Create Order</h1>
      </div>
      <form action="">
        <div className="order-form">
          <>
            <label htmlFor="vendor-name">Vendor:&nbsp;</label>
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
            <table>
              <thead>
                <tr>
                  <th>Product Name:</th>
                  <th>SKU:</th>
                  <th>QTY:</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td className="center-this">{product.sku}</td>
                    <td>
                      <input type="number" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
          <br />
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
        <button type="submit">Create Order</button>
      </form>
    </div>
  )
}

export default NewOrder
