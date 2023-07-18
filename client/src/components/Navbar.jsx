const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="menubar">| ___ |</div>
        <div className="menubar">| ___ |</div>
        <div className="menubar">| ___ |</div>
        {/* <dir className="menubar">|&emsp;|</dir> */}
        <div className="dropdown">
          <a href="/orders">Orders</a>
          <a href="/products">Products</a>
          <a href="/vendors">Vendors</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
