import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { userBio } from "./Action"
const Profile = memo((props) => {
  const { dispatch, userR = {} } = props;
  const userProfile = userR.userProfile;
  useEffect(() => {
    dispatch(userBio());
  }, []);

  return (
    <div className="user-profile">
      <figure>
        <div className="edit-pp">
          <label className="fileContainer">
            <i className="fas fa-camera"></i>
            <input type="file" />
          </label>
        </div>
        <img src={userProfile?.cover_photo_path} alt="cover photo" />
        <ul className="profile-controls">
          <li>
            <div className="edit-seting" title="Edit Profile image">
              <i className="fas fa-sliders-h"></i>
              <ul className="more-dropdown">
                <li>
                  <a href="#" data-toggle="modal" data-target="#editprofile">
                    Update Profile Photo
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </figure>
      <div className="profile-section">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="profile-author">
              <div className="profile-author-thumb">
                <img alt="author" src={userProfile?.photo_path} />
                <div className="edit-dp">
                  <label className="fileContainer">
                    <i className="fas fa-camera"></i>
                    <input type="file" />
                  </label>
                </div>
              </div>

              <div className="author-content">
                <a className="h4 author-name" href="about.html">
                  {userProfile?.name}
                </a>
                <div className="country">Ontario, CA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = ({ userR }) => ({ userR });
export default connect(mapStateToProps, null)(Profile);
