import { useState } from "react"
import { setShowQns } from "../../redux/reducer"
import { CloseIcon } from "../Icons"
import { useDispatch, useSelector } from "react-redux"
import "./styles/QuestionModel.css"
import { addQuestionThunk } from "../../redux/thunks"
import { removeSpecials } from "../../utils/utils"
import { ToastContainer, toast } from "react-toastify"
function QuestionModel() {
  const [user, question] = useSelector(state => [
    state.auth.value,
    state.question.value
  ])
  const dispatch = useDispatch()
  const [text, setText] = useState("")
  const addQuestionToBD = () => {
    if (Object.hasOwn(question, removeSpecials(text))) {
      toast.error("question already present", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false
      })
      return
    }
    dispatch(
      addQuestionThunk({
        question: text,
        questionedBy: user.displayName || "",
        profilePicture: user.photoURL || ""
      })
    )
    dispatch(setShowQns(false))
  }
  return (
    <div className="ansModel">
      <div className="ansModel__container">
        <button
          className="ansModel__container__btn"
          onClick={() => {
            dispatch(setShowQns(false))
          }}
        >
          <CloseIcon />
        </button>
        <div className="Qns">
          <h3 className="Qns__heading">Tips on getting good answers quickly</h3>
          <ul className="Qns__list">
            <li className="Qns__list__item">
              Make sure your question has not been asked already
            </li>
            <li className="Qns__list__item">
              Keep your question short and to the point
            </li>
            <li className="Qns__list__item">
              Double-check grammar and spelling
            </li>
          </ul>
          <div className="ansModel__container__profile">
            <img
              className="container__profile__img"
              src={
                user.photoURL ||
                `https://i.pravatar.cc/150?u=${user.displayName}`
              }
              alt="User Icon"
            />
          </div>
          <textarea
            className="Qns__input"
            placeholder='Start your question with "What", "How", "Why", etc.'
            onChange={e => {
              setText(e.target.value)
            }}
          />
        </div>
        <ToastContainer />
        <button
          className="container__btnGroup__postBtn"
          disabled={text.length < 3}
          onClick={addQuestionToBD}
        >
          Add question
        </button>
      </div>
    </div>
  )
}

export default QuestionModel
