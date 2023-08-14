import { Link } from "react-router-dom"
import { Plus } from "../Icons"
import "./Styles/SideBar.css"
function SideBar() {
  return (
    <div className="side-bar">
      <div className="upperPanel">
        <div className="upperPanel__bar">
          <Plus />
          <p>Create a Space</p>
        </div>
        <Link
          to={"/question/What-is-the-answer-to-30401234"}
          className="upperPanel__bar"
        >
          <img
            className="upperPanel__bar__icon"
            src="https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2FMathematics.jpeg?alt=media"
            alt="Math"
          />
          <p>Mathematics</p>
        </Link>
        <Link
          to={"/question/How-has-science-proven-gravity"}
          className="upperPanel__bar"
        >
          <img
            className="upperPanel__bar__icon"
            src="https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2FScience.jpeg?alt=media"
            alt="science"
          />
          <p>Science</p>
        </Link>
        <Link
          to={
            "/question/How-do-inventors-innovate-large-bulky-technology-and-make-it-smaller-and-more-effective"
          }
          className="upperPanel__bar"
        >
          <img
            className="upperPanel__bar__icon"
            src="https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2FTechnology.jpeg?alt=media"
            alt="Technology"
          />
          <p>Technology</p>
        </Link>
        <Link
          to={
            "/question/What-are-some-interesting-examples-of-photographs-that-show-important-historical-figures-in-unexpected-places-or-companies"
          }
          className="upperPanel__bar"
        >
          <img
            className="upperPanel__bar__icon"
            src="https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2FHistorical.jpeg?alt=media"
            alt="Historical"
          />
          <p>Historical</p>
        </Link>
        <Link
          to={
            "/question/Do-you-think-that-every-aborted-fetus-lives-on-in-the-afterlife-Are-you-worried-about-where-unborn-fetuses-go-after-they-die-Is-this-why-you-oppose-abortion"
          }
          className="upperPanel__bar"
        >
          <img
            className="upperPanel__bar__icon"
            src="https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2FFetuses.jpeg?alt=media"
            alt="Fetuses"
          />
          <p>Fetuses</p>
        </Link>
        <Link
          to={
            "/question/Who-would-win-in-a-3v1-Luffy-Naruto-and-Ichigo-at-their-strongest-or-Goku-in-the-Saiyan-Saga"
          }
          className="upperPanel__bar"
        >
          <img
            className="upperPanel__bar__icon"
            src="https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2FAnime.jpeg?alt=media"
            alt="Anime"
          />
          <p>Anime</p>
        </Link>
        <Link
          to={
            "/question/Did-Hinata-ever-have-a-crush-on-Naruto-when-they-were-young"
          }
          className="upperPanel__bar"
        >
          <img
            className="upperPanel__bar__icon"
            src="https://firebasestorage.googleapis.com/v0/b/quora-clone-asit.appspot.com/o/public%2FNaruto.jpeg?alt=media"
            alt="Naruto"
          />
          <p>Naruto</p>
        </Link>
      </div>
      <div className="lowerPanel">
        <Link className="lowerPanel__link" to={""}>
          <span>About</span>
        </Link>
        <Link className="lowerPanel__link" to={""}>
          <span>Careers</span>
        </Link>
        <Link className="lowerPanel__link" to={""}>
          <span>Terms</span>
        </Link>
        <Link className="lowerPanel__link" to={""}>
          <span>Privacy</span>
        </Link>
        <Link className="lowerPanel__link" to={""}>
          <span>Acceptable Use</span>
        </Link>
        <Link className="lowerPanel__link" to={""}>
          <span>Businesses</span>
        </Link>
        <Link className="lowerPanel__link" to={""}>
          <span>Press</span>
        </Link>
        <Link className="lowerPanel__link" to={""}>
          <span>Your Ad Choices</span>
        </Link>
        <Link className="lowerPanel__link" to={""}>
          <span>Grievance Officer</span>
        </Link>
      </div>
    </div>
  )
}

export default SideBar
