import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";

const initValue = {
  name: "",
  state: "",
  country: "",
  shortCityCode: "",
  isActive: true,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  state: Yup.string().required(),
  country: Yup.string().required(),
  shortCityCode: Yup.string().required(),
});

const city = () => {
  const { postData } = usePostAxios();

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const { isLoading: countryLoad, response: countryRes } =
    useFetchAxios("/getCountry");
  const { isLoading: stateLoad, response: stateRed } =
    useFetchAxios("/getState");

  useEffect(() => {
    setCountryList(countryRes);
  }, [countryRes]);

  useEffect(() => {
    setStateList(stateRed);
  }, [stateRed]);

  const handleSubmit = (val) => {
    console.log(val);
  };

  if (countryLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;

  return (
    <WrapForm title="add city">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initValue}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              onChange={handleChange}
              className="row"
            >
              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel> Choose Country</FormLabel>
                <Form.Control name="country" as="select">
                  <option>option</option>
                  {countryList.map((x) => (
                    <option value={x._id}>{x.name}</option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel name="state"> Choose State</FormLabel>
                <Form.Control name="state" as="select">
                  <option>option </option>
                  {stateList.map((x) => (
                    <option value={x._id}>{x.name}</option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel> City Name</FormLabel>
                <FormControl
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder=" "
                  name="name"
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel> City Shortcode</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=" "
                  name="shortCityCode"
                />
              </FormGroup>

              <Form.Group className="ml-3">
                <Form.Label>status </Form.Label>
                <Form.Check
                  label="active or inactive"
                  checked={values.isActive}
                  onClick={() => setFieldValue("isActive", !values.isActive)}
                />
              </Form.Group>

              <FormGroup className="col-md-12  text-center">
                <div className="btn-page">
                  <Button variant="primary btn-rounded" type="submit">
                    Add City
                  </Button>
                </div>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default city;
