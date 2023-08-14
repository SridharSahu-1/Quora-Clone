import Error from "../components/Error"
import Header from "../components/Header/Header"

function NotFound() {
  return (
    <div className="main">
      <Header />
      <div className="body" style={{ height: "90vh" }}>
        <Error />
      </div>
    </div>
  )
}

export default NotFound
