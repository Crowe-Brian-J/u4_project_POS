import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product } from '../../../../models'

const typeEnumValues = Product.schema.path('productType').enumValues
const alcoholContentEnumValues =
  Product.schema.path('alcoholContent').enumValues
const activeStatusEnumValues = Product.schema.path('activeStatus').enumValues

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    upc: null,
    sku: '',
    alcoholContent: '',
    taxable: false,
    activeStatus: true,
    unitSize: '',
    casePack: null,
    dietaryRestrictions: [],
    aisle: null,
    vendor: {
      vendorName: '',
      repName: '',
      phoneNumber: '',
      email: ''
    }
  })

  let { id: productId } = useParams()

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/${productId}`
        )
        setProductDetails(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getDetails()
  }, [productId])

  const navigate = useNavigate()
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const response = await axios.put(
        `http://localhost:3001/products/${productId}`,
        productDetails
      )
      navigate('/products')
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setProductDetails((productDetails) => ({
      ...productDetails,
      [name]: value
    }))
    console.log(productDetails)
  }

  return (
    <div className="product-content">
      <section className="details">
        <div className="flex-row space">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name:</label>
            <br />
            <input
              type="text"
              className="name"
              name="name"
              value={productDetails.name}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="description">Description:</label>
            <br />
            <input
              type="text"
              className="description"
              name="description"
              value={productDetails.description}
              onChange={handleChange}
            />
            <label htmlFor="upc">UPC:</label>
            <br />
            <input
              type="number"
              className="upc"
              name="upc"
              value={productDetails.upc}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="sku">SKU:</label>
            <br />
            <input
              type="text"
              className="sku"
              name="sku"
              value={productDetails.sku}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="productType">Product Type:</label>
            <br />
            <select
              className="productType"
              name="productType"
              value={productDetails.productType}
              onChange={handleChange}
            >
              {typeEnumValues.map((enumOption) => (
                <option key={enumOption} value={enumOption}>
                  {enumOption}
                </option>
              ))}
            </select>
            <label htmlFor="alcoholContent">Alcohol Content:</label> <br />
            <select
              className="alcoholContent"
              name="alcoholContent"
              value={productDetails.alcoholContent}
              onChange={handleChange}
            >
              {alcoholContentEnumValues.map((enumOption) => (
                <option key={enumOption} value={enumOption}>
                  {enumOption}
                </option>
              ))}
            </select>
            <label htmlFor="taxable">Taxable:</label>
            <br />
            <input
              type="radio"
              id="taxable-yes"
              className="taxable"
              name="taxable"
              value={true}
            />
            <label htmlFor="taxable-yes">Yes</label>
            <br />
            <input
              type="radio"
              id="taxable-no"
              className="taxable"
              name="taxable"
              value={false}
            />
            <label htmlFor="taxable-no">No</label>
            <br />
            <label htmlFor="Active Status">Active Status</label>
            <br />
            <select
              className="activeStatus"
              name="activeStatus"
              value={productDetails.activeStatus}
              onChange={handleChange}
            >
              {activeStatusEnumValues.map((enumOption) => (
                <option key={enumOption} value={enumOption}>
                  {enumOption}
                </option>
              ))}
            </select>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails
