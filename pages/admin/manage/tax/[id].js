import React, { useState } from "react";
import Select from "react-select";
import {
  FormLabel,
  FormGroup,
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

  return (
    <WrapForm title="update tax">
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
          <FormLabel> Tax</FormLabel>
          <FormControl type="text" className="form-control" placeholder=" " />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Status</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12 text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Update Tax
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default update;
