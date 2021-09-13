import React from "react";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const add = () => {
  return (
    <WrapForm title="update country">
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
