import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const validationSchema = {
  banner: Yup.string().required(),
  redirectUrl: Yup.string().required(),
  acceptTerms: Yup.bool().oneOf([true]),
};

const NewPage = () => {
  return (
    <WrapForm title="new banner">
      <Formik>
        {({}) => (
          <Form className="row">
            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Banner Name </FormLabel>
              <FormControl
                name="banner"
                type="text"
                className="form-control"
                placeholder=""
              />
            </FormGroup>

            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Banner Image</FormLabel>
              <FormControl type="file" className="form-control" />
            </FormGroup>

            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Redirect Url</FormLabel>
              <FormControl
                name="redirectUrl"
                type="text"
                className="form-control"
                placeholder=""
              />
            </FormGroup>

            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Dispaly On Home</FormLabel>
              <FormCheck
                onChange={(e) => console.log(e.target)}
                type="checkbox"
                label="active or inactive"
              />
            </FormGroup>

            <FormGroup className="col-md-6 custom-checkbox col-lg-4">
              <FormLabel> Is Redirectable</FormLabel>
              <FormCheck type="checkbox" label="is Clickable" />
            </FormGroup>

            <FormGroup className="col-md-12 btn-page  text-center">
              <Button variant="primary btn-rounded" type="button">
                Add Banner
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </WrapForm>
  );
};

export default NewPage;
