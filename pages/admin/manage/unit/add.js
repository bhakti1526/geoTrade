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
  shortName: Yup.string().required(),
});

const initSchema = {
  name: "",
  shortName: "",
};

const add = () => {
  const { isLoading, postData } = usePostAxios("/addUnit");
  const { push } = useRouter();

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/manage/unit");
  };

  return (
    <WrapForm title="add unit">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <>
              <Form
                className="row"
                onSubmit={handleSubmit}
                onChange={handleChange}
              >
                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Unit Name </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=" "
                    name="name"
                    isInvalid={!!touched.name && !!errors.name}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Unit Shortname </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=" "
                    name="shortName"
                    isInvalid={!!touched.shortName && !!errors.shortName}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 btn-page text-center">
                  <Button variant="primary" type="submit">
                    Add Unit
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
