import React from "react";
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

const id = () => {
  return (
    <WrapForm>
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Package Name</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Package Price</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Package Image</FormLabel>
          <FormControl type="file" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Tax</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Sell Cost</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Note</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-12 col-lg-12">
          <FormLabel> &nbsp; </FormLabel>
          <div className="summernote">
            <Editor />
          </div>
        </FormGroup>

        <div className="col-md-12">
          <div className="row">
            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Is Lead Available</FormLabel>
              <FormCheck type="checkbox" label="yes or no" />
            </FormGroup>

            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Lead Count</FormLabel>
              <FormControl
                type="text"
                className="form-control"
                placeholder=""
              />
            </FormGroup>
          </div>

          <div className="row">
            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Is Post Available</FormLabel>
              <FormCheck type="checkbox" label="yes or no" />
            </FormGroup>

            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Post Count</FormLabel>
              <FormControl
                type="text"
                className="form-control"
                placeholder=""
              />
            </FormGroup>
          </div>

          <div className="row">
            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Can Add Brand</FormLabel>
              <FormCheck type="checkbox" label="yes or no" />
            </FormGroup>

            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Brand Availablity</FormLabel>
              <FormControl
                type="text"
                className="form-control"
                placeholder=""
              />
            </FormGroup>
          </div>

          <div className="row">
            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Category Priority</FormLabel>
              <FormCheck type="checkbox" label="yes or no" />
            </FormGroup>

            <FormGroup className="col-md-6 col-lg-4">
              <FormLabel> Category Availablityy</FormLabel>
              <FormControl
                type="text"
                className="form-control"
                placeholder=""
              />
            </FormGroup>
          </div>
        </div>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Package Duration</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> View Contact Feture</FormLabel>
          <FormCheck type="checkbox" label="yes or no" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> View Social Sharing Feture</FormLabel>
          <FormCheck type="checkbox" label="yes or no" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Package
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default id;
