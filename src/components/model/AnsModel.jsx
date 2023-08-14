import { useRef, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { setQuestionId } from "../../redux/reducer"
import { useDispatch, useSelector } from "react-redux"
import { AlphabetIcon, CloseIcon, GalleryIcon } from "../Icons"
import "./styles/AnsModel.css"
import { uploadImage } from "../../firebase"
import { addAnswerThunk } from "../../redux/thunks"

function AnsModel() {
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const [text, setText] = useState("")
  const [file, setFile] = useState(null)
  const questionId = useSelector(state => state.questionId.value)
  function selectImg(e) {
    if (e.target.files !== null) {
      setFile(e.target.files[0])
    }
  }
  const user = useSelector(state => state.auth.value)

  async function post() {
    let url = ""
    if (file !== null) {
      let error = ""
      await toast.promise(
        uploadImage(file)
          .then(imgUrl => (url = imgUrl))
          .catch(e => (error = e.message)),
        {
          pending: "uploading image",
          success: "image uploaded 👌",
          error: "upload failed " + error
        },
        {
          autoClose: 3000,
          pauseOnHover: false
        }
      )
    }
    dispatch(
      addAnswerThunk({
        question: questionId,
        answer: text,
        answeredBy: user.displayName,
        imgUrl: url,
        profilePicture: user.photoURL || "",
        uid: user.uid
      })
    )
    dispatch(setQuestionId(""))
  }
  return (
    <div className="ansModel">
      <div className="ansModel__container">
        <ToastContainer />
        <button
          className="ansModel__container__btn"
          onClick={() => {
            dispatch(setQuestionId(""))
          }}
        >
          <CloseIcon />
        </button>
        <div className="ansModel__container__profile">
          <img
            className="container__profile__img"
            src={
              user.photoURL || `https://i.pravatar.cc/150?u=${user.displayName}`
            }
            alt="User Icon"
          />
          <p className="container__profile__name">{user.displayName || ""}</p>
        </div>
        <h3 className="ansModel__container__question">{questionId}</h3>
        <textarea
          className="ansModel__container__input"
          placeholder="Write your answer"
          onChange={e => {
            setText(e.target.value)
          }}
        ></textarea>
        <div className="ansModel__container__btnGroup">
          <input
            ref={fileInputRef}
            onChange={selectImg}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
          <button className="container__btnGroup__btn">
            <AlphabetIcon />
          </button>
          <button
            className="container__btnGroup__btn"
            onClick={() => {
              fileInputRef.current?.click()
            }}
          >
            <GalleryIcon />
          </button>
          <span>{file?.name}</span>
          {file && (
            <span
              className="container__btnGroup__closeBtn"
              onClick={() => {
                setFile(null)
              }}
            >
              <CloseIcon />
            </span>
          )}
          <button
            className="container__btnGroup__postBtn"
            disabled={text.length === 0}
            onClick={post}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnsModel
