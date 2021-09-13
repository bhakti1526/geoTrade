import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "React-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const id = () => {
  return (
    <WrapForm title="add emails">
      <Form>
        <FormGroup className="col-md-12">
          <FormLabel> Email Template Name </FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-12">
          <div className="summernote">
            <Editor />
          </div>
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Email Template
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default id;
