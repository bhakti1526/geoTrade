import React, { useEffect, useState } from "react";
import WrapForm from "../../../../src/components/admin/WrapForm";

import { Formik } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import { useRouter } from "next/router";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  isActive: Yup.bool().oneOf([true, false]).required(),
});

const id = () => {
  const [initSchema, setInitSchema] = useState({
    name: "",
    isActive: true,
  });

  const {
    query: { id },
    push,
  } = useRouter();

  const { response } = useFetchAxios(`/api/admin/geo-bazar-category?id=${id}`);
  const { postData } = usePostAxios(`/api/admin/geo-bazar-category?id=${id}`);

  useEffect(() => {
    if (response) {
      setInitSchema({
        name: response.name,
        isActive: response.isActive,
      });
    }
  }, [response]);

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/geobazar/manage-category");
  };

  return (
    <WrapForm title="update geobazar category">
      <Formik
        enableReinitialize
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
                    value={values.name}
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
              <Button type="submit">add category</Button>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default id;
