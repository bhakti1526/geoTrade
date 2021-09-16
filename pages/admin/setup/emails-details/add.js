import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  emailAddress: Yup.string().email().required(),
  password: Yup.string().required().min(3).max(12),
  outGoingServer: Yup.string().required(),
  outGoingServerPort: Yup.number().required(),
  sslTypes: Yup.string().required(),
});

const initialValues = Yup.object().shape({
  name: "",
  emailAddress: "",
  password: "",
  outGoingServer: "",
  sslTypes: "",
  outGoingServerPort: "",
});

const handleSubmit = (val) => console.log(val);

const id = () => {
  return (
    <WrapForm title="update email details">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <Form
              className="row"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Email Name </FormLabel>
                <FormControl
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder=""
                  value={values.name}
                  isInvalid={!!touched.name && !!errors.name}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Email Address</FormLabel>
                <FormControl
                  type="text"
                  name="emailAddress"
                  className="form-control"
                  placeholder=""
                  value={values.emailAddress}
                  isInvalid={!!touched.emailAddress && !!errors.emailAddress}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Email Password </FormLabel>
                <FormControl
                  type="text"
                  name="password"
                  className="form-control"
                  placeholder=""
                  value={values.password}
                  isInvalid={!!touched.password && !!errors.password}
                />
              </FormGroup>

              <FormGroup className="col-md-4 col-lg-4">
                <FormLabel> Outgoing Server</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="outGoingServer"
                  value={values.outGoingServer}
                  isInvalid={
                    !!touched.outGoingServer && !!errors.outGoingServer
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-4 col-lg-4">
                <FormLabel> Outgoing Port </FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="outGoingServerPort"
                  value={values.outGoingServerPort}
                  isInvalid={
                    !!touched.outGoingServerPort && !!errors.outGoingServerPort
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-4 col-lg-4">
                <FormLabel> Outgoing Port </FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="sslTypes"
                  value={values.sslTypes}
                  isInvalid={!!touched.sslTypes && !!errors.sslTypes}
                />
              </FormGroup>

              <FormGroup className="col-md-4  ">
                <Form.Label>status</Form.Label>
                <FormCheck type="checkbox" label="active or inactive" />
              </FormGroup>

              <FormGroup className="col-md-4 ">
                <Form.Label> ssl </Form.Label>
                <FormCheck type="checkbox" label="active or inactive" />
              </FormGroup>

              <FormGroup className="col-md-12  text-center btn-page">
                <Button variant="primary btn-rounded" type="submit">
                  Add Email Details
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default id;
