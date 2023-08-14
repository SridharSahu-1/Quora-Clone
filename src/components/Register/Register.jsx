import { useEffect, useState } from "react"
import { Form, useNavigate } from "react-router-dom"
import {
  disabledRegisterBtn,
  validateEmail,
  validateName,
  validatePassword
} from "../../utils/utils"
import { CloseIcon, ErrorIcon } from "../Icons"

import "./styles/Register.css"
import { signUpWithEmailAndPassword } from "../../firebase"
import { ToastContainer, toast } from "react-toastify"
function Register({ hideRegister }) {
  const navigate = useNavigate()
  const [buttonText, setButtonText] = useState("Next")
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [inputError, setInputError] = useState({
    name: "",
    email: "",
    password: ""
  })
  useEffect(() => {
    setInputError({
      name: userInfo.name.length > 0 ? validateName(userInfo.name.trim()) : "",
      email:
        userInfo.email.length > 0
          ? validateEmail(userInfo.email)
            ? ""
            : "Invalid email address"
          : "",
      password:
        userInfo.password.length > 0
          ? validatePassword(userInfo.password.trim())
          : ""
    })
  }, [userInfo])
  function register() {
    if (buttonText === "Next") {
      setButtonText("Finish")
    } else {
      signUpWithEmailAndPassword(userInfo)
        .then(() => {
          hideRegister()
          navigate("/")
        })
        .catch(e => {
          toast.error(e.message, {
            position: "top-center",
            autoClose: 3000,
            draggable: false,
            pauseOnHover: false
          })
        })
    }
  }
  return (
    <div className="container">
      <div className="register">
        <ToastContainer />
        <button
          className="register__closeBtn"
          onClick={() => {
            hideRegister()
          }}
        >
          <CloseIcon />
        </button>
        <h3 className="register__heading">Sign up</h3>
        <Form className="register__form" autoComplete="off">
          {buttonText === "Next" ? (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={e => {
                  setUserInfo({ ...userInfo, name: e.target.value })
                }}
                placeholder="What would you like to be called?"
              />

              {inputError.name !== "" && (
                <p className="register__form__error">
                  <ErrorIcon /> {inputError.name}
                </p>
              )}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={e => {
                  setUserInfo({ ...userInfo, email: e.target.value })
                }}
                placeholder="Your Email"
              />
              {inputError.email !== "" && (
                <p className="register__form__error">
                  <ErrorIcon /> {inputError.email}
                </p>
              )}
            </>
          ) : (
            <>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={e => {
                  setUserInfo({ ...userInfo, password: e.target.value })
                }}
                autoComplete="new-password"
              />
              {inputError.password !== "" && (
                <p className="register__form__error">
                  <ErrorIcon /> {inputError.password}
                </p>
              )}
            </>
          )}
          <button
            className="register__form__btn"
            disabled={disabledRegisterBtn(buttonText, userInfo)}
            onClick={() => {
              register()
            }}
          >
            {buttonText}
          </button>
        </Form>
      </div>
    </div>
  )
}

export default Register
