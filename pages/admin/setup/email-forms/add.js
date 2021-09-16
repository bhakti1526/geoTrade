import React from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  isActive: Yup.bool().oneOf([true, false]).required(),
});

const initValue = {
  name: "",
  isActive: false,
};

const add = () => {
  const { postData, response } = usePostAxios("/addForm");

  const { push } = useRouter();

  const handleSubmite = async (val) => {
    await postData(val);
    push("/admin/setup/email-forms");
  };

  return (
    <WrapForm title="add email forms">
      <Formik
        onSubmit={handleSubmite}
        validationSchema={validationSchema}
        initialValues={initValue}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleChange,
          values,
          touched,
          errors,
        }) => {
          return (
            <>
              <Form
                onSubmit={handleSubmit}
                onChange={handleChange}
                className="row"
              >
                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Form Name </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="name"
                    isInvalid={!!touched.name && !!errors.name}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Status </FormLabel>
                  <FormCheck
                    checked={values.isActive}
                    onClick={() => setFieldValue("isActive", !values.isActive)}
                    type="checkbox"
                    label="active or inactive"
                    isInvalid={!!touched.isActive && !!errors.isActive}
                  />
                </FormGroup>

                <FormGroup className="col-md-12  text-center btn-page">
                  <Button variant="primary btn-rounded" type="submit">
                    Add Email Form
                  </Button>
                </FormGroup>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
