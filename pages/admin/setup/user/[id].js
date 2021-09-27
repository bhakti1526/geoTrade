import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Form, Row, Col } from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import AppLoader from "../../../../src/components/admin/AppLoader";

import usePostAxios from "../../../../component/hooks/usePostAxios";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  isActive: Yup.bool().oneOf([true, false]),
  city: Yup.string(),
  country: Yup.string(),
  state: Yup.string(),
});

const id = () => {
  const [initValue, setInitValue] = useState({
    email: "",
    password: "",
    city: "",
    country: "",
    state: "",
    isActive: true,
  });

  const {
    push,
    query: { id },
  } = useRouter();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const { isLoading: userLoad, response: userLoadResponse } = useFetchAxios(
    `/api/auth/admin/user?id=${id}`
  );

  const { isLoading: countryLoad, response: countryResponse } =
    useFetchAxios("/getCountry");
  const { isLoading: stateLoad, response: stateResponse } =
    useFetchAxios("/getState");
  const { isLoading: cityLoad, response: cityResponse } =
    useFetchAxios("/getCity");

  const { postData } = usePostAxios("/api/auth/admin/user");

  useEffect(() => {
    if (userLoadResponse) {
      console.log(userLoadResponse);
      const { locationRights, locationId } = userLoadResponse;

      let city;
      let country;
      let state;

      if (locationRights === "CITY") {
        city = locationId;
      }
      if (locationRights === "COUNTRY") {
        country = locationId;
      }
      if (locationRights === "STATE") {
        state = locationId;
      }

      setInitValue({
        email: userLoadResponse.email,
        password: userLoadResponse.password,
        city,
        country,
        state,
        isActive: userLoadResponse.isActive,
      });
    }
  }, [userLoadResponse]);

  useEffect(() => {
    setCountryList(countryResponse);
  }, [countryResponse]);

  useEffect(() => {
    setStateList(stateResponse);
  }, [stateResponse]);

  useEffect(() => {
    setCityList(cityResponse);
  }, [cityResponse]);

  const handleSubmit = async (val) => {
    const data = {
      email: val.email,
      password: val.password,
      city: val.city === "select" ? "" : val.city,
      country: val.country === "select" ? "" : val.country,
      state: val.state === "select" ? "" : val.state,
      isActive: val.isActive,
    };

    await postData(data);
    push("/admin/setup/user");
  };

  if (userLoad === true) return <AppLoader />;
  if (countryLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;
  if (cityLoad === true) return <AppLoader />;

  return (
    <WrapForm title="add user">
      <Formik
        enableReinitialize
        initialValues={initValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          errors,
          values,
          setFieldValue,
        }) => {
          return (
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Row>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>user email</Form.Label>
                    <Form.Control
                      value={values.email}
                      isInvalid={!!touched.email && !!errors.email}
                      name="email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>user password</Form.Label>
                    <Form.Control
                      value={values.password}
                      isInvalid={!!touched.password && !!errors.password}
                      type="password"
                      name="password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>country List</Form.Label>
                    <Form.Control
                      value={values.country}
                      name="country"
                      as="select"
                    >
                      <option>select</option>
                      {countryList.map((x) => (
                        <option value={x._id}>{x.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>state List</Form.Label>
                    <Form.Control value={values.state} name="state" as="select">
                      <option>select</option>
                      {stateList.map((x) => (
                        <option value={x._id}>{x.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>city List</Form.Label>
                    {console.log(values.city)}
                    <Form.Control value={values.city} name="city" as="select">
                      <option>select</option>
                      {cityList.map((x) => (
                        <option value={x._id}>{x.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label>status</Form.Label>
                <Form.Check
                  checked={!!values.isActive}
                  isInvalid={!!errors.isActive}
                  onClick={() => setFieldValue("isActive", !values.isActive)}
                  label="active or inactive"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isActive}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Button type="submit" className="rounded-pill">
                  add user
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default id;
