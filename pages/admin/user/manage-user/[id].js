import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
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
  const [selectOption, setSelectOption] = useState(null);
  const options = [
    { value: "India", label: "India" },
    { value: "Canade", label: "Canade" },
    { value: "USA", label: "USA" },
  ];

  const [selectOption1, setSelectOption1] = useState(null);
  const options1 = [{ value: "Gujarat", label: "Gujarat" }];

  const [selectOption2, setSelectOption2] = useState(null);
  const options2 = [
    { value: "Vadodara", label: "Vadodara" },
    { value: "Surat", label: "Surat" },
  ];

  const [selectOption3, setSelectOption3] = useState(null);
  const options3 = [
    { value: "mining", label: "mining" },
    { value: "trade & suppliers", label: "trade & suppliers" },
    { value: "menufacture", label: "menufacture" },
    { value: "service provider", label: "service provider" },
  ];

  return (
    <WrapForm title="update user">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Username</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Email Id</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Phone Number</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Country</FormLabel>
          <Select
            placeholder="Country"
            className=""
            defaultValue={selectOption}
            onChange={setSelectOption}
            options={options}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> State</FormLabel>
          <Select
            placeholder="State"
            className=""
            defaultValue={selectOption1}
            onChange={setSelectOption1}
            options={options1}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> City</FormLabel>
          <Select
            placeholder="City"
            className=""
            defaultValue={selectOption2}
            onChange={setSelectOption2}
            options={options2}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Seller Type</FormLabel>
          <Select
            placeholder="City"
            className=""
            defaultValue={selectOption3}
            onChange={setSelectOption3}
            options={options3}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Admin Approved</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Status</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Update User
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default id;
