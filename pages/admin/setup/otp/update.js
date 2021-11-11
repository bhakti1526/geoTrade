import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
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
  sendingLimit: Yup.number().min(1).required(),
  reSendingLimit: Yup.number().min(1).required(),
});

const add = () => {
  const { push } = useRouter();

  const [initialValues, setInitialValues] = useState({
    sendingLimit: 0,
    reSendingLimit: 0,
  });

  const { isLoading, response } = useFetchAxios("/getOtp");

  const { isLoading: optPostLoad, postData } = usePostAxios(`/updateOtp`);

  useEffect(() => {
    if (response) {
      setInitialValues(response[0]);
    }
  }, [response]);

  if (isLoading === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/setup/otp");
  };

  return (
    <WrapForm title="add roles">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ values, handleChange, touched, errors, handleSubmit }) => {
          return (
            <Form
              className="row"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Name </FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  value="login rate limit"
                  disabled
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> sending time (minutes) </FormLabel>
                <FormControl
                  name="sendingLimit"
                  value={values.sendingLimit}
                  type="text"
                  className="form-control"
                  isInvalid={!!touched.sendingLimit && !!errors.sendingLimit}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> resend Limit ( count )</FormLabel>
                <FormControl
                  name="reSendingLimit"
                  value={values.reSendingLimit}
                  type="text"
                  className="form-control"
                  isInvalid={
                    !!touched.reSendingLimit && !!errors.reSendingLimit
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-12 btn-page text-center">
                <Button variant="primary" type="submit">
                  Update Otp
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
