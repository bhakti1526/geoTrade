import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Row, Col, Button } from "react-bootstrap";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import WrapForm from "../../../src/components/admin/WrapForm";
import AppLoader from "../../../src/components/admin/AppLoader";
import usePostAxios from "../../../component/hooks/usePostAxios";

const initSchema = {
  title: "",
  description: "",
  country: "",
  state: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  country: Yup.string().required(),
  state: Yup.string().required(),
  city: Yup.string().required(),
});

const add = () => {
  const { push } = useRouter();
  const { postData } = usePostAxios("/api/user/rfq");

  const { isLoading: countryLoad, response: countryRes } =
    useFetchAxios("/api/other/country");
  const { isLoading: stateLoad, response: stateRes } =
    useFetchAxios("/api/other/state");
  const { isLoading: cityLoad, response: cityRes } =
    useFetchAxios("/api/other/city");

  const handleSubmit = async (val) => {
    await postData(val);
    push("/seller/rfq");
  };

  if (countryLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;
  if (cityLoad === true) return <AppLoader />;

  return (
    <WrapForm title="create rfq">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          setFieldValue,
          touched,
          errors,
        }) => {
          return (
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Rfq Title</Form.Label>
                    <Form.Control
                      name="title"
                      isInvalid={!!touched.title && !!errors.title}
                      value={values.title}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="summernote">
                  <Editor
                    onChange={(e) =>
                      setFieldValue("description", e.target.getContent())
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label> Country</Form.Label>
                    <Form.Control
                      name="country"
                      value={values.country}
                      isInvalid={!!touched.country && !!errors.country}
                      as="select"
                    >
                      <option>selecet</option>
                      {countryRes.map((x) => (
                        <option value={x._id}>{x.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label> State</Form.Label>
                    <Form.Control
                      name="state"
                      isInvalid={!!touched.state && !!errors.state}
                      value={values.state}
                      as="select"
                    >
                      <option>selecet</option>
                      {stateRes.map((x) => (
                        <option value={x._id}>{x.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label> City</Form.Label>
                    <Form.Control
                      name="city"
                      isInvalid={!!touched.city && !!errors.city}
                      value={values.city}
                      as="select"
                    >
                      <option>selecet</option>
                      {cityRes.map((x) => (
                        <option value={x._id}>{x.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button type="submit">submit</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
