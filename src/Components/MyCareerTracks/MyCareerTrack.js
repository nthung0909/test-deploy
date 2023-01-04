import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "./Action";
import QuestionModal from "../Commons/Modal/QuestionModal";
import { useNavigate } from "react-router-dom";
import { userBio } from "../UserBio/Action";

const MyCareerTrack = memo((props) => {
  const navigate = useNavigate();
  const { dispatch, userR, myCareerTrackR } = props;
  const { userProfile = {} } = userR;
  const { id } = userProfile;
  const { trackList = [] } = myCareerTrackR;
  const [idSelected, setIdSelected] = useState(null);

  const getData = (id) => {
    if(id) {
      dispatch(action.getCareerTrackByUser(id));
    } else {
      dispatch(userBio()).then(resp => {
        if(resp.id) {
          dispatch(action.getCareerTrackByUser(resp.id));
        }
      });
    }
  };
  useEffect(() => {
    getData(id);
  }, []);

  const handleUpdateTrack = (item) => {
    navigate({
      pathname: `/career-track/${item.industry_id.replace("#", "%23")}/update`,
      search: `career_track_id=${item.id.replace("#", "%23")}`,
    });
  };

  const handleOpenDelete = (id) => {
    setIdSelected(id);
  };

  const deleteCareerTrack = () => {
    if (idSelected) {
      action.deleteCareerTrack(idSelected).then(() => {
        document.getElementById("close-delete-track-modal").click();
        getData(id);
      });
    }
  };
  return (
    <>
      <div className="central-meta">
        <div className="editing-interest">
          <span className="create-post">
            <i className="far fa-bell"></i> My Career track
          </span>
          <div className="my-list-career">
            {trackList.length ? (
              <table className="cr-table table table-responsive">
                <thead>
                  <tr>
                    <th>Post Date</th>
                    <th>Posts</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trackList.map((item) => (
                    <tr key={item.id}>
                      <td className="date-n-reply">
                        <span>{}</span>
                        <div className="verification">
                          {item.is_public ? (
                            <em className="verify">
                              <i className="fa fa-check-circle"></i> Public
                            </em>
                          ) : (
                            <em className="">
                              <i className="fa fa-check-circle"></i> Not Public
                            </em>
                          )}
                        </div>
                      </td>
                      <td className="my-list-career-title">
                        <p>{item.title}</p>
                      </td>
                      <td className="colactionbutton">
                        <div className="buttons">
                          <button
                            className="main-btn2 send-mesg"
                            style={{ color: "#27995b" }}
                            onClick={() => handleUpdateTrack(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="main-btn"
                            data-toggle="modal"
                            data-target="#delete-career-track"
                            style={{ color: "white" }}
                            onClick={() => {
                              handleOpenDelete(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h4>You don't have any career track yet.</h4>
            )}
          </div>
        </div>
      </div>
      <QuestionModal
        isOpen={false}
        id={"delete-career-track"}
        header={"Delete career track"}
        content={"Do you want delete this career track?"}
        handleSubmit={deleteCareerTrack}
        handleClose={null}
      />
    </>
  );
});

const mapStateToProps = ({ myCareerTrackR, userR }) => ({
  myCareerTrackR,
  userR,
});
export default connect(mapStateToProps, null)(MyCareerTrack);
