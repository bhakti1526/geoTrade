import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormLabel,
  FormCheck,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const validationSchema = {
  pagrentGroup: Yup.string().required(),
  parentCategory: Yup.string().required(),
};

const id = () => {
  return (
    <WrapForm title="update brand">
      <Formik>
        {() => {
          return (
            <Form className="row">
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Brand Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=""
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Brand Image</FormLabel>
                <FormControl
                  type="file"
                  className="form-control"
                  placeholder=""
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-12">
                <FormLabel> &nbsp; </FormLabel>
                <div className="summernote">
                  <Editor />
                </div>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel> Status</FormLabel>
                <FormCheck type="checkbox" label="active or inactive" />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel> Admin Approved</FormLabel>
                <FormCheck type="checkbox" label="active or inactive" />
              </FormGroup>

              <FormGroup className="col-md-12  text-center">
                <div className="btn-page">
                  <Button variant="primary btn-rounded" type="submit">
                    Update Brand
                  </Button>
                </div>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default id;
