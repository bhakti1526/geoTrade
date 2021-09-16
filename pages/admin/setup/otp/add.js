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

const validationSchema = Yup.object().shape({
  sendingLimit: Yup.number().min(1).required(),
  reSendLimit: Yup.number().min(1).required(),
});

const initialValues = {
  sendingLimit: 0,
  reSendLimit: 0,
};

const add = () => {
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
                  value={values.reSendLimit}
                  type="text"
                  className="form-control"
                  isInvalid={!!touched.reSendLimit && !!errors.reSendLimit}
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
