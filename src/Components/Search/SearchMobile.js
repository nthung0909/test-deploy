import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
const SearchMobile = memo(() => {
  useEffect(() => {}, []);

  const handleLogout = function() {
    localStorage.removeItem('access-token');
  }

  return (
    <div
      className="modal fade modal-fullscreen"
      id="mainmenumobile"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="mainmenumobileLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="mainmenumobileLabel">
              Main Menu
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul className="main-menu">
              <li>
                <a href="" title="">
                  <i className="fas fa-home"></i> Home
                </a>
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
                <a href="" title="">
                  <i className="fas fa-walking"></i> My career tracks
                </a>
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
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = ({ userInfoR }) => ({ userInfoR });
export default connect(mapStateToProps, null)(SearchMobile);
