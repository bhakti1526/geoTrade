import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { Form, Row, Col, Button } from "react-bootstrap";

import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import WrapForm from "../../../../src/components/admin/WrapForm";
import AppLoader from "../../../../src/components/admin/AppLoader";

const validationSchema = Yup.object().shape({
  sellerType: Yup.string()
    .required()
    .test((e) => (e === "select" ? false : true)),
  parentGroup: Yup.string()
    .required()
    .test((e) => (e === "select" ? false : true)),
  parentCategory: Yup.string()
    .required()
    .test((e) => (e === "select" ? false : true)),
  parentSubCategoryName: Yup.string().required(),
});

const id = () => {
  const {
    query: { id },
    push,
  } = useRouter();

  const [initSchema, setInitSchema] = useState({
    sellerType: "",
    parentGroup: "",
    parentCategory: "",
    parentSubCategoryName: "",
  });

  const { isLoading: subCategoryLoad, response: subCategoryRes } =
    useFetchAxios(`/api/admin/subcategory?id=${id}`);

  useEffect(() => {
    if (subCategoryRes) {
      setInitSchema({
        ...subCategoryRes,
      });
    }
  }, [subCategoryRes]);

  const { isLoading: sellerLoad, response: sellerRes } =
    useFetchAxios("/getSellerType");
  const { isLoading: parentGroupLoad, response: parentGroupRes } =
    useFetchAxios("/getParentGroup");
  const { isLoading: parentCategoryLoad, response: prentCategoryRes } =
    useFetchAxios("/getParentCategory");

  const { isLoading, postData } = usePostAxios(`/api/admin/subcategory/${id}`);

  if (sellerLoad === true) return <AppLoader />;
  if (parentGroupLoad === true) return <AppLoader />;
  if (parentCategoryLoad === true) return <AppLoader />;
  if (subCategoryLoad === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/parameter/parent-subcategory");
  };

  return (
    <WrapForm>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => {
          return (
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Row>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>seller type</Form.Label>
                    <Form.Control
                      name="sellerType"
                      value={values.sellerType}
                      as="select"
                      isInvalid={!!touched.sellerType && !!errors.sellerType}
                    >
                      <option>select</option>
                      {sellerRes.map((x) => (
                        <option value={x._id}>{x.sellerTypeName}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>parent group</Form.Label>
                    <Form.Control
                      name="parentGroup"
                      value={values.parentGroup}
                      isInvalid={!!touched.parentGroup && !!errors.parentGroup}
                      as="select"
                    >
                      <option>select</option>
                      {parentGroupRes.map((x) => (
                        <option value={x._id}>{x.parentGroupName}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>parent category</Form.Label>
                    <Form.Control
                      value={values.parentCategory}
                      name="parentCategory"
                      as="select"
                      isInvalid={
                        !!touched.parentCategory && !!errors.parentCategory
                      }
                    >
                      <option>select</option>
                      {prentCategoryRes.map((x) => (
                        <option value={x._id}>{x.parentCatagoryName}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> sub category</Form.Label>
                    <Form.Control
                      name="parentSubCategoryName"
                      value={values.parentSubCategoryName}
                      isInvalid={
                        !!touched.parentSubCategoryName &&
                        !!errors.parentSubCategoryName
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Button disabled={isLoading} type="submit">
                  submit
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
