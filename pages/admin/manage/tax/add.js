import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import WrapForm from "../../../../src/components/admin/WrapForm";
import AppLoader from "../.../../../../../src/components/admin/AppLoader";

const initSchema = {
  country: "",
  taxValue: "",
  isActive: true,
};

const validationSchema = Yup.object().shape({
  country: Yup.string().required(),
  taxValue: Yup.number().required().min(1).max(100),
  isActive: Yup.bool().oneOf([true, false]),
});

const add = () => {
  const { push } = useRouter();

  const [countryList, setCountryList] = useState([]);

  const { isLoading, response: countryRes } = useFetchAxios("/getCountry");

  const { postData, isLoading: isLoad } = usePostAxios("/addTax");

  useEffect(() => {
    setCountryList(countryRes);
  }, [countryRes]);

  if (isLoading === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    await postData(val);
    push("/admin/manage/tax");
  };

  return (
    <WrapForm title="add tax">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
          setFieldValue,
        }) => {
          return (
            <Form
              className="row"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Choose Country</FormLabel>
                <Form.Control
                  name="country"
                  isInvalid={!!touched.country && !!errors.country}
                  as="select"
                >
                  <option>select...</option>
                  {countryList.map((x) => (
                    <option key={x._id} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Tax</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  name="taxValue"
                  placeholder=" "
                  isInvalid={!!touched.taxValue && !!errors.taxValue}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Status</FormLabel>
                <FormCheck
                  type="checkbox"
                  value={values.isActive}
                  name="isActive"
                  onClick={() => setFieldValue("isActive", !values.isActive)}
                  label="active or inactive"
                />
              </FormGroup>

              <FormGroup className="col-md-12 text-center tn-page">
                <Button
                  disabled={isLoad}
                  variant="primary btn-rounded"
                  type="submit"
                >
                  Update Tax
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
