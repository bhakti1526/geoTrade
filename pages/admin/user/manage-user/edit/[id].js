import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import useFetchAxios from "../../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../../src/components/admin/AppLoader";
import WrapForm from "../../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../../component/hooks/usePostAxios";

const id = () => {
  const {
    query: { id },
    push,
  } = useRouter();

  const { isLoading, response } = useFetchAxios(
    `/api/admin/user-info?userId=${id}`
  );

  const { isLoading: countryLoad, response: countryRes } = useFetchAxios(
    "/api/public/country"
  );

  const { isLoading: stateLoad, response: stateRes } =
    useFetchAxios("/api/public/state");

  const { isLoading: cityLoad, response: cityRes } =
    useFetchAxios("/api/public/city");

  const { isLoading: postRes, postData } = usePostAxios(
    `/api/admin/up-user/${id}`
  );

  if (isLoading === true) return <AppLoader />;
  if (countryLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;
  if (cityLoad === true) return <AppLoader />;

  console.log(response);

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/user/manage-user");
  };

  return (
    <WrapForm title={`update ${response.firstName} info`}>
      <Formik initialValues={response} onSubmit={handleSubmit}>
        {({ handleSubmit, handleChange, values }) => {
          return (
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Row>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>first name</Form.Label>
                    <Form.Control value={values.firstName} name="firstName" />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>email address</Form.Label>
                    <Form.Control value={values.email} name="email" />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>mobile no</Form.Label>
                    <Form.Control value={values.mobile} name="mobile" />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>select country</Form.Label>
                    <Form.Control as="select" value={values.country}>
                      <option>select</option>
                      {countryRes.map((x) => {
                        return <option value={x._id}>{x.name}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>select state</Form.Label>
                    <Form.Control as="select" value={values.state}>
                      <option>select</option>
                      {stateRes.map((x) => {
                        return <option value={x._id}>{x.name}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>select city</Form.Label>
                    <Form.Control as="select" value={values.city}>
                      <option>select</option>
                      {cityRes.map((x) => {
                        return <option value={x._id}>{x.name}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button disabled={postRes} type="submit">
                  update
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default id;
