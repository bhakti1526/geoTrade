import React from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import WrapForm from "../../../../src/components/admin/WrapForm";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import usePostAxios from "../../../../component/hooks/usePostAxios";

const initValue = {
  name: "",
  classs: "",
  url: "",
  isActive: true,
};

const regMatch =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  classs: Yup.string().required(),
  url: Yup.string()
    .matches(regMatch, "Website should be a valid URL")
    .required(),
  isActive: Yup.bool().oneOf([true, false]),
});

const add = () => {
  const { isLoading, postData } = usePostAxios("/addSocial");

  const { push } = useRouter();

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/manage/social/");
  };

  return (
    <WrapForm title="add social">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initValue}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue,
        }) => {
          return (
            <Form
              className="row"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Social Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=" "
                  name="name"
                  isInvalid={!!touched.name && !!errors.name}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Icon Class</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=" "
                  name="classs"
                  isInvalid={!!touched.classs && !!errors.classs}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Social Link</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  name="url"
                  placeholder=" "
                  isInvalid={!!touched.url && !!errors.url}
                />
              </FormGroup>

              <Form.Group className="ml-3">
                <Form.Label>status</Form.Label>
                <Form.Check
                  label="active or inactive"
                  checked={values.isActive}
                  onClick={() => setFieldValue("isActive", !values.isActive)}
                />
              </Form.Group>

              <FormGroup className="col-md-12 text-center btn-page">
                <Button
                  disabled={isLoading}
                  variant="primary btn-rounded"
                  type="submit"
                >
                  Add Social
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
