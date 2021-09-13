import React from "react";
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

const id = () => {
  return (
    <WrapForm title="update email details">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Email Name </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Email Address</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Email Password </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-6">
          <FormLabel> Outgoing Server</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-6">
          <FormLabel> Outgoing Port </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-12 col-lg-12">
          <FormCheck type="checkbox" label="status (active or inactive)" />

          <FormCheck type="checkbox" label="ssl (active or inactive)" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center btn-page">
          <Button variant="primary btn-rounded" type="button">
            Add Email Details
          </Button>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default id;
