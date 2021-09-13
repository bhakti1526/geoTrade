import React from "react";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const update = () => {
  return (
    <WrapForm title="add email forms">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Form Name </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Mail Address</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Status </FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center btn-page">
          <Button variant="primary btn-rounded" type="button">
            Add Email Form
          </Button>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default update;
