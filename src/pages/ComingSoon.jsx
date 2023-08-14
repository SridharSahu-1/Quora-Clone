import Header from "../components/Header/Header"
import { Logo } from "../components/Icons"
import SideBar from "../components/SideBar/SideBar"

import './styles/ComingSoon.css'

function ComingSoon() {
  return (
    <div className="main">
      <Header/>
      <div className="body">
        <SideBar/>
        <div className="comingSoon__container">
          <Logo/>
          <img src="https://img.freepik.com/premium-vector/construction-design_24877-44621.jpg" alt="under construction" />
        </div>
      </div>
    </div>
  )
}

export default ComingSoon