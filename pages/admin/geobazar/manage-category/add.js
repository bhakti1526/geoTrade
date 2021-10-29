import React from "react";
import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";

import { Formik } from "formik";
import { Form, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useRouter } from "next/router";

const initSchema = {
  name: "",
  isActive: true,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  isActive: Yup.bool().oneOf([true, false]).required(),
});

const add = () => {
  const { postData, isLoading } = usePostAxios("/api/admin/geo-bazar-category");
  const { push } = useRouter();

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/geobazar/manage-category");
  };

  return (
    <WrapForm title="add geobazar category">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
        }) => {
          return (
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Col md="4" className="p-0">
                <Form.Group>
                  <Form.Label>category name</Form.Label>
                  <Form.Control
                    isInvalid={!!touched.name && !!errors.name}
                    name="name"
                  />
                </Form.Group>
              </Col>
              <Col md="4" className="p-0">
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    checked={values.isActive}
                    name="isActive"
                    isInvalid={!!touched.isActive && !!errors.isActive}
                    onChange={() => setFieldValue("isActive", !values.isActive)}
                    label="active or inactive"
                  />
                </Form.Group>
              </Col>
              <Button type="submit" disabled={isLoading}>
                add category
              </Button>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
