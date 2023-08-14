import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaceBookIcon, GoogleIcon } from "../Icons"
import Register from "../Register/Register"
import LoginSmDevice from "./Login.sm"
import LoginFrom from "./LoginFrom"
import { signInWithFacebookOrGoogle } from "../../firebase"
import { setAuth } from "../../redux/reducer"
import { useDispatch } from "react-redux"

function MiddleSection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSmHide, setIsSmHide] = useState(true)
  const [hideRegister, setHideRegister] = useState(true)
  function signInWithThirdPart(providerType) {
    signInWithFacebookOrGoogle(providerType).then(user => {
      dispatch(setAuth(user))
      navigate("/")
    })
  }
  return (
    <section className="middle-section">
      {!isSmHide && (
        <LoginSmDevice
          hideSmLogIn={() => {
            setIsSmHide(true)
          }}
        />
      )}
      {!hideRegister && (
        <Register
          hideRegister={() => {
            setHideRegister(true)
          }}
        />
      )}
      <section className="left">
        <p className="tc">
          {" "}
          By continuing you indicate that you agree to Quora's{" "}
          <Link to={""} className="link-underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to={""} className="link-underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="auth-btn" onClick={() => signInWithThirdPart("google")}>
          <GoogleIcon />
          <span>Continue with Google</span>
        </div>
        <div
          className="auth-btn"
          onClick={() => signInWithThirdPart("facebook")}
        >
          <FaceBookIcon />
          <span>Continue with Facebook</span>
        </div>
        <button
          className="sign-up-btn d-none"
          onClick={() => {
            setIsSmHide(false)
          }}
        >
          Login
        </button>
        <button className="sign-up-btn d-block">
          <span
            className="text-ellipsis"
            onClick={() => {
              setHideRegister(false)
            }}
          >
            Sign up with email
          </span>
        </button>
      </section>
      <section className="right">
        <h3 className="heading">Login</h3>
        <LoginFrom />
      </section>
    </section>
  )
}

export default MiddleSection
