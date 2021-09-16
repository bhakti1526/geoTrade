import React from "react";
import * as Yup from "yup";
import {
  Form,
  FormGroup,
  FormLabel,
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
    <WrapForm>
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Menu Type </FormLabel>
          <FormControl
            type="text"
            className="form-control"
            placeholder="choosee menu type"
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Menu Link </FormLabel>
          <FormControl
            type="text"
            className="form-control"
            value="/setup/user"
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Page Title </FormLabel>
          <FormControl
            type="text"
            className="form-control"
            value="admin user"
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Menu Icons Class</FormLabel>
          <FormControl
            type="text"
            className="form-control"
            value="fas fa-home"
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Menu Index </FormLabel>
          <FormControl type="text" className="form-control" placeholder="2" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Menu
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default add;
