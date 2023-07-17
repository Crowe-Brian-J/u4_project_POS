import { useEffect, useState } from 'react'
import axios from 'axios'

const Inventory = () => {
  // Array of Products
  const [products, setProducts] = useState([])

  // Get Helper Functions
  const getProducts = async () => {
    try {
      await axios.get('http://localhost:3001/products').then((response) => {
        // Filter products for items with a qtyOnHand > and < 0
        const filteredProducts = response.data.filter(
          (product) => product.qtyOnHand !== 0
        )
        setProducts(filteredProducts)
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    // Possibly useEffect to filter the products?
    getProducts()
    console.log(products)
  }, [])

  return (
    <div className="inventory-wrapper">
      <table>
        <thead>
          <tr>
            <th>Product Name:</th>
            <th>Quantity On Hand</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.qtyOnHand}</td>
              <td>{product.vendor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Inventory
