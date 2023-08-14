import { CloseIcon, QuoraIconSm } from "../Icons"
import LoginFrom from "./LoginFrom"
import "./styles/Login.sm.css"
function LoginSmDevice({ hideSmLogIn }) {
  return (
    <div className="login-sm">
      <button className="icon-btn" onClick={hideSmLogIn}>
        <CloseIcon />
      </button>
      <div className="content">
        <span className="icon">
          <QuoraIconSm />
        </span>
        <h3 className="heading">Login to Quora</h3>
        <LoginFrom
          btnStyle={{
            display: "initial",
            position: "absolute",
            top: "0",
            right: "0"
          }}
        />
      </div>
    </div>
  )
}

export default LoginSmDevice
