import { Navigate, useParams } from "react-router-dom"
import AnswerCard from "../components/Cards/AnswerCard"
import AnsweredCard from "../components/Cards/AnsweredCard"
import Header from "../components/Header/Header"
import { useSelector } from "react-redux"

import "./styles/Question.css"
import Error from "../components/Error"


function Question() {
  const { id } = useParams()
  const question = useSelector(state => state.question.value.qna)
  const user = useSelector((state) => state.auth.value);


  return (
    user?
    <div className="main">
      <Header />
      {Object.keys(question).length !== 0 && Object.hasOwn(question, id) && (
        <div className="questions">
          <AnswerCard cardInfo={question[id]} Url={id} />
          {Object.hasOwn(question[id], "answers") &&
            Object.keys(question[id].answers).map(key => {
              return (
                <AnsweredCard
                  question={question[id].question}
                  ansKey={key}
                  key={key}
                  answer={question[id].answers[key]}
                ></AnsweredCard>
              )
            })}
        </div>
      )}
      {Object.keys(question).length !== 0 && !Object.hasOwn(question, id) && (
        <div className="body" style={{ height: "90vh" }}>
          <Error />
        </div>
      )}
    </div>:
    <Navigate to={"/login"}/>
  )
}

export default Question
