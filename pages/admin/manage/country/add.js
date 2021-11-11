import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik } from "formik";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().strict(),
  countryTelCode: Yup.string().required(),
  countryShortCode: Yup.string().required(),
});

const initValue = {
  name: "",
  countryTelCode: "",
  countryShortCode: "",
};

const add = () => {
  const { isLoading, postData, response } = usePostAxios(`/addCountry`);

  const { push } = useRouter();

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/manage/country/");
  };

  return (
    <WrapForm title="add country">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initValue}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, touched, values, errors }) => {
          return (
            <>
              <Form
                className="row"
                onSubmit={handleSubmit}
                onChange={handleChange}
              >
                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Country Name</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=" "
                    name="name"
                    value={values.name}
                    isInvalid={!!touched.name && !!errors.name}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Country Code</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=" "
                    name="countryShortCode"
                    value={values.countryShortCode}
                    isInvalid={
                      !!touched.countryShortCode && !!errors.countryShortCode
                    }
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Country tel code</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="countryTelCode"
                    value={values.countryTelCode}
                    isInvalid={
                      !!touched.countryTelCode && !!errors.countryTelCode
                    }
                  />
                </FormGroup>

                <FormGroup className="col-md-12 btn-page text-center">
                  <Button disabled={isLoading} variant="primary" type="submit">
                    Add Country
                  </Button>
                </FormGroup>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default add;
