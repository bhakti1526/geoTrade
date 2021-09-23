import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";

const validationSchema = Yup.object().shape({
  sendingLimit: Yup.number().min(1).required(),
  reSendingLimit: Yup.number().min(1).required(),
});

const initialValues = {
  sendingLimit: 0,
  reSendingLimit: 0,
};

const add = () => {
  const { isLoading, response } = useFetchAxios("/getOtp");

  if (isLoading === true) return <AppLoader />;

  const handleSubmit = (val) => console.log(val);

  return (
    <WrapForm title="add roles">
      <Formik
        handleSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ values, handleChange, touched, errors, handleSubmit }) => {
          return (
            <Form
              className="row"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Name </FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  value="login rate limit"
                  disabled
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> sending time (minutes) </FormLabel>
                <FormControl
                  name="sendingLimit"
                  value={values.sendingLimit}
                  type="text"
                  className="form-control"
                  isInvalid={!!touched.sendingLimit && !!errors.sendingLimit}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> resend Limit ( count )</FormLabel>
                <FormControl
                  name="reSendLimit"
                  value={values.reSendingLimit}
                  type="text"
                  className="form-control"
                  isInvalid={
                    !!touched.reSendingLimit && !!errors.reSendingLimit
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-12 btn-page text-center">
                <Button variant="primary btn-rounded" type="submit">
                  Update Otp
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
