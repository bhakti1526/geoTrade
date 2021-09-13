import React, { useState } from "react";
import Select from "react-select";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "React-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const add = () => {
  const [selectOption, setSelectOption] = useState(null);
  const options = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
  ];

  return (
    <WrapForm title="add state">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Choose Country</FormLabel>
          <Select
            defaultValue={selectOption}
            onChange={setSelectOption}
            options={options}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> State Name</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> State Shortcode</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-12  text-center btn-page">
          <Button variant="primary btn-rounded" type="button">
            Add State
          </Button>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default add;
