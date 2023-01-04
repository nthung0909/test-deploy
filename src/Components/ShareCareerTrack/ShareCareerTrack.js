import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
const Profile = memo(() => {
  useEffect(() => {}, []);
  return (
    <div
      className="central-meta pointhand"
      data-toggle="modal"
      data-target="#sharingcareertrack"
    >
      <div className="new-carretrack">
        <figure>
          <img src="images/resources/admin.jpg" alt="" />
        </figure>
        <div className="newpst-text">Sharing your career experience…</div>
      </div>
    </div>
  );
});

const mapStateToProps = ({ userInfoR }) => ({ userInfoR });
export default connect(mapStateToProps, null)(Profile);
