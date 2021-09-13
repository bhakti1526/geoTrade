import Router from "next/router";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import ForgetPassword from "./pages/forgot-password";

const Login1 = ({ getUser, users }) => {
  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <img
              style={{ width: "100px" }}
              src="https://geotrade.org.in/static/media/logo.0bf9f979.png"
              alt=""
            />
          </div>
          <h3 className="mb-2">Welcome back!</h3>
        </div>
        <div
          className="aside-image"
          style={{ backgroundImage: "url(/images/background/pic1.svg)" }}
        />
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div
                  id="sign-in"
                  className="auth-form tab-pane fade show active form-validation"
                >
                  <Formik
                    initialValues={{
                      password: "user123",
                      email: "user@user.com",
                    }}
                    validationSchema={{}}
                    onSubmit={(values, { setSubmitting }) => {
                      loginUser(values);
                    }}
                  >
                    {({
                      values,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form
                        id="dz_login_signup_form"
                        className="form-validate"
                        onSubmit={handleSubmit}
                      >
                        <h3 className="text-center mb-4 text-black">
                          Sign in your account
                        </h3>
                        <div className="form-group">
                          <label
                            className="mb-1 text-black"
                            htmlFor="val-email"
                          >
                            <strong>Email</strong>
                          </label>
                          <div>
                            <input
                              type="email"
                              className="form-control"
                              id="val-email"
                              name="email"
                              placeholder="hello@example.com"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <div
                              id="val-username1-error"
                              className="invalid-feedback animated fadeInUp"
                              style={{ display: "block" }}
                            >
                              {errors.email && errors.email}
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            className="mb-1 text-black"
                            htmlFor="val-password"
                          >
                            <strong>Password</strong>
                          </label>
                          <div>
                            <input
                              type="password"
                              className="form-control"
                              id="val-password"
                              name="password"
                              defaultValue="Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            <div
                              id="val-username1-error"
                              className="invalid-feedback animated fadeInUp"
                              style={{ display: "block" }}
                            >
                              {errors.password && errors.password}
                            </div>
                          </div>
                        </div>
                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                          <div className="form-group">
                            <div className="custom-control custom-checkbox ml-1">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="basic_checkbox_1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="basic_checkbox_1"
                              >
                                Remember my preference
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <a
                              onClick={() => onClick()}
                              className="c-pointer"
                              data-toggle="tab"
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </div>

                        <div
                          className="form-group text-center mt-4"
                          disabled={isSubmitting}
                        >
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            id="dz-signup-submit"
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                  <div className="new-account mt-3">
                    <p>
                      Don't have an account?{" "}
                      <a
                        className="text-primary"
                        href="#"
                        data-toggle="tab"
                        onClick={() => onClick1()}
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login1;
