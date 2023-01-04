import { Routes, Route, Outlet, redirect } from "react-router-dom";
import { memo, useMemo } from "react";
import { connect } from "react-redux";
import NotFound from "./Components/Notfound";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/Commons/Routes/PrivateRouter";
import NewFeed from "./Components/NewFeeds/NewFeed";
import CreateCareerTrack from "./Components/CreateCareerTrack/CreateCareerTrack";
import CareerTrackMobile from "./Components/CareerTracks/CareerTrackMobile";
import SearchMobile from "./Components/Search/SearchMobile";
import Search from "./Components/Search/Search";
import CareerTracks from "./Components/CareerTracks/CareerTracks";
import ShareCareerTrack from "./Components/ShareCareerTrack/ShareCareerTrack";
import Profile from "./Components/UserBio/UserBio";
import Register from "./Components/Register/Register";
import MyCareerTrack from "./Components/MyCareerTracks/MyCareerTrack";
import { checkToken } from "./Components/Login/Actions";

function PageLayout() {
  return (
    <>
      {/* <div className="wavy-wraper">
        <div className="wavy">
          <span style={{ "--i": 1 }}>C</span>
          <span style={{ "--i": 2 }}>A</span>
          <span style={{ "--i": 3 }}>R</span>
          <span style={{ "--i": 4 }}>E</span>
          <span style={{ "--i": 5 }}>E</span>
          <span style={{ "--i": 6 }}>R</span>
          <span style={{ "--i": 7 }}>.</span>
          <span style={{ "--i": 8 }}>.</span>
          <span style={{ "--i": 9 }}>.</span>
        </div>
      </div> */}
      <div className="theme-layout">
        <div className="postoverlay"></div>
        <div className="responsive-header">
          <div className="mh-head first Sticky">
            <span className="mh-btns-left">
              <a
                className=""
                href="#careertrackmobile"
                data-toggle="modal"
                data-target="#careertrackmobile"
              >
                <i className="fas fa-sliders-h"></i>
              </a>
            </span>
            <span className="mh-text">
              <a href="newsfeed.html" title="">
                <img src="images/logo-mobile.jpg" alt="" />
              </a>
            </span>
            <span className="mh-btns-right">
              <a
                className=""
                href="#mainmenumobile"
                data-toggle="modal"
                data-target="#mainmenumobile"
              >
                <i className="fas fa-align-justify"></i>
              </a>
            </span>
          </div>
          <div className="mh-head second">
            <form className="mh-form">
              <input placeholder="search" />
              <a href="#/" className="iconsearch fas fa-search"></a>
            </form>
          </div>
          {/* left menu for mobile */}
          <CareerTrackMobile />
          <SearchMobile />
        </div>
        <section>
          <div className="gap2 gray-bg">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row merged20" id="page-contents">
                    <CareerTracks />
                    <div className="col-lg-6">
                      <Profile />
                      <ShareCareerTrack />
                      <Outlet />
                    </div>
                    <Search />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const PageRouters = memo(() => {
  useMemo(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      redirect("/login");
    } else if (window.location.pathname !== "/login" && token) {
      checkToken();
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route element={<PageLayout />}>
          <Route path="/" element={<NewFeed />} />
          <Route path="/newfeed" element={<NewFeed />} />
          <Route
            path="/career-track/:id?/create"
            element={<CreateCareerTrack />}
          />
          <Route path="/my-career-tracks" element={<MyCareerTrack />} />
          <Route path="/career-track/:id?/update" element={<CreateCareerTrack />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});

const mapStateToProps = ({ userR }) => ({ userR });
export default connect(mapStateToProps, null)(PageRouters);
