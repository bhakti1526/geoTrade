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
    { value: "kg", label: "kg" },
    { value: "cm", label: "cm" },
    { value: "ton", label: "ton" },
  ];

  const [selectOption1, setSelectOption1] = useState(null);
  const options1 = [{ value: "Ambuja Cements", label: "Ambuja Cements" }];

  const [selectOption2, setSelectOption2] = useState(null);
  const options2 = [
    { value: "Mining", label: "Mining" },
    { value: "Traders & Suppliers", label: "Traders & Suppliers" },
  ];

  const [selectOption3, setSelectOption3] = useState(null);
  const options3 = [{ value: "Sand & Gravel", label: "Sand & Gravel" }];

  const [selectOption4, setSelectOption4] = useState(null);
  const options4 = [{ value: " BlackTrap ", label: " BlackTrap " }];

  return (
    <WrapForm title="update post">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Product Name</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Post Image</FormLabel>
          <FormControl type="file" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-12">
          <FormLabel> Post Description </FormLabel>
          <div className="summernote">
            <Editor />
          </div>
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Price</FormLabel>
          <FormControl type="text" className="form-control" placeholder="" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Choose Unit</FormLabel>
          <Select
            placeholder=""
            className=""
            defaultValue={selectOption}
            onChange={setSelectOption}
            options={options}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Choose Brand</FormLabel>
          <Select
            placeholder=""
            className=""
            defaultValue={selectOption1}
            onChange={setSelectOption1}
            options={options1}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Choose Seller Type</FormLabel>
          <Select
            placeholder=""
            className=""
            defaultValue={selectOption2}
            onChange={setSelectOption2}
            options={options2}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Parent Group</FormLabel>
          <Select
            placeholder=""
            className=""
            defaultValue={selectOption3}
            onChange={setSelectOption3}
            options={options3}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Parent Category</FormLabel>
          <Select
            placeholder=""
            className=""
            defaultValue={selectOption4}
            onChange={setSelectOption4}
            options={options4}
          />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-3">
          <FormLabel> Admin Approved</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-3">
          <FormLabel> Status</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12  text-center">
          <div className="btn-page">
            <Button variant="primary btn-rounded" type="button">
              Update Post
            </Button>
          </div>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default id;
