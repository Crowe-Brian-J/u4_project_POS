import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewProduct = () => {
  // enum values
  // Look at components
  const typeEnumValues = [
    'beer',
    'wine',
    'liquor',
    'misc - taxable',
    'misc - nontaxable',
    'snacks',
    'carbonated, nonalcoholic'
  ]
  const alcoholContentEnumValues = [
    '> 36% / 72 proof (Liquor)',
    '> 14%, < 24% (Wines)',
    '~12-15% (Malt Beverages)',
    '~4-14% (Beer)',
    'Nonalcoholic'
  ]
  const beerUnitSizeEnumValues = [
    'Single',
    '7.5oz',
    '11.5oz',
    '12oz',
    '16oz',
    '18oz',
    '24oz',
    '40oz',
    '4pk',
    '6pk',
    '8pk',
    '12pk',
    '18pk',
    '24pk',
    '30pk',
    '36pk'
  ]
  const wineUnitSizeEnumValues = [
    '187mL',
    '4pk',
    '375mL',
    '500mL',
    '750mL',
    '1.5L',
    '3L',
    '4.5L',
    '5L'
  ]
  const liquorUnitSizeEnumValues = [
    '50mL',
    '100mL',
    '200mL',
    '375mL',
    '750mL',
    '1L',
    '1.5L',
    '1.75L'
  ]
  const sodaUnitSizeEnumValues = [
    'Single (20oz, 2L, etc.)',
    '4pk',
    '6pk',
    '12pk'
  ]
  const snackUnitSizeEnumValues = ['0.5oz', '1oz', '8.5oz', '10oz', '13oz']
  const activeStatusEnumValues = [
    'active',
    'inactive (i.e. seasonally unavailable'
  ]
  const casePackEnumValues = [1, 2, 4, 6, 8, 10, 12, 24]

  let initialState = {
    name: '',
    description: '',
    upc: 0,
    sku: '',
    productType: '',
    alcoholContent: '',
    taxable: false,
    activeStatus: 'active',
    unitSize: '',
    casePack: 0,
    dietaryRestrictions: [],
    aisle: 0,
    vendor: ''
  }

  // Do I need products, setProducts
  const { products, setProducts } = {
    products: [],
    setProducts: () => {}
  }

  // States
  const [formState, setFormState] = useState(initialState)
  const [selectedProductType, setSelectedProductType] = useState('')
  const [unitSizes, setUnitSizes] = useState([])

  const navigate = useNavigate()

  // Helper Function to update options for unitSizes based on productType
  const updateUnitSizes = (productType) => {
    if (productType === 'beer') {
      setUnitSizes(beerUnitSizeEnumValues)
    } else if (productType === 'wine') {
      setUnitSizes(wineUnitSizeEnumValues)
    } else if (productType === 'liquor') {
      setUnitSizes(liquorUnitSizeEnumValues)
    } else if (productType === 'carbonated, nonalcoholic') {
      setUnitSizes(sodaUnitSizeEnumValues)
    } else if (productType === 'snacks') {
      setUnitSizes(snackUnitSizeEnumValues)
    } else {
      setUnitSizes('Pkg')
    }
  }

  // Helper Function to Check on Product Type
  const handleProductTypeChange = (evt) => {
    setSelectedProductType(evt.target.value)
    updateUnitSizes(evt.target.value)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const newProduct = await axios.post(
        'http://localhost:3001/products',
        formState
      )
      let newList = [...products]
      newList.push(newProduct.data)
      setProducts(newList)
      setFormState(initialState)
      navigate('/products')
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (evt) => {
    setFormState({ ...formState, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:&emsp;</label>
        {/* Change this to enum of vendors, currently works as is */}
        <input
          type="text"
          id="name"
          value={formState.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={formState.description}
          onChange={handleChange}
        />
        <label htmlFor="upc">UPC:</label>
        <input
          type="number"
          id="upc"
          value={formState.upc}
          onChange={handleChange}
        />
        <label htmlFor="sku">SKU:</label>
        <input
          type="text"
          id="sku"
          value={formState.sku}
          onChange={handleChange}
        />
        <label htmlFor="productType">Product Type:</label>
        <select
          id="productType"
          className="productType"
          name="productType"
          value={selectedProductType}
          onChange={handleProductTypeChange}
        >
          <option value="">Select a Product Type</option>
          {typeEnumValues.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default NewProduct
