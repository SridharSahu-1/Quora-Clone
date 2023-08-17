import { Await, Link, Navigate } from "react-router-dom";
import Card from "../components/Cards/card";
import Header from "../components/Header/Header";
import { AskIcon, Pencil, PenIcon } from "../components/Icons";
import SideBar from "../components/SideBar/SideBar";
import { setShowQns } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Home.css";
import { userData } from "../firebase";

function Home() {
  const [data, user] = useSelector((state) => [
    state.question.value.qna,
    state.auth.value,
  ]);

  const dispatch = useDispatch();

  return (
    <Await
      resolve={() => {
        userData(user);
      }}
    >
      {user ? (
        <div className="main">
          <Header />
          <div className="body">
            <SideBar />
            <div className="qna">
              <div className="ask-ans-post">
                <img
                  src={
                    user.photoURL ||
                    `https://i.pravatar.cc/150?u=${user.displayName}`
                  }
                  alt=""
                  className="profile-picture"
                />
                <Link to={""} className="question">
                  What do you want to ask or share?
                </Link>
                <div className="btn-group">
                  <Link
                    to={""}
                    className="link-btn"
                    onClick={() => {
                      dispatch(setShowQns(true));
                    }}
                  >
                    <AskIcon /> Ask
                  </Link>
                  <Link to={"/answer"} className="link-btn">
                    <PenIcon /> Answer
                  </Link>
                  <Link to={""} className="link-btn">
                    <Pencil /> Post
                  </Link>
                </div>
              </div>

              {Object.keys(data)
                .reverse()
                .map((key) => {
                  return <Card id={key} key={key} />;
                })}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </Await>
  );
}

export default Home;
