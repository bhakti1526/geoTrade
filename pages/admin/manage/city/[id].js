import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  state: Yup.string().required(),
  country: Yup.string().required(),
  shortCityCode: Yup.string().required(),
});

const update = () => {
  const [initValue, setInitValue] = useState({
    _id: "",
    name: "",
    state: "",
    country: "",
    shortCityCode: "",
    isActive: true,
  });

  const {
    push,
    query: { id },
  } = useRouter();

  const { isLoading: cityLoad, response: cityRes } = useFetchAxios(
    `/getCity?id=${id}`
  );

  const { postData } = usePostAxios(`/updateCity/${id}`);

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

  useEffect(() => {
    setInitValue({
      _id: cityRes?._id,
      name: cityRes?.name,
      state: cityRes?.state?._id,
      country: cityRes?.country?._id,
      shortCityCode: cityRes?.shortCityCode,
      isActive: true,
    });
  }, [cityRes]);

  const handleSubmit = async (val) => {
    await postData({ ...val, _id: initValue._id });
    push("/admin/manage/city");
  };

  if (cityLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;
  if (countryLoad === true) return <AppLoader />;

  return (
    <WrapForm title="add city">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initValue}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          touched,
          errors,
        }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              onChange={handleChange}
              className="row"
            >
              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel> Choose Country</FormLabel>
                <Form.Control
                  name="country"
                  as="select"
                  value={values.country}
                  isInvalid={!!touched.country && !!errors.country}
                >
                  <option>option</option>
                  {countryList.map((x) => (
                    <option value={x._id}>{x.name}</option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel name="state"> Choose State</FormLabel>
                <Form.Control
                  name="state"
                  as="select"
                  value={values.state}
                  isInvalid={!!touched.state && !!errors.state}
                >
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
                  value={values.name}
                  isInvalid={!!touched.name && !!errors.name}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-3">
                <FormLabel> City Shortcode</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=" "
                  name="shortCityCode"
                  value={values.shortCityCode}
                  isInvalid={!!touched.shortCityCode && !!errors.shortCityCode}
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

              <FormGroup className="col-md-12 btn-page text-center">
                <Button variant="primary btn-rounded" type="submit">
                  Add City
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default update;
