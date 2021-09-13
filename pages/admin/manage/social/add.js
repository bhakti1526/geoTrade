import React from "react";
import WrapForm from "../../../../src/components/admin/WrapForm";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";

const add = () => {
  return (
    <WrapForm title="add social">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Social Name</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Icon Class</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Social Link</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-12 text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Social
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default add;
