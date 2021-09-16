import React from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Form, Row, Col } from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const initValue = {
  name: "",
  email: "",
  password: "",
  isActive: false,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(12).required(),
  isActive: Yup.bool().oneOf([true, false]),
});

const add = () => {
  const { isLoading, response, postData } = usePostAxios("/signup");

  const { push } = useRouter();

  const handleSubmit = async (val) => {
    await postData(val);

    if (response !== null) {
      push("/admin/setup/user");
    }
  };

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
                    <Form.Label>user name</Form.Label>
                    <Form.Control
                      isInvalid={!!touched.name && !!errors.name}
                      name="firstName"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>user email</Form.Label>
                    <Form.Control
                      isInvalid={!!touched.email && !!errors.email}
                      name="email"
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

export default add;
