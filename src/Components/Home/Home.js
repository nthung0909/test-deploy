import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
const Home = memo(() => {
  useEffect(() => {}, []);
  return (
    <>
    </>
  );
});

const mapStateToProps = ({ userInfoR }) => ({ userInfoR });
export default connect(mapStateToProps, null)(Home);
