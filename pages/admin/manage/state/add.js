import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import AppLoader from "../.../../../../../src/components/admin/AppLoader";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";

const validationSchema = Yup.object().shape({
  country: "",
  name: "",
});

const add = () => {
  const [countryList, setCountryList] = useState([]);

  const { error, response, isLoading } = useFetchAxios(`/getCountry`);

  const [selectOption, setSelectOption] = useState(null);
  const options = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
  ];

  useEffect(() => {
    setCountryList(response?.coun);
  }, [response]);

  if (isLoading === true) return <AppLoader />;

  return (
    <WrapForm title="add state">
      <Form className="row">
        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Choose Country</FormLabel>
          <Form.Control as="select">
            {countryList.map((x) => (
              <option value={x._id}>{x.name}</option>
            ))}
          </Form.Control>
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
