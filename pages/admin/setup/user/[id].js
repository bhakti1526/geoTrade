import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Form, Row, Col } from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(24).required(),
  isActive: Yup.bool().oneOf([true, false]),
});

const id = () => {
  const {
    push,
    query: { id },
  } = useRouter();

  const [initValue, setInitValue] = useState({
    _id: "",
    email: "",
    password: "",
    isActive: false,
  });

  const { isLoading, response } = useFetchAxios(`/api/admin/user?id=${id}`);

  const { postData } = usePostAxios(`/api/admin/user?id=${id}`);

  useEffect(() => {
    setInitValue({
      _id: response?._id,
      email: response?.email,
      password: response?.password,
      isActive: response?.isActive,
    });
  }, [response]);

  const handleSubmit = async (val) => {
    await postData(val);

    push("/admin/setup/user/");
  };

  if (isLoading === true) return <AppLoader />;

  return (
    <WrapForm title="add user">
      <Formik
        enableReinitialize
        initialValues={initValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          errors,
          values,
          setFieldValue,
        }) => {
          return (
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Row>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>user email</Form.Label>
                    <Form.Control
                      isInvalid={!!touched.email && !!errors.email}
                      name="email"
                      value={values.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>user password</Form.Label>
                    <Form.Control
                      isInvalid={!!touched.password && !!errors.password}
                      type="password"
                      name="password"
                      value={values.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>states</Form.Label>
                <Form.Check
                  checked={!!values.isActive}
                  isInvalid={!!errors.isActive}
                  onClick={() => setFieldValue("isActive", !values.isActive)}
                  label="active or inactive"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isActive}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-pill"
                >
                  add user
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default id;
