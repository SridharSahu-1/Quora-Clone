import Header from "../components/Header/Header";
import { Logo } from "../components/Icons";
import SideBar from "../components/SideBar/SideBar";
import { useSelector } from "react-redux";
import "./styles/ComingSoon.css";
import { Navigate } from "react-router-dom";

function ComingSoon() {
  const user = useSelector((state) => state.auth.value);

  return user ? (
    <div className="main">
      <Header />
      <div className="body">
        <SideBar />
        <div className="comingSoon__container">
          <Logo />
          <img
            src="https://img.freepik.com/premium-vector/construction-design_24877-44621.jpg"
            alt="under construction"
          />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default ComingSoon;
