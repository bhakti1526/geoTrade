import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import WrapForm from "../../../../src/components/admin/WrapForm";

const initSchema = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  subscripiton: "",
  sellerType: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  subscripiton: Yup.string().required(),
  sellerType: Yup.string().required(),
});

const add = () => {
  const [subscriptiopn, setSubscription] = useState([]);
  const [seller, setSeller] = useState([]);

  const { push } = useRouter();

  const { isLoading, postData } = usePostAxios("/api/auth/admin/seller");

  const { response, error, getData } = useFetchAxios("/getPackage");
  const { response: sellerRes } = useFetchAxios("/getSellerType");

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
        {({ handleSubmit, handleChange, values, errors, touched }) => {
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
                  <Button disabled={isLoading} type="submit">
                    create seller
                  </Button>
                </Row>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
