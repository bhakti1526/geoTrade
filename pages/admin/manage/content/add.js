import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const add = () => {
  if (typeof window === "undefined") return <></>;

  return (
    <WrapForm title="add content">
      <Form className="row">
        <FormGroup className="col-md-12">
          <FormLabel> Page Name </FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-12">
          <div className="summernote">
            <Editor />
          </div>
        </FormGroup>

        <FormGroup className="col-md-12 col-lg-12">
          <FormCheck type="checkbox" label="make active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Update Page Content
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default add;
