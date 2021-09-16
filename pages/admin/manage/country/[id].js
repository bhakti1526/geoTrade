import React, { useState, useEffect } from "react";
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
import useFetchAxios from "../../../../component/hooks/useFetchAxios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  countryTelCode: Yup.string().required(),
  countryShortCode: Yup.string().required(),
});

const add = () => {
  const [initValue, setInitValue] = useState({
    _id: "",
    name: "",
    countryTelCode: "",
    countryShortCode: "",
  });

  const {
    push,
    query: { id },
  } = useRouter();

  const { response: res } = useFetchAxios(`/getCountry?id=${id}`);

  const { isLoading, postData, response } = usePostAxios(
    `/updateCountry/${id}`
  );

  const handleSubmit = async (val) => {
    await postData({ ...val, _id: initValue._id });
    push("/admin/manage/country/");
  };

  useEffect(() => {
    setInitValue({
      _id: res?.coun?._id,
      name: res?.coun?.name,
      countryTelCode: res?.coun?.countryTelCode,
      countryShortCode: res?.coun?.countryShortCode,
    });
  }, [res]);

  return (
    <WrapForm title="add country">
      <Formik
        enableReinitialize
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
                  <Button
                    disabled={isLoading}
                    variant="primary btn-rounded"
                    type="submit"
                  >
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
