import React, { memo, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as yup from "yup";
import { Input } from "reactstrap";
import {
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import * as action from "./Action";
import Select from "react-select";
import vars from "../../Utils/vars";
import { userBio } from "../UserBio/Action";
import { cloneDeep } from "lodash";
const CreateCareerTrack = memo((props) => {
  const navigate = useNavigate();
  const { dispatch } = props;
  const query = useParams();
  const { id } = query;
  const params = useSearchParams();
  const careerTrackId = params[0].get("career_track_id");
  const location = useLocation();
  const type = location.pathname.includes("/create") ? "create" : "update";
  let formRef = null;
  const initialCareerTrackSkill = (type = "industry") => {
    const date = new Date();
    const key = (date.getTime() * 1000 + date.getMilliseconds()).toString();
    return {
      [key]: {
        key,
        type,
        skill_category_id: "",
        skill_id: "",
        what: "",
        why: "",
        desired_level: "",
        external_desc_urls: "",
        declared_confidence: "",
        declared_objective: "",
        errors: {},
      },
    };
  };
  const [industryOptions, setIndustryOptions] = useState([]);
  const [derivedCareerTrackOption, setDeviredCareerTrackOptions] = useState([]);
  const [categorySkillOptions, setCategorySkillOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [careerTrackSkills, setCareerTrackSkills] = useState({});
  const [nextCareerTrackOptions, setNextCareerTrackOptions] = useState([]);
  const [initialValues, setInitialValues] = useState({
    industry_id: id,
    industry_name: "",
    title: "",
    desc: "",
    is_public: 1,
    status: "",
    derived_career_track_id: "",
    career_track_skills: [],
    next_career_tracks: [],
  });
  useEffect(() => {
    if (id) {
      dispatch(action.getIndustryById({ industry_id: id })).then((resp) => {
        const options = resp
          ? [
              {
                value: resp.id,
                label: resp.name_en,
              },
            ]
          : [];
        setIndustryOptions(options);
      });
      //get derived career track option
      dispatch(action.getAllTrackByIndustry(id)).then((resp) => {
        const options = resp.map((item) => {
          return {
            value: item.id,
            label: item.title,
          };
        });
        setDeviredCareerTrackOptions(options);
      });
    } else {
      dispatch(action.getAllIndustry()).then((resp) => {
        const options = resp.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setIndustryOptions(options);
      });
    }
    // get all category id
    dispatch(action.getAllSkillCategory()).then((resp) => {
      const options = resp.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setCategorySkillOptions(options);
    });
    //get all skill
    dispatch(action.getAllSkill()).then((resp) => {
      const options = resp.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setSkillOptions(options);
    });
    //get next career track
    dispatch(userBio()).then((resp) => {
      dispatch(action.getCareerTrackByUser(resp.id)).then((resp1) => {
        const options = resp1.map((item) => {
          return {
            value: item.id,
            label: item.title,
          };
        });
        setNextCareerTrackOptions(options);
        //set inintial value
        if (careerTrackId) {
          action.getCareerTrack(careerTrackId).then((resp) => {
            const data = {
              industry_id: id,
              industry_name: "",
              title: resp.title || "",
              desc: resp.desc || "",
              is_public: Number(resp.is_public) === 1 ? 1 : 2,
              status: resp.status || "",
              derived_career_track_id: resp.derived_career_track_id || "",
              career_track_skills: resp.career_track_skills || [],
              next_career_tracks: resp.next_career_tracks || [],
            };
            setInitialValues(data);
          });
        }
      });
    });
  }, []);

  const formValidation = yup.object().shape({
    industry_id: yup.string().required("* field is require"),
    // derived_career_track_id: yup.string().required("* field is require"),
    title: yup
      .string()
      .trim()
      .max(255, "* must less than 256 charactor")
      .required("* field is require"),
    desc: yup
      .string()
      .trim()
      .max(255, "* must less than 256 charactor")
      .required("* field is require")
      .nullable(true),
  });

  const desiredLevelOptions = vars.desiredLevel.map((item) => ({
    key: item,
    value: item,
    label: item,
  }));
  const renderSkills = (type = "industry") => {
    const skills = Object.values(careerTrackSkills);
    return skills
      .filter((item) => item.type === type)
      .map((item) => {
        return (
          <div key={item.key}>
            <div className="skill-one">
              <div className="form-group">
                <label>Skill Category</label>
                <Select
                  options={categorySkillOptions}
                  placeholder={"Select..."}
                  styles={{
                    option: (provider) => ({
                      ...provider,
                      color: "#82898e",
                    }),
                    control: (base) => ({
                      ...base,
                      ...selectCss,
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: { ...theme.colors, primary: "#4C9AFF" },
                  })}
                  isSearchable={true}
                  onChange={(e) =>
                    onChangeSkillValue(
                      { target: e },
                      item.key,
                      "skill_category_id"
                    )
                  }
                />
                {item.errors.skill_category_id ? (
                  <label className="sd-error-text">
                    {item.errors.skill_category_id}
                  </label>
                ) : null}
              </div>
              <div className="form-group">
                <label>Skill</label>
                <Select
                  options={skillOptions}
                  placeholder={"Select..."}
                  styles={{
                    option: (provider) => ({
                      ...provider,
                      color: "#82898e",
                    }),
                    control: (base) => ({
                      ...base,
                      ...selectCss,
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: { ...theme.colors, primary: "#4C9AFF" },
                  })}
                  isSearchable={true}
                  onChange={(e) =>
                    onChangeSkillValue({ target: e }, item.key, "skill_id")
                  }
                />
                {item.errors.skill_id ? (
                  <label className="sd-error-text">
                    {item.errors.skill_id}
                  </label>
                ) : null}
              </div>
              <div className="form-group">
                <label>Why Is This Skill?</label>
                <input
                  onChange={(e) => onChangeSkillValue(e, item.key, "why")}
                  type="text"
                  placeholder="Why Is This Skill?"
                  className="input-field"
                />
                {item.errors.why ? (
                  <label className="sd-error-text">{item.errors.why}</label>
                ) : null}
              </div>
              <div className="form-group">
                <label>What Is This Skill?</label>
                <input
                  onChange={(e) => onChangeSkillValue(e, item.key, "what")}
                  type="text"
                  placeholder="What Is This Skill?"
                  className="input-field"
                />
                {item.errors.what ? (
                  <label className="sd-error-text">{item.errors.what}</label>
                ) : null}
              </div>
              <div className="form-group">
                <label>Desired Level</label>
                <Select
                  options={desiredLevelOptions}
                  placeholder={"Select..."}
                  styles={{
                    option: (provider) => ({
                      ...provider,
                      color: "#82898e",
                    }),
                    control: (base) => ({
                      ...base,
                      ...selectCss,
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: { ...theme.colors, primary: "#4C9AFF" },
                  })}
                  onChange={(e) =>
                    onChangeSkillValue({ target: e }, item.key, "desired_level")
                  }
                />
                {item.errors.desired_level ? (
                  <label className="sd-error-text">
                    {item.errors.desired_level}
                  </label>
                ) : null}
              </div>
              <div className="form-group">
                <label>External Resources</label>
                <input
                  onChange={(e) =>
                    onChangeSkillValue(e, item.key, "external_desc_urls")
                  }
                  type="text"
                  placeholder="External Resources"
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label>Career Planner's Objective</label>
                <input
                  onChange={(e) =>
                    onChangeSkillValue(e, item.key, "declared_objective")
                  }
                  type="text"
                  placeholder="Career Planner's Objective"
                  className="input-field"
                />
                {item.errors.declared_objective ? (
                  <label className="sd-error-text">
                    {item.errors.declared_objective}
                  </label>
                ) : null}
              </div>
              <div className="form-group">
                <label>Career Planner's Confidence</label>
                <Select
                  options={desiredLevelOptions}
                  placeholder={"Select..."}
                  styles={{
                    option: (provider) => ({
                      ...provider,
                      color: "#82898e",
                    }),
                    control: (base) => ({
                      ...base,
                      ...selectCss,
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: { ...theme.colors, primary: "#4C9AFF" },
                  })}
                  onChange={(e) =>
                    onChangeSkillValue(
                      { target: e },
                      item.key,
                      "declared_confidence"
                    )
                  }
                />
                {item.errors.declared_confidence ? (
                  <label className="sd-error-text">
                    {item.errors.declared_confidence}
                  </label>
                ) : null}
              </div>
              <a
                className="btn btn-block btn-skillrmove"
                onClick={() => removeSkill(item.key)}
              >
                <i className="fa fa-times"></i> Remove
              </a>
            </div>
          </div>
        );
      });
  };
  const addSkill = (type) => {
    let newSkill = initialCareerTrackSkill(type);
    setCareerTrackSkills({ ...careerTrackSkills, ...newSkill });
  };
  const removeSkill = (key) => {
    let skills = cloneDeep(careerTrackSkills);
    delete skills[key];
    setCareerTrackSkills(skills);
  };
  const onChangeSkillValue = (e, key, field) => {
    const { value } = e.target;
    let currentSkills = cloneDeep(careerTrackSkills);
    currentSkills[key][field] = value;
    switch (field) {
      case "skill_category_id":
      case "skill_id":
      case "desired_level":
      case "declared_confidence":
      case "declared_objective":
      case "what":
      case "why":
        if (!value) currentSkills[key].errors[field] = "* Field is require!";
        else delete currentSkills[key].errors[field];
        break;
      default:
        break;
    }
    setCareerTrackSkills(currentSkills);
  };
  const validateSkill = (careerTrackSkills) => {
    const currentTrackSkills = cloneDeep(careerTrackSkills);
    for (const key in currentTrackSkills) {
      for (const iterator in currentTrackSkills[key]) {
        switch (iterator) {
          case "skill_category_id":
          case "skill_id":
          case "desired_level":
          case "declared_confidence":
          case "declared_objective":
          case "what":
          case "why":
            if (!currentTrackSkills[key][iterator]) {
              currentTrackSkills[key].errors = {
                ...currentTrackSkills[key].errors,
                [iterator]: "* Field is require!",
              };
            } else {
              delete currentTrackSkills[key].errors[iterator];
            }
            break;
          default:
            break;
        }
      }
    }
    setCareerTrackSkills(currentTrackSkills);
    return currentTrackSkills;
  };
  const renderError = (
    errors,
    touched = {},
    field = "",
    checkTouched = true
  ) => {
    return errors[field] && touched[field] && checkTouched ? (
      <label className="sd-error-text">{errors[field]}</label>
    ) : null;
  };
  const onSubmit = (values, { resetForm }) => {
    const validate = validateSkill(careerTrackSkills) || {};
    for (const key in validate) {
      if (validate[key].errors && Object.keys(validate[key].errors).length)
        return;
    }
    let currentSkills = cloneDeep(careerTrackSkills);
    currentSkills = Object.values(currentSkills);
    currentSkills = currentSkills.map((item) => ({
      skill_category_id: item.skill_category_id,
      skill_id: item.skill_id,
      what: item.what,
      why: item.why,
      desired_level: item.desired_level,
      external_desc_urls: item.external_desc_urls
        ? item.external_desc_urls.split(",")
        : [],
      declared_confidence: item.declared_confidence,
      declared_objective: item.declared_objective,
    }));

    const {
      title,
      desc,
      is_public,
      status,
      derived_career_track_id,
      next_career_tracks,
      industry_id,
    } = values;
    const body = {
      industry_id,
      title,
      desc,
      is_public: Number(is_public) === 1 ? true : false,
      status,
      derived_career_track_id,
      next_career_tracks,
      career_track_skills: currentSkills,
    };
    if (type === "create") {
      dispatch(action.createCareerTrack(body)).then((resp) => {
        if (resp) {
          navigate("/", { replace: true });
          resetForm();
        }
      });
    } else {
      dispatch(action.updateCareerTrack(body)).then((resp) => {
        if (resp) {
          navigate("/", { replace: true });
          resetForm();
        }
      });
    }
  };

  const selectCss = {
    backgroundColor: "#edf2f6",
    fontSize: "13px",
    border: "1px solid #e4e4e4",
  };
  return (
    <>
      {(careerTrackId && initialValues.title) || !careerTrackId ? (
        <Formik
          initialValues={initialValues}
          validationSchema={formValidation}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            const { handleSubmit, values, errors, touched, setFieldValue } =
              formikProps;
            formRef = formikProps;
            return (
              <Form className="c-form repeater" onSubmit={handleSubmit}>
                <div data-repeater-list="outer-list">
                  <div data-repeater-item>
                    <div className="central-meta">
                      <div className="editing-interest">
                        <div className="career-form-area">
                          <div className="form-group">
                            {initialValues.industry_id ? (
                              <label>
                                Industry: {industryOptions[0]?.label}
                              </label>
                            ) : (
                              <>
                                <Select
                                  id="industry_id"
                                  name="industry_id"
                                  options={industryOptions}
                                  placeholder={"Select..."}
                                  styles={{
                                    option: (provider) => ({
                                      ...provider,
                                      color: "#82898e",
                                    }),
                                    control: (base) => ({
                                      ...base,
                                      ...selectCss,
                                    }),
                                    singleValue: (provider) => ({
                                      ...provider,
                                    }),
                                  }}
                                  theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                      ...theme.colors,
                                      primary: "#4C9AFF",
                                    },
                                  })}
                                  isLoading={false}
                                  isSearchable={true}
                                  onChange={({ value }) => {
                                    setFieldValue("industry_id", value);
                                    dispatch(
                                      action.getAllTrackByIndustry(value)
                                    ).then((resp) => {
                                      const options = resp.map((item) => {
                                        return {
                                          key: item.id,
                                          value: item.id,
                                          label: item.title,
                                        };
                                      });
                                      setDeviredCareerTrackOptions(options);
                                      setFieldValue("industry_id", value);
                                      setFieldValue(
                                        "derived_career_track_id",
                                        ""
                                      );
                                      touched.industry_id = true;
                                    });
                                  }}
                                />
                                {renderError(errors, touched, "industry_id")}
                              </>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Derived Career Track</label>
                            <Select
                              placeholder="Select..."
                              name="derived_career_track_id"
                              options={derivedCareerTrackOption}
                              defaultValue={
                                initialValues.derived_career_track_id
                              }
                              isSearchable={true}
                              isLoading={false}
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  ...selectCss,
                                }),
                              }}
                              onChange={({ value }) => {
                                touched.derived_career_track_id = true;
                                setFieldValue("derived_career_track_id", value);
                              }}
                            />
                            {renderError(
                              errors,
                              touched,
                              "derived_career_track_id"
                            )}
                          </div>
                          <div className="form-group">
                            <label>Title</label>
                            <Input
                              defaultValue={initialValues.title}
                              name="title"
                              placeholder="title"
                              onChange={(e) => {
                                touched.title = true;
                                setFieldValue("title", e.target.value);
                              }}
                            />
                            {touched.title && errors.title ? (
                              <label className="sd-error-text">
                                {errors.title}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label>Description</label>
                            <Input
                              type="textarea"
                              name="desc"
                              rows="3"
                              placeholder="Description"
                              defaultValue={initialValues.desc}
                              onChange={(e) => {
                                touched.desc = true;
                                setFieldValue("desc", e.target.value);
                              }}
                            />
                            {touched.desc && errors.desc ? (
                              <label className="sd-error-text">
                                {errors.desc}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group">
                            <label>Is Public</label>
                            <div className="form-radio">
                              <div className="radio">
                                <label>
                                  <Input
                                    type="radio"
                                    name="is_public"
                                    value={1}
                                    defaultChecked={
                                      Number(values.is_public) === 1
                                    }
                                    onClick={() => {
                                      setFieldValue("is_public", 1);
                                    }}
                                  />
                                  <i className="check-box"></i>Yes
                                </label>
                              </div>
                              <div className="radio">
                                <label>
                                  <Input
                                    type="radio"
                                    name="is_public"
                                    value={2}
                                    defaultChecked={
                                      Number(values.is_public) === 2
                                    }
                                    onClick={() => {
                                      setFieldValue("is_public", 2);
                                    }}
                                  />
                                  <i className="check-box"></i>No
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* <div className="form-group">
                        <label>Learning Resources</label>
                        <FastField
                          name="learning_resource"
                          component={InputField}
                          require={true}
                          placeholder="title"
                        />
                      </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="card card-warning central-meta collapsed-card">
                      <div className="card-header card-x-title">
                        <h3 className="card-title ">Industry Knowledge</h3>
                        <div className="card-tools">
                          <button
                            type="button"
                            className="btn btn-tool"
                            data-card-widget="collapse"
                          >
                            <i className={"fas fa-plus"}></i>
                          </button>
                        </div>
                        {/* <!-- /.card-tools --> */}
                      </div>
                      {/* <!-- /.card-header --> */}
                      <div className="card-body">
                        <div className="career-form-area">
                          <div className="inner-repeater">
                            {renderSkills("industry")}
                            <button
                              className="btn btn-grey"
                              type="button"
                              onClick={() => addSkill("industry")}
                            >
                              <i className="fa fa-plus"></i> Add skill
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>

                    <div className="card card-warning central-meta  collapsed-card">
                      <div className="card-header card-x-title">
                        <h3 className="card-title ">Tools & Technologies</h3>

                        <div className="card-tools">
                          <button
                            type="button"
                            className="btn btn-tool"
                            data-card-widget="collapse"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        {/* <!-- /.card-tools --> */}
                      </div>
                      {/* <!-- /.card-header --> */}
                      <div className="card-body">
                        <div className="career-form-area">
                          <div className="inner-repeater">
                            {renderSkills("tool_and_tech")}
                            <button
                              className="btn btn-grey"
                              type="button"
                              onClick={() => addSkill("tool_and_tech")}
                            >
                              <i className="fa fa-plus"></i> Add skill
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>

                    <div className="card card-warning central-meta  collapsed-card">
                      <div className="card-header card-x-title">
                        <h3 className="card-title ">Interpersonal Skills</h3>

                        <div className="card-tools">
                          <button
                            type="button"
                            className="btn btn-tool"
                            data-card-widget="collapse"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        {/* <!-- /.card-tools --> */}
                      </div>
                      {/* <!-- /.card-header --> */}
                      <div className="card-body">
                        <div className="career-form-area">
                          <div className="inner-repeater">
                            {renderSkills("interpersional")}
                            <button
                              className="btn btn-grey"
                              type="button"
                              onClick={() => addSkill("interpersional")}
                            >
                              <i className="fa fa-plus"></i> Add skill
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>

                    <div className="card card-warning central-meta  collapsed-card">
                      <div className="card-header card-x-title">
                        <h3 className="card-title ">Other Skills</h3>

                        <div className="card-tools">
                          <button
                            type="button"
                            className="btn btn-tool"
                            data-card-widget="collapse"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        {/* <!-- /.card-tools --> */}
                      </div>
                      {/* <!-- /.card-header --> */}
                      <div className="card-body">
                        <div className="career-form-area">
                          <div className="inner-repeater">
                            {renderSkills("other")}
                            <button
                              className="btn btn-grey"
                              type="button"
                              onClick={() => addSkill("other")}
                            >
                              <i className="fa fa-plus"></i> Add skill
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /.card-body --> */}
                    </div>

                    <div className="central-meta">
                      <div className="editing-interest">
                        <div className="career-form-area">
                          <div className="form-group">
                            <label>Next career tracks</label>
                            <Select
                              defaultValue={nextCareerTrackOptions.filter(
                                (option) =>
                                  initialValues.next_career_tracks.includes(
                                    option.value
                                  )
                              )}
                              id="next_career_tracks"
                              name="next_career_tracks"
                              options={nextCareerTrackOptions}
                              isMulti={true}
                              placeholder={"Select..."}
                              styles={{
                                option: (provider) => ({
                                  ...provider,
                                  color: "#82898e",
                                }),
                                control: (base) => ({
                                  ...base,
                                  ...selectCss,
                                }),
                                singleValue: (provider) => ({
                                  ...provider,
                                }),
                              }}
                              theme={(theme) => ({
                                ...theme,
                                colors: { ...theme.colors, primary: "#4C9AFF" },
                              })}
                              isLoading={false}
                              isSearchable={true}
                              onChange={(e) => {
                                const value = e.map((item) => item.value);
                                setFieldValue("next_career_tracks", value);
                                touched.next_career_tracks = true;
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setFieldValue("status", "published");
                              handleSubmit();
                            }}
                          >
                            Complete & Post
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFieldValue("status", "new");
                              handleSubmit();
                            }}
                          >
                            Complete
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFieldValue("status", "outdated");
                              handleSubmit();
                            }}
                          >
                            Save Draft
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : null}
    </>
  );
});

const mapStateToProps = ({ createNewTrackR, userR }) => ({
  createNewTrackR,
  userR,
});
export default connect(mapStateToProps, null)(CreateCareerTrack);
