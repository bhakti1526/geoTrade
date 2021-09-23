import React, { useEffect, useState } from "react";
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
import AppLoader from "../.../../../../../src/components/admin/AppLoader";

const validationSchema = Yup.object().shape({
  country: Yup.string().required(),
  name: Yup.string().required(),
  shortStateName: Yup.string().required(),
});

const update = () => {
  const [initSchema, setInitSchema] = useState({
    _id: "",
    country: "",
    name: "",
    shortStateName: "",
  });

  const [countryList, setCountryList] = useState([]);

  const { response, isLoading } = useFetchAxios(`/getCountry`);

  const { isLoading: isLoad, postData } = usePostAxios(`/updateState/${id}`);

  const {
    query: { id },
  } = useRouter();

  const { response: res, isLoading: stateLoad } = useFetchAxios(
    `/getState?id=${id}`
  );

  const { push } = useRouter();

  useEffect(() => {
    setCountryList(response);
  }, [response]);

  useEffect(() => {
    console.log(res);
    setInitSchema({
      _id: res?._id,
      name: res?.name,
      shortStateName: res?.shortStateName,
      country: res?.country?._id,
    });
  }, [res]);

  if (isLoading === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;

  const handleSubmite = async (val) => {
    await postData({ ...val, _id: initSchema._id });
    push("/admin/manage/state");
  };

  return (
    <WrapForm title="add state">
      <Formik
        onSubmit={handleSubmite}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, errors, values, touched }) => {
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
                  as="select"
                  value={values.country}
                  isInvalid={!!touched.country && !!errors.country}
                >
                  <option>select</option>
                  {countryList.map((x) => (
                    <option key={x._id} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> State Name</FormLabel>
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
                <FormLabel> state short code</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=" "
                  name="shortStateName"
                  value={values.shortStateName}
                  isInvalid={
                    !!touched.shortStateName && !!errors.shortStateName
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-12  text-center btn-page">
                <Button
                  disabled={isLoad}
                  variant="primary btn-rounded"
                  type="submit"
                >
                  Add State
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default update;
