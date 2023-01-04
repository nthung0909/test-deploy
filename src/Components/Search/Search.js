import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Search = memo(() => {
  useEffect(() => {}, []);

  const handleLogout = function () {
    localStorage.removeItem("access-token");
  };
  return (
    <div className="col-lg-3 mobileremove">
      <aside className="sidebar static right">
        <div className="widget widget-search">
          <div className="top-search">
            <form method="post">
              <input type="text" placeholder="Searching for people,  etc" />
              <button data-ripple="">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        {/* <!-- page like widget --> */}
        <div className="widget widget-main-menu">
          <ul className="main-menu">
            <li>
              <Link to={"/"}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li>
              <a href="" title="">
                <i className="fas fa-hashtag"></i> Explore
              </a>
            </li>
            <li>
              <a href="" title="">
                <i className="far fa-bell"></i> Notifications
              </a>
            </li>
            <li>
              <a href="message.html" title="">
                <i className="far fa-envelope"></i> Messeges
              </a>
            </li>
            <li>
              <a href="" title="">
                <i className="fas fa-bookmark"></i> Saved posts
              </a>
            </li>
            <li>
              <Link to={"/my-career-tracks"}>
                <i className="fas fa-walking"></i> My career tracks
              </Link>
            </li>
            <li>
              <a href="" title="">
                <i className="fas fa-user"></i> Profile
              </a>
            </li>
            <li>
              <a href="" onClick={handleLogout} title="">
                <i className="fas fa-sign-out"></i> Logout
              </a>
            </li>
            <li>
              <a href="" title="">
                <i className="fas fa-ellipsis-h"></i> More options
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- Shortcuts --> */}

        <div className="widget footer-links stick-widget">
          <ul>
            <li>
              <a href="#" title="">
                About
              </a>{" "}
              |
            </li>
            <li>
              <a href="#" title="">
                Accessibility
              </a>{" "}
              |
            </li>
            <li>
              <a href="#" title="">
                User Agreement
              </a>{" "}
              |
            </li>
            <li>
              <a href="#" title="">
                Privacy Policy
              </a>{" "}
              |
            </li>
            <li>
              <a href="#" title="">
                Cookie Policy
              </a>{" "}
              |
            </li>
            <li>
              <a href="#" title="">
                More
              </a>
            </li>
          </ul>
          <p>@ 2022 CareerLadder.</p>
        </div>
      </aside>
    </div>
  );
});

const mapStateToProps = ({ userInfoR }) => ({ userInfoR });
export default connect(mapStateToProps, null)(Search);
