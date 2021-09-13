import React from "react";
import {
  Form,
  FormLabel,
  FormCheck,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const id = () => {
  return (
    <WrapForm title="update package">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Username</FormLabel>
          <FormControl
            type="text"
            className="form-control"
            value="temp user 1"
            disabled
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Email</FormLabel>
          <FormControl
            type="text"
            className="form-control"
            value="temp@mail.com"
            disabled
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Package</FormLabel>
          <FormControl
            type="text"
            className="form-control"
            value="premium"
            disabled
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Duration</FormLabel>
          <FormControl
            type="text"
            className="form-control"
            value="28 day"
            disabled
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-3">
          <FormLabel> Status</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Update Package
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default id;
