import React, { useState, useEffect } from "react";
import {
  Form,
  FormLabel,
  FormCheck,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import WrapForm from "../../../../src/components/admin/WrapForm";
import AppLoader from "../../../../src/components/admin/AppLoader";

const id = () => {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const { isLoading: countryLoad, response: countryRes } =
    useFetchAxios("/getCountry");
  const { isLoading: cityLoad, response: cityRes } = useFetchAxios("/getCity");
  const { isLoading: stateLoad, response: stateRes } =
    useFetchAxios("/getState");

  useEffect(() => {
    setCountryList(countryRes);
  }, [countryRes]);

  useEffect(() => {
    setStateList(stateRes);
  }, [stateRes]);

  useEffect(() => {
    setCityList(cityRes);
  }, [cityRes]);

  if (countryLoad === true) return <AppLoader />;
  if (cityLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;

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
          <Form.Control as="select">
            <option>option</option>
            {countryList.map((x) => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> State</FormLabel>
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> City</FormLabel>
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Seller Type</FormLabel>
        </FormGroup>

        <FormGroup className="col-md-6 col-lg-4">
          <FormLabel> Status</FormLabel>
          <FormCheck type="checkbox" label="active or inactive" />
        </FormGroup>

        <FormGroup className="col-md-12 btn-page text-center">
          <Button variant="primary btn-rounded" type="button">
            Update User
          </Button>
        </FormGroup>
      </Form>
    </WrapForm>
  );
};

export default id;
