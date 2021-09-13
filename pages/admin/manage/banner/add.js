import React from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const NewPage = () => {
  return (
    <WrapForm title="new banner">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Banner Name </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Banner Image</FormLabel>
          <FormControl type="file" className="form-control" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Redirect Url</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Dispaly On Home</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
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
    </WrapForm>
  );
};

export default NewPage;
