import React, { useContext } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";

import { Dispatch } from "../component/context/app.context";

const initSchema = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(18).required(),
});

const index = () => {
  const { push } = useRouter();

  const dispatch = useContext(Dispatch);

  const handleSubmit = async (val) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/login`, val)
      .then(async (res) => {
        await dispatch({ type: "AUTH-USER", data: res.data });

        const { isSeller } = jwtDecode(res.data.data.token);
        push(isSeller ? "/seller" : "/buyer");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="login-aside text-center  d-flex flex-column flex-row-auto">
          <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
            <div className="text-center mb-4 pt-5">
              <img
                style={{ width: "100px" }}
                src="https://i.ibb.co/q5j82YX/geotrade-logo.png"
                alt=""
              />
            </div>
            <h3 className="mb-2">Seller Pannel</h3>
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
                  ></div>
                  <Formik
                    onSubmit={handleSubmit}
                    initialValues={initSchema}
                    validationSchema={validationSchema}
                  >
                    {({ handleChange, handleSubmit, errors, touched }) => {
                      return (
                        <>
                          <h3 className="text-center mb-4 text-black">
                            Sign in your account
                          </h3>
                          <Form onSubmit={handleSubmit} onChange={handleChange}>
                            <Form.Group>
                              <Form.Label>email</Form.Label>
                              <Form.Control
                                isInvalid={!!touched.email && !!errors.email}
                                name="email"
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>password</Form.Label>
                              <Form.Control
                                isInvalid={
                                  !!touched.password && !!errors.password
                                }
                                type="password"
                                name="password"
                              />
                            </Form.Group>
                            <Form.Group>
                              <Button type="submit">submit</Button>
                            </Form.Group>
                          </Form>
                        </>
                      );
                    }}
                  </Formik>
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
