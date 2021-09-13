import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const update = () => {
  const [selectOption, setSelectOption] = useState(null);
  const options = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
  ];

  const [selectOption1, setSelectOption1] = useState(null);
  const options1 = [
    { value: "Gujarat", label: "Gujarat" },
    { value: "Delhi", label: "Delhi" },
  ];

  const [selectOption2, setSelectOption2] = useState(null);
  const options2 = [
    { value: "Vadodara", label: "Vadodara" },
    { value: "Surat", label: "Surat" },
  ];

  return (
    <WrapForm title="update offer">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Brand Name</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Brand Image</FormLabel>
          <FormControl type="file" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-12">
          <FormLabel> Offer Description </FormLabel>
          <div className="summernote">
            <Editor />
          </div>
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Start Date</FormLabel>
          <FormControl type="date" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> End Date</FormLabel>
          <FormControl type="date" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Offer Code </FormLabel>
          <FormControl type="text" className="form-control" value="CltPLf" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Offer Terms </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Offer User Count </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel>Country</FormLabel>
          <Select
            placeholder="Choose Country"
            defaultValue={selectOption}
            onChange={setSelectOption}
            options={options}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> State</FormLabel>
          <Select
            placeholder="Choose State"
            defaultValue={selectOption1}
            onChange={setSelectOption1}
            options={options1}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> City</FormLabel>
          <Select
            placeholder="Choose State"
            defaultValue={selectOption1}
            onChange={setSelectOption1}
            options={options1}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Offer Minimum Ammount </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Product Minimum Ammount </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Minimum Offer Ammount</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Offer Percentage </FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Offers
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default update;
