import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import WrapForm from "../../../../src/components/admin/WrapForm";
import AppLoader from "../../../../src/components/admin/AppLoader";

const initSchema = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  subscripiton: "",
  sellerType: "",
  parentGroup: "",
  country: "",
  state: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  subscripiton: Yup.string().required(),
  sellerType: Yup.string().required(),
  country: Yup.string().required(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  parentGroup: Yup.array().of(Yup.string()).required(),
});

const add = () => {
  const [subscriptiopn, setSubscription] = useState([]);
  const [seller, setSeller] = useState([]);
  const [parentGroup, setParentGroup] = useState([]);

  const { push } = useRouter();

  const { isLoading, postData } = usePostAxios("/api/auth/admin/seller");

  const { response } = useFetchAxios("/getPackage");
  const { response: sellerRes } = useFetchAxios("/getSellerType");
  const { isLoading: parentLoad, response: parentRes } = useFetchAxios(
    "/api/public/parentGroup"
  );

  const { isLoading: countryLoad, response: countryRes } = useFetchAxios(
    "/api/public/country"
  );

  const { isLoading: stateLoad, response: stateRes } =
    useFetchAxios("/api/public/state");

  const { isLoading: cityLoad, response: cityRes } =
    useFetchAxios("/api/public/city");

  useEffect(() => {
    if (response) {
      setSubscription(response);
    }
  }, [response]);

  useEffect(() => {
    if (sellerRes) {
      setSeller(sellerRes);
    }
  }, [sellerRes]);

  useEffect(() => {
    if (parentRes) {
      setParentGroup(parentRes);
    }
  }, [parentRes]);

  if (parentLoad === true) return <AppLoader />;
  if (countryLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;
  if (cityLoad === true) return <AppLoader />;

  const location = { country: countryRes, state: stateRes, city: cityRes };

  const { country, state, city } = location;

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/user/manage-user/");
  };

  return (
    <WrapForm title="add seller">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          const parenCategoryStyle = {
            control: (base, state) => ({
              ...base,

              borderColor: state.isFocused
                ? "#ddd"
                : !errors?.parentGroup
                ? "#ddd"
                : "#f72b50",

              "&:hover": {
                borderColor: state.isFocused
                  ? "#ddd"
                  : !errors?.parentGroup
                  ? "#ddd"
                  : "#f72b50",
              },
            }),
          };

          return (
            <>
              <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Row>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>first name</Form.Label>
                      <Form.Control
                        value={values.firstName}
                        isInvalid={!!touched.firstName && !!errors.firstName}
                        name="firstName"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>last name</Form.Label>
                      <Form.Control
                        value={values.lastName}
                        isInvalid={!!touched.lastName && !!errors.lastName}
                        name="lastName"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>user email</Form.Label>
                      <Form.Control
                        value={values.email}
                        isInvalid={!!touched.email && !!errors.email}
                        name="email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>user password</Form.Label>
                      <Form.Control
                        value={values.password}
                        isInvalid={!!touched.password && !!errors.password}
                        name="password"
                        type="password"
                      />
                    </Form.Group>
                  </Col>

                  <Col md="4">
                    <Form.Group>
                      <Form.Label>user subscription</Form.Label>
                      <Form.Control
                        value={values.subscripiton}
                        isInvalid={
                          !!touched.subscripiton && !!errors.subscripiton
                        }
                        name="subscripiton"
                        as="select"
                      >
                        <option>select</option>
                        {subscriptiopn.map((x) => (
                          <option value={x._id}>{x.name}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Seller Type</Form.Label>
                      <Form.Control
                        value={values.sellerType}
                        isInvalid={!!touched.sellerType && !!errors.sellerType}
                        name="sellerType"
                        as="select"
                      >
                        <option>select</option>
                        {seller.map((x) => (
                          <option value={x._id}>{x.sellerTypeName}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Parent Group</Form.Label>
                      <Select
                        styles={parenCategoryStyle}
                        options={
                          parentGroup &&
                          parentGroup
                            .filter((x) => x.sellerType === values.sellerType)
                            .map((x) => ({
                              value: x._id,
                              label: x.parentGroupName,
                            }))
                        }
                        isMulti
                        onChange={(e) =>
                          setFieldValue(
                            "parentGroup",
                            e.map((x) => x.value)
                          )
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        name="country"
                        isInvalid={!!touched.country && !!errors.country}
                      >
                        <option>select</option>
                        {country.map((x) => (
                          <option value={x._id}>{x.name}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        as="select"
                        name="state"
                        isInvalid={!!touched.state && !!errors.state}
                      >
                        <option>select</option>
                        {state
                          .filter((x) => x.country === values.country)
                          .map((x) => (
                            <option value={x._id}>{x.name}</option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        as="select"
                        name="city"
                        isInvalid={!!touched.city && !!errors.city}
                      >
                        <option>select</option>
                        {city
                          .filter((x) => x.state === values.state)
                          .map((x) => (
                            <option value={x._id}>{x.name}</option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Button disabled={isLoading} type="submit">
                  create seller
                </Button>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
