import React from "react";
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
  sellername: Yup.string().required(),
  img: Yup.string().required(),
  link: Yup.string().required(),
};

const add = () => {
  return (
    <WrapForm title="add seller type">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Seller Name</FormLabel>
          <FormControl
            type="text"
            className="form-control"
            placeholder="Traders and Suppliers"
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Seller Type Image</FormLabel>
          <FormControl type="file" className="form-control" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Seller Link</FormLabel>
          <FormControl
            type="text"
            className="form-control"
            placeholder="traders-and-suppliers"
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Status</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Seller Type
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default add;
