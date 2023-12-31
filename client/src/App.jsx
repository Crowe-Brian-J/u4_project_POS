import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Orders from "./pages/orders/Orders"
import NewOrder from "./pages/orders/NewOrder"
import OrderDetails from "./pages/orders/OrderDetails"
import Vendors from "./pages/vendors/Vendors"
import VendorDetails from "./pages/vendors/VendorDetails"
import NewVendor from "./pages/vendors/NewVendor"
import Products from "./pages/products/Products"
import ProductDetails from "./pages/products/ProductDetails"
import NewProduct from "./pages/products/NewProduct"
import Inventory from "./pages/Inventory"
import Transactions from "./pages/transactions/Transactions"
import TransactionDetails from "./pages/transactions/TransactionDetails"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="App">
      <header className="top-bar">
        <h1>Irish Spirits</h1>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/new" element={<NewOrder />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/new" element={<NewVendor />} />
          <Route path="/vendors/:id" element={<VendorDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:id" element={<TransactionDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
