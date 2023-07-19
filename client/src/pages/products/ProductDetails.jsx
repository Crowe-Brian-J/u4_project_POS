import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const ProductDetails = () => {
  const [vendors, setVendors] = useState([])

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
    "7.5oz",
    "11.5oz",
    "12oz",
    "16oz",
    "18oz",
    "24oz",
    "40oz",
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

  // States
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    upc: null,
    sku: "",
    productType: "",
    alcoholContent: "",
    taxable: false,
    activeStatus: true,
    unitSize: "",
    casePack: null,
    dietaryRestrictions: [],
    aisle: null,
    vendor: null,
  })
  const [selectedProductType, setSelectedProductType] = useState("")
  const [selectedVendor, setSelectedVendor] = useState("")
  const [unitSizes, setUnitSizes] = useState([])

  let { id: productId } = useParams()

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/${productId}`,
        )
        setProductDetails(response.data)
        setSelectedProductType(response.data.productType)
        setSelectedVendor(response.data.vendor.vendorName)
      } catch (err) {
        console.error(err)
      }
    }
    const getVendors = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vendors`)
        setVendors(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getDetails()
    getVendors()
  }, [productId])

  const navigate = useNavigate()

  // Helper Function to update options for unitSizes based on productType
  const updateUnitSizes = () => {
    if (selectedProductType === "beer") {
      console.log("The Product Type is Beer")
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
      const response = await axios.put(
        `http://localhost:3001/products/${productId}`,
        productDetails,
      )
      navigate("/products")
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setProductDetails((productDetails) => ({
      ...productDetails,
      [name]: value,
    }))
    console.log(productDetails)
  }

  const handleVendorChange = (evt) => {
    const selectedVendorName = evt.target.value
    setSelectedVendor(selectedVendorName)
    const selectedVendorObj = vendors.find(
      (vendor) => vendor.vendorName === selectedVendorName,
    )
    setProductDetails((prevState) => ({
      ...prevState,
      vendor: selectedVendorObj,
    }))
  }

  return (
    <div className="product-content">
      <h2>Product Details</h2>
      <section className="details">
        <div className="flex-row space">
          {productDetails.qtyOnHand ? (
            <p className="in-stock">In Stock: {productDetails.qtyOnHand}</p>
          ) : null}
          <form onSubmit={handleSubmit}>
            <label htmlFor="vendor">Vendor:</label>
            <select
              id="vendor"
              className="vendor"
              name="vendor"
              value={selectedVendor}
              onChange={handleVendorChange}
            >
              <option value="">Select a Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor.vendorName}>
                  {vendor.vendorName}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="name">Product Name:</label>
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
            />{" "}
            <br />
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
                  {option}
                </option>
              ))}
            </select>{" "}
            &emsp;
            <label htmlFor="alcoholContent">Alcohol Content:</label>
            <select
              className="alcoholContent"
              name="alcoholContent"
              value={productDetails.alcoholContent}
              onChange={handleChange}
            >
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
            {/* Need to work on this form's display. Maybe Change to Yes or No, default No*/}
            <div className="form-section">
              <label htmlFor="taxable">Taxable:</label>
              <div className="radio-group">
                <input
                  type="radio"
                  id="taxable-yes"
                  className="taxable"
                  name="taxable"
                  value={true}
                  checked={productDetails.taxable === true}
                  onChange={handleChange}
                />
                <label htmlFor="taxable-yes">Yes</label>
                <input
                  type="radio"
                  id="taxable-no"
                  className="taxable"
                  name="taxable"
                  value={false}
                  checked={productDetails.taxable === false}
                  onChange={handleChange}
                />
                <label htmlFor="taxable-no">No</label>
              </div>
            </div>
            <br />
            <label htmlFor="activeStatus">Active Status:</label>
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
            &emsp;
            <label htmlFor="unitSize">Unit Size:</label>
            <select
              name="unitSize"
              className="unitSize"
              id="unitSize"
              value={productDetails.unitSize}
              onChange={handleChange}
            >
              <option value="">Select a Unit Size</option>
              {unitSizes.map((unitSize) => (
                <option key={unitSize} value={unitSize}>
                  {unitSize}
                </option>
              ))}
            </select>{" "}
            &emsp;
            <label htmlFor="casePack">Case Pack: (How many per case?)</label>
            <select
              className="casePack"
              name="casePack"
              id="casePack"
              value={productDetails.casePack}
              onChange={handleChange}
            >
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
            </select>{" "}
            <br />
            {/* How do I uncenter these? */}
            <div className="form-section">
              <label htmlFor="dietaryRestrictions">Dietary Restrictions:</label>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="dietaryRestrictions-kosher"
                  className="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value="Kosher"
                  onChange={handleChange}
                />
                <label htmlFor="dietaryRestrictions-kosher">Kosher</label>
                <input
                  type="checkbox"
                  id="dietaryRestrictions-organic"
                  className="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value="Organic"
                  onChange={handleChange}
                />
                <label htmlFor="dietaryRestrictions-organic">Organic</label>{" "}
              </div>
              <br />
            </div>
            <label htmlFor="aisle">Aisle:</label> <br />
            <input
              type="number"
              id="aisle"
              className="aisle"
              name="aisle"
              value={productDetails.aisle}
              onChange={handleChange}
            />
            <button type="submit" className="submitButton">
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails
