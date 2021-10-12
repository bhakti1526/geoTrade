import React, { useContext } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { Dispatch } from "../../component/context/app.context";
import { useRouter } from "next/router";
import Logo from "../../logo.png";

const initSchema = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(18).required(),
});

const index = () => {
  const dispatch = useContext(Dispatch);
  const { push } = useRouter();

  const handleSubmit = (val) => {
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
          ...val,
          url: true,
        })
        .then((x) => {
          dispatch({ type: "AUTH-ADMIN", data: x });
        })
        .then(() => push("/admin/dashboard"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="login-aside text-center  d-flex flex-column flex-row-auto">
          <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
            <div className="text-center mb-4 pt-5">
              <img style={{ width: "100px" }} src={Logo} alt="" />
            </div>
            <h3 className="mb-2">Admin Pannel!</h3>
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
                      onSubmit={handleSubmit}
                      initialValues={initSchema}
                      validationSchema={validationSchema}
                    >
                      {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        touched,
                      }) => (
                        <Form
                          id="dz_login_signup_form"
                          className="form-validate"
                          onSubmit={handleSubmit}
                          onChange={handleChange}
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
                              <Form.Control
                                className="form-control"
                                id="val-email"
                                name="email"
                                onBlur={handleBlur}
                                value={values.email}
                                isInvalid={!!touched.email && !!errors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
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
                              <Form.Control
                                type="password"
                                className="form-control"
                                id="val-password"
                                name="password"
                                defaultValue="Password"
                                value={values.password}
                                isInvalid={
                                  !!touched.password && !!errors.password
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          <div className="form-group text-center mt-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              id="dz-signup-submit"
                            >
                              Sign In
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

//   );
