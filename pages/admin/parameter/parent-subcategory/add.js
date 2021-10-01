import React from "react";
import { useRouter } from "next/router";
import Select, { components } from "react-select";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
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
  parentCategory: Yup.array().of(Yup.string()).required(),
  parentSubCategoryName: Yup.string().required(),
});

const initSchema = {
  sellerType: "",
  parentGroup: "",
  parentCategory: "",
  parentSubCategoryName: "",
};

const add = () => {
  const { push } = useRouter();

  const { isLoading: sellerLoad, response: sellerRes } =
    useFetchAxios("/getSellerType");
  const { isLoading: parentGroupLoad, response: parentGroupRes } =
    useFetchAxios("/getParentGroup");
  const { isLoading: parentCategoryLoad, response: prentCategoryRes } =
    useFetchAxios("/getParentCategory");

  const { isLoading, postData } = usePostAxios("/api/admin/subcategory");

  if (sellerLoad === true) return <AppLoader />;
  if (parentGroupLoad === true) return <AppLoader />;
  if (parentCategoryLoad === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/parameter/parent-subcategory");
  };

  return (
    <WrapForm>
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
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
          const parenCategoryStyle = {
            control: (base, state) => ({
              ...base,

              borderColor: state.isFocused
                ? "#ddd"
                : !errors?.parentCategory
                ? "#ddd"
                : "#f72b50",

              "&:hover": {
                borderColor: state.isFocused
                  ? "#ddd"
                  : !errors?.parentCategory
                  ? "#ddd"
                  : "#f72b50",
              },
            }),
          };

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
                    <Select
                      styles={parenCategoryStyle}
                      options={prentCategoryRes.map((x) => ({
                        value: x._id,
                        label: x.parentCatagoryName,
                      }))}
                      isMulti
                      onChange={(e) =>
                        setFieldValue(
                          "parentCategory",
                          e.map((x) => x.value)
                        )
                      }
                    />
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

export default add;
