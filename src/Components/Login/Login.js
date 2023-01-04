import { Formik, Form, FastField } from "formik";
import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import InputField from "../Commons/Fields/Input";
import { login } from "./Actions"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import {useRef} from 'react';
import * as Yup from 'yup';

const Login = memo((props) => {
  const ref = useRef(null);
  const { dispatch, userR = {} } = props;
  const {isLogin, messageError} = userR;
  const [cookies, setCookie] = useCookies();
  useEffect(() => {

  }, []);
  

  
  const initialValues = {
    username: cookies.username || "",
    password: cookies.password || ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required')
  })

  const handleLoginSubmit = async function (values) {
    const { username, password, remember_me: rememberMe } = values;
    if(ref.current.checked){
      setCookie('username', username, { path: '/' });
      setCookie('password', password, { path: '/' });
    }
    dispatch(login({username, password}));
  };

  if (isLogin) {
    toast.success('Login successfully!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    return <Navigate to={'../'} />
  }

  if (messageError){
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
    <>
    <div className="www-layout">
      <section>
        <div className="gap no-gap signin whitish medium-opacity">
          <div
            className="bg-image"
            style={{ backgroundImage: "url(images/resources/theme-bg.jpg)" }}
          ></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="big-ad">
                  <figure>
                    <img src="images/logo2.png" alt="" />
                  </figure>
                  <h1>Welcome to the Career</h1>
                  <p>
                    Career is a social network template that can be used to
                    connect people. use this template for multipurpose social
                    activities like job, dating, posting, bloging and much more.
                    Now join & Make Cool Friends around the world !!!
                  </p>
                  <p>
                    <img src="images/login.png" width="100%" alt="" />
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="we-login-register">
                  <div className="form-title">
                    <i className="fa fa-key"></i>login
                    <span>
                      sign in now and meet the awesome Friends around the world.
                    </span>
                  </div>
                  {/* {messageError && <div style={{color: "red"}}>{messageError}</div>} */}
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLoginSubmit}
                  >
                    {(formikProps) => {
                      const { values, errors, touched } = formikProps;

                      return (
                        <Form className="we-form">
                          <FastField
                            name="username"
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

                          <input
                            ref={ref}
                            name="remember_me"
                            type="checkbox"
                          />
                          <label>remember me</label>
                          <div className="form-group">
                            <button
                              className="btn btn-block btnsignin"
                            >
                              Sign In
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                  <div className="">
                    <a className="forgotpass underline" href="#" title="">
                      forgot password?
                    </a>
                  </div>
                  <span>
                    Don't have an account?{" "}
                    <a className="we-account underline" href="/register" title="">
                      register now
                    </a>
                  </span>
                  <div
                    id="or-separator"
                    className="or-separator mt-12 snapple-seperator"
                  >
                    <span className="or-text">or</span>
                  </div>
                  <a className="btn btn-block  btnweform" href="#" title="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="24"
                      viewBox="0 0 22 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.1354 5.75C14.0004 5.75 15.4794 6.396 16.4204 7.33L19.0744 4.676C17.3544 3 14.9584 2 12.1354 2C8.1984 2 4.8554 4.148 3.1704 7.302L6.2004 9.7C7.0974 7.39 9.3304 5.75 12.1354 5.75Z"
                        fill="#E94435"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.7708 11.9896C5.7708 11.1806 5.9248 10.4106 6.2008 9.7006L3.1708 7.3016C2.4238 8.7006 1.9998 10.2946 1.9998 11.9896C1.9998 13.7206 2.4098 15.3266 3.1358 16.7256L6.1958 14.3026C5.9248 13.5956 5.7708 12.8206 5.7708 11.9896Z"
                        fill="#F8BB15"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.8107 17.3084C14.8667 17.8694 13.6267 18.2294 12.0107 18.2294C9.3627 18.2294 7.1007 16.6654 6.1957 14.3034L3.1357 16.7254C4.7837 19.9024 8.0767 22.0004 12.0107 22.0004C14.7537 22.0004 17.0727 21.1524 18.7877 19.6654L15.8107 17.3084Z"
                        fill="#34A751"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 11.9896C22 11.3086 21.931 10.6436 21.801 9.9996H12V13.9996H18.062L18.018 14.2496C17.784 15.4466 17.068 16.5606 15.811 17.3086L18.788 19.6656C20.818 17.9056 22 15.2466 22 11.9896Z"
                        fill="#547DBE"
                      ></path>
                    </svg>
                    <span className="btn-text">Sign in with Google</span>
                  </a>

                  <a className="btn btn-block  btnweform" href="#" title="">
                    <i className="fab fa-linkedin"></i>
                    <span className="btn-text">Sign in with Linkedin</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
});

const mapStateToProps = ({userR}) => ({userR});
export default connect(mapStateToProps, null)(Login);
