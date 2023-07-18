import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const NewOrder = () => {
  // Array of vendors
  const [vendors, setVendors] = useState([])
  // Single Vendor Object
  const [selectedVendor, setSelectedVendor] = useState({})
  // Array of Products
  const [products, setProducts] = useState([])
  const [quantities, setQuantities] = useState([])

  const navigate = useNavigate()

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
    const selectedVendorObj =
      vendors.find((vendor) => vendor._id === selectedValue) || {}
    setSelectedVendor(selectedVendorObj)
  }

  const handleChange = (evt, productId) => {
    const { value } = evt.target
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }))
  }

  const handleSubmit = async (evt) => {
    console.log(selectedVendor)
    evt.preventDefault()
    const orderItems = []
    products.forEach((product) => {
      const productId = product._id
      const productCasePack = product.casePack
      const productName = product.name
      console.log(productName)
      const quantity = parseInt(quantities[productId] || 0, 10)
      if (quantity > 0) {
        orderItems.push({
          product: productId,
          name: productName,
          quantity: quantity,
          casePack: parseInt(productCasePack),
        })
      }
    })

    if (orderItems.length > 0) {
      const newOrder = {
        received: false,
        vendor: selectedVendor._id,
        items: orderItems,
      }
      console.log(newOrder.items)

      try {
        await axios.post("http://localhost:3001/orders", newOrder)
        navigate("/orders")
      } catch (err) {
        console.error(err)
      }
    } else {
      console.log("No order items to create the order.")
    }
  }

  return (
    <div>
      <div className="order">
        <h1>Create Order</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
                      <input
                        type="number"
                        value={quantities[product._id] || ""}
                        onChange={(evt) => handleChange(evt, product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit">Create Order</button>
          </>
        </div>
      </form>
    </div>
  )
}

export default NewOrder
