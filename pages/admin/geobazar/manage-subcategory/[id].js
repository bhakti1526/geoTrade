import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WrapForm from "../../../../src/components/admin/WrapForm";
import { Formik } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";
import * as Yup from "yup";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  category: Yup.string().required(),
  isActive: Yup.bool().oneOf([true, false]).required(),
});

const add = () => {
  const {
    query: { id },
  } = useRouter();

  const [initSchema, setInitSchema] = useState({
    name: "",
    category: "",
    isActive: true,
  });

  const { response: dataRes, isLoading: dataLoad } = useFetchAxios(
    `/api/admin/geo-bazar-sub-category?id=${id}`
  );

  const { response, isLoading } = useFetchAxios(
    "/api/admin/geo-bazar-category"
  );

  const { postData, isLoading: postLoading } = usePostAxios(
    `/api/admin/geo-bazar-sub-category?id=${id}`
  );

  useEffect(() => {
    if (dataRes) {
      const { name, category, isActive } = dataRes;
      setInitSchema({ name, category: category._id, isActive });
    }
  }, [dataRes]);

  const { push } = useRouter();

  if (isLoading === true) return <AppLoader />;
  if (dataLoad === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/geobazar/manage-subcategory");
  };

  return (
    <WrapForm title="add">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          values,
          setFieldValue,
          errors,
        }) => {
          return (
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Row>
                <Col md="6" lg="6" xl="4">
                  <Form.Group>
                    <Form.Label>GeoBazar category</Form.Label>
                    <Form.Control
                      name="category"
                      as="select"
                      value={values.category}
                      isInvalid={!!touched.category && !!errors.category}
                    >
                      <option>select</option>
                      {response.map((x) => (
                        <option value={x._id}>{x.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="6" lg="6" xl="4">
                  <Form.Group>
                    <Form.Label>GeoBazar sub category</Form.Label>
                    <Form.Control
                      name="name"
                      value={values.name}
                      isInvalid={!!touched.name && !!errors.name}
                    />
                  </Form.Group>
                </Col>
                <Col md="6" lg="6" xl="4">
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Check
                      checked={values.isActive}
                      name="isActive"
                      isInvalid={!!touched.isActive && !!errors.isActive}
                      onChange={() =>
                        setFieldValue("isActive", !values.isActive)
                      }
                      label="active or inactive"
                    />
                  </Form.Group>
                </Col>
                <Col  md="12">
                  <Button type="submit" disabled={postLoading}>
                    add
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
