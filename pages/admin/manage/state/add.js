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
  country: Yup.string().required(),
  name: Yup.string().required(),
  shortStateName: Yup.string().required(),
});

const initSchema = {
  country: "",
  name: "",
  shortStateName: "",
};

const add = () => {
  const [countryList, setCountryList] = useState([]);

  const { response, isLoading } = useFetchAxios(`/getCountry`);

  useEffect(() => {
    setCountryList(response?.coun);
  }, [response]);

  if (isLoading === true) return <AppLoader />;

  const handleSubmite = (val) => console.log(val);

  return (
    <WrapForm title="add state">
      <Formik
        onSubmit={handleSubmite}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, errors, values, touched }) => {
          return (
            <Form
              className="row"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Choose Country</FormLabel>
                <Form.Control
                  name="country"
                  as="select"
                  isInvalid={!!touched.country && !!errors.country}
                >
                  <option>select</option>
                  {countryList.map((x) => (
                    <option key={x._id} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> State Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=" "
                  name="name"
                  isInvalid={!!touched.name && !!errors.name}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> state short code</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=" "
                  name="shortStateName"
                  isInvalid={
                    !!touched.shortStateName && !!errors.shortStateName
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-12  text-center btn-page">
                <Button variant="primary btn-rounded" type="submit">
                  Add State
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
