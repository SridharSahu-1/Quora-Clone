import Header from "../components/Header/Header"
import SideBar from "../components/SideBar/SideBar"

import "./styles/Following.css"
function Following() {
  return (
    <div className="main">
      <Header />
      <div className="body">
        <SideBar />
        <div className="following__container">
          <img
            className="following__container__image"
            src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.build_following_feed_lightmode.png-26-cc59fbc57541079b.png"
            alt="following_feed"
          />
          <h2 className="following__container__heading">
            Build your new following feed
          </h2>
          <p className="following__container__subHeading">
            Follow some Spaces to start discovering stories in your feed.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Following
