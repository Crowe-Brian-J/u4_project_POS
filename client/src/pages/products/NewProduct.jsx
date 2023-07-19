import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const NewProduct = () => {
  // enum values
  // Look at components
  const typeEnumValues = [
    "beer",
    "wine",
    "liquor",
    "misc - taxable",
    "misc - nontaxable",
    "snacks",
    "carbonated, nonalcoholic",
  ]
  const alcoholContentEnumValues = [
    "> 36% / 72 proof (Liquor)",
    "> 14%, < 24% (Wines)",
    "~12-15% (Malt Beverages)",
    "~4-14% (Beer)",
    "Nonalcoholic",
  ]
  const beerUnitSizeEnumValues = [
    "Single",
    "4pk",
    "6pk",
    "8pk",
    "12pk",
    "18pk",
    "24pk",
    "30pk",
    "36pk",
  ]
  const wineUnitSizeEnumValues = [
    "187mL",
    "4pk",
    "375mL",
    "500mL",
    "750mL",
    "1.5L",
    "3L",
    "4.5L",
    "5L",
  ]
  const liquorUnitSizeEnumValues = [
    "50mL",
    "100mL",
    "200mL",
    "375mL",
    "750mL",
    "1L",
    "1.5L",
    "1.75L",
  ]
  const sodaUnitSizeEnumValues = [
    "Single (20oz, 2L, etc.)",
    "4pk",
    "6pk",
    "12pk",
  ]
  const snackUnitSizeEnumValues = ["0.5oz", "1oz", "8.5oz", "10oz", "13oz"]
  const activeStatusEnumValues = [
    "active",
    "inactive (i.e. seasonally unavailable)",
  ]
  const casePackEnumValues = [1, 2, 4, 6, 8, 10, 12, 24]

  let initialState = {
    name: "",
    description: "",
    upc: 0,
    sku: "",
    productType: "",
    alcoholContent: "",
    taxable: false,
    activeStatus: "active",
    unitSize: "",
    casePack: 0,
    dietaryRestrictions: [],
    aisle: 0,
    vendor: "",
  }

  const { products, setProducts } = {
    products: [],
    setProducts: () => {},
  }

  // States
  const [formState, setFormState] = useState(initialState)
  const [selectedProductType, setSelectedProductType] = useState("")
  const [unitSizes, setUnitSizes] = useState([])

  const navigate = useNavigate()

  // Helper Function to update options for unitSizes based on productType
  const updateUnitSizes = (productType) => {
    if (productType === "beer") {
      setUnitSizes(beerUnitSizeEnumValues)
    } else if (productType === "wine") {
      setUnitSizes(wineUnitSizeEnumValues)
    } else if (productType === "liquor") {
      setUnitSizes(liquorUnitSizeEnumValues)
    } else if (productType === "carbonated, nonalcoholic") {
      setUnitSizes(sodaUnitSizeEnumValues)
    } else if (productType === "snacks") {
      setUnitSizes(snackUnitSizeEnumValues)
    } else {
      setUnitSizes("Pkg")
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
        "http://localhost:3001/products",
        formState,
      )
      let newList = [...products]
      newList.push(newProduct.data)
      setProducts(newList)
      setFormState(initialState)
      navigate("/products")
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
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={formState.description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="upc">UPC:</label>
        <br />
        <input
          type="number"
          id="upc"
          value={formState.upc}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="sku">SKU:</label> <br />
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
        &emsp;
        <label htmlFor="alcoholContent">Alcohol Content:</label>
        <select
          className="alcoholContent"
          name="alcoholContent"
          id="alcoholContent"
          value={formState.alcoholContent}
          onChange={handleChange}
        >
          <option value="">Select an Alcohol Content</option>
          {alcoholContentEnumValues.map((enumOption) => (
            <option
              key={enumOption}
              id="alcoholContent"
              className="alcoholContent"
              name="alcoholContent"
              value={enumOption}
            >
              {enumOption}
            </option>
          ))}
        </select>
        &emsp;
        <label htmlFor="taxable">Taxable?</label>
        <select
          className="taxable"
          name="taxable"
          id="taxable"
          value={formState.taxable}
          onChange={handleChange}
        >
          <option value="">Yes or No?</option>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <br />
        <br />
        <label htmlFor="activeStatus">Active Status:</label>
        <select
          className="activeStatus"
          name="activeStatus"
          id="activeStatus"
          value={formState.activeStatus}
          onChange={handleChange}
        >
          <option value="">Select an Active Status</option>
          {activeStatusEnumValues.map((enumOption) => (
            <option key={enumOption} value={enumOption}>
              {enumOption.charAt(0).toUpperCase() + enumOption.slice(1)}
            </option>
          ))}
        </select>
        &emsp;
        <label htmlFor="unitSize">Unit Size:</label>
        {/* <select name="unitSize" className='unitSize' id="unitSize" value={}></select> */}
        &emsp;
        <label htmlFor="casePack">Case Pack: (How many per case?)</label>
        <select
          className="casePack"
          name="casePack"
          id="casePack"
          value={formState.casePack}
          onChange={handleChange}
        >
          <option value="">Select Case Pack</option>
          {casePackEnumValues.map((enumOption) => (
            <option
              key={enumOption}
              id="casePack"
              className="casePack"
              name="casePack"
              value={enumOption}
            >
              {enumOption}
            </option>
          ))}
        </select>
        <br />
        {/* How do I uncenter these? */}
        <label htmlFor="dietaryRestrictions">Dietary Restrictions:</label>
        <input
          type="checkbox"
          id="dietaryRestrictions"
          className="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formState.dietaryRestrictions}
          onChange={handleChange}
        />
        <label htmlFor="Kosher">Kosher</label>
        <input
          type="checkbox"
          id="dietaryRestrictions"
          className="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formState.dietaryRestrictions}
          onChange={handleChange}
        />
        <label htmlFor="Organic">Organic</label> <br />
        <label htmlFor="aisle">Aisle:</label>
        {/* Look at changing size of this input only */}
        <input
          type="text"
          id="aisle"
          className="aisle"
          name="aisle"
          value={formState.aisle}
          onChange={handleChange}
        />
        <button type="submit" className="submitButton">
          Add New Product
        </button>
      </form>
    </div>
  )
}

export default NewProduct
