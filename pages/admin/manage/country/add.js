import React from "react";
import * as Yup from "yup";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const validationSchema = {
  img: Yup.string().required(),
  name: Yup.string().required(),
  indexNo: Yup.number().required(),
  isDisplay: Yup.bool().oneOf([true]).required(),
  isRedirect: Yup.bool().oneOf([true]).required(),
  redirectUrl: Yup.string().required(),
};

const add = () => {
  return (
    <WrapForm title="add country">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Country Name</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Country Code</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Country Shortcode</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Country
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default add;
