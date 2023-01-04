import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
const NewFeed = memo(() => {
  useEffect(() => {}, []);
  return (
    <>New feed</>
  );
});

const mapStateToProps = ({ userInfoR }) => ({ userInfoR });
export default connect(mapStateToProps, null)(NewFeed);
