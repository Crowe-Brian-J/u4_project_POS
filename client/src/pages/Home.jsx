import Search from '../components/Search'
import Nav from '../components/Nav'

const Home = () => {
  return (
    <div className="top-of-screen">
      <div className="top-bar">
        <Search />
        <Nav />
      </div>
      <div className="home">
        <h1>Irish Spirits</h1>
      </div>
    </div>
  )
}

export default Home
