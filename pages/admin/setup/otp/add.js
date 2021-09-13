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
    <WrapForm title="add roles">
      <FormGroup className="col-md-6 col-lg-4">
        <FormLabel> Name </FormLabel>
        <FormControl
          type="text"
          className="form-control"
          value="login rate limit"
        />
      </FormGroup>

      <FormGroup className="col-md-6 col-lg-4">
        <FormLabel> Limit Time (Minit) </FormLabel>
        <FormControl type="text" className="form-control" value="5" />
      </FormGroup>

      <FormGroup className="col-md-12 btn-page text-center">
        <Button variant="primary btn-rounded" type="button">
          Update Otp
        </Button>
      </FormGroup>
    </WrapForm>
  );
};

export default add;
