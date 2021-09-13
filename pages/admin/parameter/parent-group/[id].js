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

const update = () => {
  const [selectOption, setSelectOption] = useState(null);
  const options = [
    { value: "Traders & Suppliers", label: "Traders & Suppliers" },
    { value: "Manufacturer", label: "Manufacturer" },
  ];

  return (
    <WrapForm title="add parent group">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Seller Type</FormLabel>
          <Select
            defaultValue={selectOption}
            onChange={setSelectOption}
            options={options}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Parent Group Name</FormLabel>
          <FormControl
            type="text"
            className="form-control"
            placeholder="Traders and Suppliers"
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Parent Group Image</FormLabel>
          <FormControl type="file" className="form-control" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Parent Group Link</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Status</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add Parent Group
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default update;
