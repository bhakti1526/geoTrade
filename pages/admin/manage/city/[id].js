import React, { useState } from "react";
import Select from "react-select";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
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

  return (
    <WrapForm title="update city">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-3">
          <FormLabel> Choose Country</FormLabel>
          <Select
            defaultValue={selectOption}
            onChange={setSelectOption}
            options={options}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-3">
          <FormLabel> Choose State</FormLabel>
          <Select
            defaultValue={selectOption1}
            onChange={setSelectOption1}
            options={options1}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-3">
          <FormLabel> City Name</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-3">
          <FormLabel> City Shortcode</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Add City
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default update;
