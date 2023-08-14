import { Link } from "react-router-dom"
import { setQuestionId } from "../../redux/reducer"
import { FollowIcon, PassIcon, PenIcon } from "../Icons"

import "./styles/AnswerCard.css"
import { useDispatch } from "react-redux"

function AnswerCard({ cardInfo, Url }) {
  const dispatch = useDispatch()
  return (
    <div className="ansCard">
      <h3>
        <Link to={`/question/${Url}`} className="ansCard__question">
          {cardInfo.question}
        </Link>
      </h3>
      <p className="ansCard__ansCount">
        {!Object.hasOwn(cardInfo, "answers")
          ? "No answer yet "
          : `${Object.keys(cardInfo.answers).length} answers`}
      </p>
      <div className="ansCard__btnGroup">
        <button
          className="ansCard__btnGroup__btn"
          onClick={() => {
            dispatch(setQuestionId(cardInfo.question))
          }}
        >
          <PenIcon /> <span>Answer</span>
        </button>
        <button className="ansCard__btnGroup__btn">
          <FollowIcon />
          <span>Follow</span>
        </button>
        <button className="ansCard__btnGroup__btn">
          <PassIcon /> <span>Pass</span>
        </button>
      </div>
    </div>
  )
}

export default AnswerCard
