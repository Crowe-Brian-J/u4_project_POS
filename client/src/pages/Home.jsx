import ListWindow from '../components/ListWindow'
import Receipt from '../components/Receipt'
import Total from '../components/Total'

const Home = () => {
  return (
    <div>
      <div className="home">
        <h1>Irish Spirits</h1>
      </div>
      <div className="main-transaction">
        <ListWindow />
        <Receipt />
      </div>
      <Total />
    </div>
  )
}

export default Home
