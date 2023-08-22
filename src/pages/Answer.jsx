import { Navigate } from "react-router-dom";
import AnswerCard from "../components/Cards/AnswerCard";
import Header from "../components/Header/Header";
import { StarIcon } from "../components/Icons";
import AnsSideBar from "../components/SideBar/AnsSideBar";
import { useSelector } from "react-redux";
import "./styles/Answer.css";
import EditCard from "../components/Cards/EditCard";

function Answer() {
  const [data, user, selected, answers] = useSelector((state) => [
    state.question.value.qna,
    state.auth.value,
    state.select.value,
    state.question.value.ans,
  ]);

  return user ? (
    <div className="main">
      <Header />
      <div className="answer">
        <AnsSideBar />
        <div className="answer__container">
          {selected === "all" ? (
            <>
              <div className="answer__container__intro">
                <div className="intro__box">
                  <StarIcon />
                </div>
                <p className="intro__text">Questions for you</p>
              </div>
              {data &&
                Object.keys(data).map((key) => {
                  return (
                    <AnswerCard
                      key={key}
                      Url={key}
                      cardInfo={data[key]}
                    ></AnswerCard>
                  );
                })}
            </>
          ) : (
            <>
              <div className="answer__container__intro">
                <div className="intro__box">
                  <StarIcon />
                </div>
                <p className="intro__text">Answered Question</p>
              </div>
              {answers &&
                Object.keys(answers).map((key) => {
                  return (
                    <EditCard
                      key={key}
                      Url={key}
                      question={data[key].question}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default Answer;
