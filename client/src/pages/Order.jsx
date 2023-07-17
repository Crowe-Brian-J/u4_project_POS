const Order = () => {
  return (
    <div>
      <div className="order">
        <h1>Order</h1>
      </div>
      <div className="order-form">
        <div>
          {/* Change from p to input */}
          <label htmlFor="vendor-name">Vendor:&nbsp;</label>
          <input type="select" className="vendor-name" />
          &emsp;
          <label htmlFor="item-name">Item Name:&nbsp;</label>
          <input type="text" className="item-name" />
          &emsp;
          <label htmlFor="item-sku">Item SKU:&nbsp;</label>
          <input type="text" className="item-sku" />
        </div>
        <br />
        <br />
        <table className="order-table">
          <tr>
            <th>Here is a table.</th>
            <th>Here's another topper.</th>
          </tr>
          <tr>
            <td>Here's the table's piece.</td>
            <td>Here's another piece.</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Order

// const Orders = () => {
//   // Array of vendors
//   const [vendors, setVendors] = useState([])
//   // Single Vendor Object
//   const [vendor, setVendor] = useState({})
//   // Array of Products
//   const [products, setProducts] = useState([])

//   const getVendors = async () => {
//     try {
//       let res = await axios.get('http://localhost:3001/vendors')
//       setVendors(res.data)
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   const getProducts = async () => {
//     try {
//       let res = await axios.get('')
//       setVendor(res.data)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     getVendors()
//   }, [])
// }
