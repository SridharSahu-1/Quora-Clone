import { useDispatch, useSelector } from "react-redux"
import { Tooltip } from "react-tooltip"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import { setAuth,setShowQns } from "../../redux/reducer"
import { signOut } from "firebase/auth"

const UserProfile = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.value)
  const navigate = useNavigate()
  function logOut() {
    signOut(auth).then(() => {
      dispatch(setAuth(null))
      navigate("/login")
    })
  }
  return (
    <>
      <img
        src={user.photoURL || `https://i.pravatar.cc/150?u=${user.displayName}`}
        alt="user avatar"
        className="avatar"
        data-tooltip-id="logout"
      />
      <Tooltip
        id="logout"
        openOnClick={true}
        clickable={true}
        className="tooltip__model"
        place="bottom"
      >
        <button onClick={logOut} className="tooltip__btn">
          Logout
        </button>
      </Tooltip>
      <button
        className="btn addQuestion"
        onClick={() => {
          dispatch(setShowQns(true))
        }}
      >
        Add Questions
      </button>
    </>
  )
}

export default UserProfile
