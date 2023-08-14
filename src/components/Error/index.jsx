import { Link } from "react-router-dom";
import './Styles/Error.css'
function Error() {
  return (
    <div className="error__container">
      <h2 className="error__container__heading">Page Not Found</h2>
      <p className="error__container__text">
        We searched everywhere but couldn't find the page you were looking for.
      </p>
      <div className="error__container__links">
        <span  onClick={()=>{window.history.back()}}>Go Back</span>
        <Link to={"/"}>Quora Home</Link>
      </div>
    </div>
  );
}

export default Error;
