import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      let res = await axios.get('http://localhost:3001/products')
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`)
      setProducts((previousProducts) =>
        previousProducts.filter((product) => product._id !== id)
      )
      console.log('Product deleted successfully!')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Link to={{ pathname: 'new', state: { products, setProducts } }}>
        <button className="add-product">Add a Product</button>
      </Link>
      <div className="products container-grid">
        {products.map((product) => (
          <div key={product._id}>
            <button
              className="delete-button button-container"
              onClick={() => handleDelete(product._id, products)}
            >
              Delete {product.name}
            </button>
            <Link
              to={`${product._id}`}
              key={product._id}
              style={{ textDecoration: 'none' }}
            >
              <ProductCard
                key={product._id}
                name={product.name}
                description={product.description}
                upc={product.upc}
                sku={product.sku}
                productType={product.productType}
                alcoholContent={product.alcoholContent}
                taxable={product.taxable}
                activeStatus={product.activeStatus}
                unitSize={product.unitSize}
                casePack={product.casePack}
                dietaryRestrictions={product.dietaryRestrictions}
                aisle={product.aisle}
                vendor={product.vendor}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
