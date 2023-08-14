import { useState } from "react"
import { Form, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/utils"
import { ErrorIcon } from "../Icons"
import { LogInWithEmailAndPassword } from "../../firebase"
import { setAuth } from "../../redux/reducer"
import { useDispatch } from "react-redux"

function LoginFrom({ btnStyle }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [err, setErr] = useState("hide-error")
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })

  function login() {
    LogInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(user => {
        if (user) {
          dispatch(setAuth(user))
          navigate("/")
        }
      })
      .catch(e => setErr("error"))
  }
  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        login()
      }}
      className="loginFrom"
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Your email"
        id="email"
        name="email"
        onChange={e => {
          setErr("hide-error")
          setUserInfo({ ...userInfo, email: e.target.value })
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        placeholder="Your password"
        id="password"
        onChange={e => {
          setErr("hide-error")
          setUserInfo({ ...userInfo, password: e.target.value })
        }}
      />
      <p className={err}>
        <ErrorIcon /> Invalid email address or password
      </p>
      <span className="forget-pass">Forgot password?</span>
      <button
        style={btnStyle}
        className="btn"
        disabled={
          !validateEmail(userInfo.email) || userInfo.password.length === 0
        }
      >
        Login
      </button>
    </Form>
  )
}

export default LoginFrom
