import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import "./styles/searchQuestion.css"

function SearchQuestions({ search, setSearch }) {
  const ref = useRef(null)
  const QNA = useSelector(state => state.question.value.qna)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ref.current.innerText !== ""
      ) {
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
  return (
    <div className="search-container" ref={ref}>
      <ul className="list">
        {Object.keys(QNA).map(key => {
          return QNA[key].question
            .toLowerCase()
            .includes(search.toLowerCase()) &&
            Object.hasOwn(QNA[key], "answers") &&
            search.length ? (
            <Link className="link-text" to={`/question/${key}`} key={key}>
              <li>{QNA[key].question}</li>
            </Link>
          ) : null
        })}
      </ul>
    </div>
  )
}

export default SearchQuestions
