const Home = () => {
  return (
    <div className="home">
      <h1> Irish Spirits</h1>
      <form className="search">
        <label htmlFor="gsearch">Search Product Database: </label>
        <input type="search" id="product-search" className="product-search" />
      </form>
    </div>
  )
}

export default Home
