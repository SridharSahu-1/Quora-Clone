import { useRef, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {setQuestionAndAnswerKey } from "../../redux/reducer"
import {addAnswerThunk } from "../../redux/thunks"
import { useDispatch, useSelector } from "react-redux"
import { AlphabetIcon, CloseIcon, GalleryIcon } from "../Icons"
import "./styles/AnsModel.css"
import { uploadImage } from "../../firebase"

function EditAnswerModel() {
  const [{ answerKey, questionKey }, questions] = useSelector(state => [
    state.updateAnswer.value,
    state.question.value.qna
  ])
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const [text, setText] = useState(
    questions[questionKey].answers[answerKey].answer
  )
  const [file, setFile] = useState(null)
  const [imgUrl, setImgUrl] = useState(
    questions[questionKey].answers[answerKey].imgUrl
  )

  function selectImg(e) {
    if (e.target.files !== null) {
      setFile(e.target.files[0])
      setImgUrl("")
    }
  }
  const user = useSelector(state => state.auth.value)

  async function update() {
    let url = imgUrl
    if (file !== null && imgUrl === "") {
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
        question: questions[questionKey].question,
        answer: text,
        answeredBy: user.displayName,
        imgUrl: url,
        profilePicture: user.photoURL || "",
        uid: user.uid,
        answerID: answerKey
      })
    )
    dispatch(setQuestionAndAnswerKey({ answerKey: "", questionKey: "" }))
  }
  return (
    <div className="ansModel">
      <div className="ansModel__container">
        <ToastContainer />
        <button
          className="ansModel__container__btn"
          onClick={() => {
            dispatch(
              setQuestionAndAnswerKey({ answerKey: "", questionKey: "" })
            )
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
        <h3 className="ansModel__container__question">
          {questions[questionKey].question}
        </h3>
        <textarea
          className="ansModel__container__input"
          placeholder="Write your answer"
          onChange={e => {
            setText(e.target.value)
          }}
          value={text}
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
          <span>{imgUrl !== "" && "uploaded.jpeg"}</span>
          {imgUrl !== "" && (
            <span
              className="container__btnGroup__closeBtn"
              onClick={() => {
                setImgUrl("")
              }}
            >
              <CloseIcon />
            </span>
          )}
          <button
            className="container__btnGroup__postBtn"
            disabled={text.length === 0}
            onClick={update}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditAnswerModel
