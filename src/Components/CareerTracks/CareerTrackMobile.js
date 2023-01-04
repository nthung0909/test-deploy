import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { Link } from "react-router-dom";
import { getIndustries, getCareerByIndustry } from "./Actions";

const Careertrackmobile = memo((props) => {
  /*------- Hook ---------*/
  const { dispatch, careerTrackR = {} } = props;
  const { last_evaluated_key } = careerTrackR;
  const menuItems = careerTrackR.items || [];
  const { total = 0 } = careerTrackR;
  useEffect(() => {}, []);

  /*------- Actions ---------*/
  const expandOrCloseSubMenu = (industry_id) => {
    if (!industry_id) return;
    dispatch(getCareerByIndustry(industry_id));
    $(".listitemmulti").each(function () {
      $(this).children("li").children("a ").unbind();
      $(this)
        .children("li")
        .children("a ")
        .bind("click", function () {
          var parent = $(this).parent();
          var boxsub = $(parent).children("ul.listitemchild");
          if ($(boxsub).children("li").length > 0) {
            if ($(boxsub).css("display") == "none") {
              $(boxsub).slideToggle(500);
            } else {
              $(boxsub).slideToggle(500);
            }
          }
        });
    });
  };

  const formatLabelName = (str = "") => {
    if (str.length < 38) return str;
    const arrStr = str.split(" ");
    if (arrStr[0].length >= 38) {
      return arrStr[0].slice(0, 37) + "...";
    }
    let result = arrStr[0];
    for (let i = 1; i < arrStr.length; i++) {
      const strTmp = `${result} ${arrStr[i]}`;
      if (strTmp.length >= 38) return `${result}...`;
      result = strTmp;
    }
    return result;
  };

  const loadMoreIndustries = () => {
    dispatch(getIndustries({ limit: total + 10 }));
  };
  return (
    <div
      className="modal fade modal-fullscreen"
      id="careertrackmobile"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Carrer Track
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
            <ul className="naves listitemmulti carrer-track-area">
              {menuItems.map((item) => {
                return (
                  <li
                    onClick={() => {
                      expandOrCloseSubMenu(item.id);
                    }}
                    key={item.id}
                    title={item.name}
                  >
                    <a className="item-link">
                      <i className="fas fa-angle-double-right"></i>{" "}
                      {formatLabelName(item.name)} (
                      {item.total_career_tracks || 0})
                    </a>
                    <span className="actionbox">
                      <a
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-chevron-down"></i>{" "}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li className="nav-item">
                          <Link
                            reloadDocument={true}
                            to={{
                              pathname: `/career-track/${item.id.replace(
                                "#",
                                "%23"
                              )}/create`,
                              state: { type: "create" },
                            }}
                          >
                            Add new track
                          </Link>
                        </li>
                      </ul>
                    </span>
                    <ul className="listitemchild">
                      {item.careerTracks.map((career) => {
                        return (
                          <li key={career.id}>
                            <a className="active" title="" data-ripple>
                              {" "}
                              {career.name}
                            </a>
                            <span className="actionbox">
                              <a
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="fas fa-chevron-down"></i>{" "}
                              </a>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li className="nav-item">
                                  <a title="" className="nav-link">
                                    View
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    reloadDocument={true}
                                    to={{
                                      pathname: `/career-track/${item.id.replace(
                                        "#",
                                        "%23"
                                      )}/create`,
                                      state: { type: "create" },
                                    }}
                                  >
                                    Add new track
                                  </Link>
                                </li>
                              </ul>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
            {last_evaluated_key ? (
              <div className="lodmore">
                <button
                  className="btn-view btn-load-more"
                  onClick={() => {
                    loadMoreIndustries();
                  }}
                ></button>
              </div>
          ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = ({ careerTrackR }) => ({ careerTrackR });
export default connect(mapStateToProps, null)(Careertrackmobile);
