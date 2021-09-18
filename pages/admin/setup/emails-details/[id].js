import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  emailAddress: Yup.string().email().required(),
  password: Yup.string().required().min(3).max(12),
  outGoingServer: Yup.string().required(),
  // outGoingServerPort: Yup.number().required(),
  sslTypes: Yup.string().required(),
});

const id = () => {
  const [initialValues, setInitialValues] = useState({
    _id: "",
    name: "",
    emailAddress: "",
    password: "",
    outGoingServer: "",
    sslTypes: "",
    // outGoingServerPort: "",
  });

  const { response, postData, isLoading } = usePostAxios("/updateEmail");

  const {
    push,
    query: { id },
  } = useRouter();

  const { response: res } = useFetchAxios(`/getEmail?id=${id}`);

  useEffect(() => {
    if (id !== "add") {
      setInitialValues({ ...res });
    }
  }, [res]);

  const handleSubmit = async (val) => {
    await postData({ ...val, _id: initialValues._id });
    push(`/admin/setup/emails-details`);
  };

  return (
    <WrapForm title="add email details">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <Form
              className="row"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Email Name </FormLabel>
                <FormControl
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder=""
                  value={values.name}
                  isInvalid={!!touched.name && !!errors.name}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Email Address</FormLabel>
                <FormControl
                  type="text"
                  name="emailAddress"
                  className="form-control"
                  placeholder=""
                  value={values.emailAddress}
                  isInvalid={!!touched.emailAddress && !!errors.emailAddress}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Email Password </FormLabel>
                <FormControl
                  type="text"
                  name="password"
                  className="form-control"
                  placeholder=""
                  value={values.password}
                  isInvalid={!!touched.password && !!errors.password}
                />
              </FormGroup>

              <FormGroup className="col-md-4 col-lg-4">
                <FormLabel> Outgoing Server</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="outGoingServer"
                  value={values.outGoingServer}
                  isInvalid={
                    !!touched.outGoingServer && !!errors.outGoingServer
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-4 col-lg-4">
                <FormLabel> ssl types</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="sslTypes"
                  value={values.sslTypes}
                  isInvalid={!!touched.sslTypes && !!errors.sslTypes}
                />
              </FormGroup>

              {/* <FormGroup className="col-md-4 col-lg-4">
                <FormLabel> Outgoing Port </FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="outGoingServerPort"
                  value={values.outGoingServerPort}
                  isInvalid={
                    !!touched.outGoingServerPort && !!errors.outGoingServerPort
                  }
                />
              </FormGroup> */}

              <FormGroup className="col-md-12  text-center btn-page">
                <Button
                  disabled={isLoading}
                  variant="primary btn-rounded"
                  type="submit"
                >
                  Add Email Details
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default id;
