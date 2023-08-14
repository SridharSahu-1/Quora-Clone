export const validateEmail = email => {
  return new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email)
}

export const validateName = name => {
  if (name.length < 3) {
    return "name must contain at least 3 characters"
  }
  return ""
}
export const validatePassword = password => {
  if (password.length < 8) {
    return "password must contain at least 8 characters"
  }
  return ""
}

export function disabledRegisterBtn(btnName, userInfo) {
  if (btnName === "Next") {
    return (
      validateName(userInfo.name).length !== 0 || !validateEmail(userInfo.email)
    )
  }
  return (
    validateName(userInfo.name).length !== 0 ||
    !validateEmail(userInfo.email) ||
    validatePassword(userInfo.password).length !== 0
  )
}
export function removeSpecials(str) {
  return str.replace(/[^a-zA-Z0-9 ]/g, "").replaceAll(" ", "-")
}
