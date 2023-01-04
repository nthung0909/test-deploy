import React, { memo, useEffect } from "react";
import $ from "jquery";
import { connect } from "react-redux";
import { getIndustries } from "./Actions";
import { Link } from "react-router-dom";

const CareerTracks = memo((props) => {
  /*------- Hook ---------*/
  const { dispatch, careerTrackR = {} } = props;

  const menuItems = careerTrackR.items || [];
  const { total = 0, last_evaluated_key } = careerTrackR;
  useEffect(() => {
    dispatch(getIndustries({ limit: 10 }));
  }, []);

  /*------- Actions ---------*/
  const expandOrCloseSubMenu = () => {
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
    if (str.length < 22) return str;
    const arrStr = str.split(" ");
    if (arrStr[0].length >= 22) {
      return arrStr[0].slice(0, 21) + "...";
    }
    let result = arrStr[0];
    for (let i = 1; i < arrStr.length; i++) {
      const strTmp = `${result} ${arrStr[i]}`;
      if (strTmp.length >= 22) return `${result}...`;
      result = strTmp;
    }
    return result;
  };

  const loadMoreIndustries = () => {
    dispatch(getIndustries({ limit: total + 10 }));
  };
  return (
    <div className="col-lg-3 mobileremove">
      <aside className="sidebar static left">
        <div className="widget  low-opacity">
          <div className="widget-logo">
            <img src="images/logo.jpg" alt="" />
            <span className="slogan">
              {" "}
              Plan a career that you're desired to work!
            </span>
          </div>
        </div>

        <div className="widget ">
          <h4 className="widget-title">Carrer track</h4>
          <ul className="naves listitemmulti carrer-track-area">
            {menuItems.map((item) => {
              return (
                <li
                  onClick={() => {
                    expandOrCloseSubMenu();
                  }}
                  key={`track-menu-${item.id}`}
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
      </aside>
    </div>
  );
});

const mapStateToProps = ({ careerTrackR }) => ({ careerTrackR });
export default connect(mapStateToProps, null)(CareerTracks);
