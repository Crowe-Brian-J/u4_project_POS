import { useState, useEffect } from "react"

const TransactionSearch = ({ products, onSearch, onProductSelect }) => {
  const [searchedProducts, setSearchedProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleInputChange = (evt) => {
    setSearchTerm(evt.target.value)
  }

  useEffect(() => {
    const performSearch = () => {
      const searched = products.filter((product) => {
        const productName = product.name.toLowerCase()
        const productDescription = product.description.toLowerCase()
        const productUpc = product.upc ? product.upc.toString() : ""
        const productSku = product.sku ? product.sku.toString() : ""

        return (
          productName.includes(searchTerm.toLowerCase()) ||
          productDescription.includes(searchTerm.toLowerCase()) ||
          productUpc.includes(searchTerm) ||
          productSku.includes(searchTerm)
        )
      })

      setSearchedProducts(searched)
    }

    performSearch()
  }, [searchTerm, products])

  const handleProductClick = (product) => {
    onProductSelect(product)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Item/SKU"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm.trim() !== "" && searchedProducts.length > 0 && (
        <div>
          <ul>
            {searchedProducts.map((product) => (
              <li
                key={product._id}
                className="cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {product.name} - SKU: {product.sku}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TransactionSearch
