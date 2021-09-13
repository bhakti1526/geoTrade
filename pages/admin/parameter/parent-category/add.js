import React, { useState } from "react";
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

const add = () => {
  const [selectOption, setSelectOption] = useState(null);
  const options = [
    { value: "Traders & Suppliers", label: "Traders & Suppliers" },
    { value: "Manufacturer", label: "Manufacturer" },
  ];

  const [selectOption1, setSelectOption1] = useState(null);
  const options1 = [{ value: "Sand and Gravel", label: "Sand and Gravel" }];

  return (
    <WrapForm title="add parent category">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Seller Name</FormLabel>
          <Select
            placeholder="Manufacturer"
            defaultValue={selectOption}
            onChange={setSelectOption}
            options={options}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Parent Group</FormLabel>
          <Select
            placeholder="Manufacturer"
            defaultValue={selectOption1}
            onChange={setSelectOption1}
            options={options1}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Parent Category Image</FormLabel>
          <FormControl type="file" className="form-control" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Parent Group Title</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Status</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Parent Category
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default add;
