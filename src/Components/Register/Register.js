import { Formik, Form, FastField } from "formik";
import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import InputField from "../Commons/Fields/Input";
import { register } from "./Actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup'

const Register = memo((props) => {
  useEffect(() => {}, []);
  const { dispatch, userR = {} } = props;
  const { registerSuccess, messageError } = userR;

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required')
  })

  const handleRegisterSubmit = async function (values) {
    const { name, email, password } = values;
    dispatch(register({ name, email, password }));
  };

  if(localStorage.getItem('access-token')){
    toast.warn("Please logout to register!",{
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",}
    )
    return <Navigate to={'../'} />
  }

  if (registerSuccess) {
    toast.success("Register successfully. Please login", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    return <Navigate to={"../login"} />;
  }

  if (!registerSuccess && messageError) {
    toast.error(messageError, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="www-layout">
      <section>
        <div className="gap no-gap signin whitish medium-opacity">
          <div
            className="bg-image"
            style={{ backgroundImage: "url(images/resources/theme-bg.jpg)" }}
          />
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="big-ad">
                  <figure>
                    <img src="images/logo2.png" alt='' />
                  </figure>
                  <h1>Welcome to the Career</h1>
                  <p>
                    Career is a social network template that can be used to
                    connect people. use this template for multipurpose social
                    activities like job, dating, posting, bloging and much more.
                    Now join &amp; Make Cool Friends around the world !!!
                  </p>
                  <p>
                    <img src="images/login.png" width="100%" />
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="we-login-register">
                  <div className="form-title">
                    <i className="fa fa-key" />
                    Sign Up
                    <span>
                      Sign Up now and meet the awesome friends around the
                      world..
                    </span>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegisterSubmit}
                  >
                    {(formikProps) => {
                      const { values, errors, touched } = formikProps;

                      return (
                        <Form className="we-form">
                           <FastField
                            name="name"
                            type="text"
                            component={InputField}
                            placeholder="Name"
                          />

                          <FastField
                            name="email"
                            type="text"
                            component={InputField}
                            placeholder="Email"
                          />

                          <FastField
                            name="password"
                            type="password"
                            component={InputField}
                            placeholder="Password"
                          />

                          <div  className=" privacytext">
                            By clicking Agree &amp; Join, you agree to the
                            Career User Agreement, Privacy Policy, and Cookie
                            Policy.
                          </div>
                          <div className="form-group">
                            <button className="btn btn-block btnsignin">
                              Sign up
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                  <span>
                    already have an account?{" "}
                    <a className="we-account underline" href="./login" title=''>
                      Sign in
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

const mapStateToProps = ({ userR }) => ({ userR });
export default connect(mapStateToProps, null)(Register);
