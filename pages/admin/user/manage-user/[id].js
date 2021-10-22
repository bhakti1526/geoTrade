import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";
import WrapForm from "../../../../src/components/admin/WrapForm";
import * as Yup from "yup";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const initSchema = {
  packageId: "",
};

const validationSchema = Yup.object().shape({
  packageId: Yup.string().required(),
});

const Update = () => {
  const {
    query: { id },
    push,
  } = useRouter();

  const { isLoading, response } = useFetchAxios(`/getUser?id=${id}`);
  const { isLoading: packageLoad, response: packageRes } =
    useFetchAxios("/api/payment");

  const { postData } = usePostAxios("/api/payment/seller");

  if (isLoading === true) return <AppLoader />;

  if (packageLoad === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    await postData({ packageId: val.packageId, userId: id });
    push("/admin/user/manage-user");
  };

  return (
    <WrapForm title={`manage ${response?.firstName} package`}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, touched, errors }) => {
          return (
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <Row>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Packages</Form.Label>
                    <Form.Control
                      isInvalid={!!touched.packageId && !!errors.packageId}
                      name="packageId"
                      as="select"
                    >
                      <option>select</option>
                      {packageRes &&
                        packageRes.map((x) => (
                          <option value={x._id}>{x.name}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit">update</Button>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default Update;
