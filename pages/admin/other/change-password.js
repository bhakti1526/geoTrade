import React from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import WrapForm from "../../../src/components/admin/WrapForm";
import usePostAxios from "../../../component/hooks/usePostAxios";

const initSchema = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().min(6).max(24).required(),
  newPassword: Yup.string().min(6).max(24).required(),
  confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword"), null]),
});

const changePassword = () => {
  const { postData, isLoading } = usePostAxios(
    "/api/auth/admin/changepassword"
  );

  const { push } = useRouter();

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/dashboard");
  };

  return (
    <WrapForm title="change password">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <>
              <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Row>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>old password</Form.Label>
                      <Form.Control
                        name="currentPassword"
                        type="password"
                        value={values.currentPassword}
                        isInvalid={
                          !!touched.currentPassword && !!errors.currentPassword
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>change password</Form.Label>
                      <Form.Control
                        name="newPassword"
                        value={values.newPassword}
                        isInvalid={
                          !!touched.newPassword && !!errors.newPassword
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>confirm password</Form.Label>
                      <Form.Control
                        name="confirmNewPassword"
                        value={values.confirmNewPassword}
                        isInvalid={
                          !!touched.confirmNewPassword &&
                          !!errors.confirmNewPassword
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="text-center">
                  <Button disabled={isLoading} type="submit">
                    change password
                  </Button>
                </Form.Group>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default changePassword;
