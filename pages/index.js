import React, { useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form, Button, Container } from "react-bootstrap";

import usePostAxios from "../component/hooks/usePostAxios";
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

        console.log(isSeller);

        push(isSeller ? "/seller" : "/buyer");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit }) => {
          return (
            <>
              <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Group>
                  <Form.Label>email</Form.Label>
                  <Form.Control name="email" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>password</Form.Label>
                  <Form.Control name="password" />
                </Form.Group>
                <Form.Group>
                  <Button type="submit">submit</Button>
                </Form.Group>
              </Form>
            </>
          );
        }}
      </Formik>
    </Container>
  );
};

export default index;
