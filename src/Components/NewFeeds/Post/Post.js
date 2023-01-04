import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
const Posts = memo(() => {
  useEffect(() => {}, []);
  return (
    <>
    Posts
    </>
  );
});

const mapStateToProps = ({ userInfoR }) => ({ userInfoR });
export default connect(mapStateToProps, null)(Posts);
