import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  shortName: Yup.string().required(),
});

const add = () => {
  const [initSchema, setInitSchema] = useState({
    _id: "",
    name: "",
    shortName: "",
  });

  const {
    push,
    query: { id },
  } = useRouter();

  const { isLoading, postData } = usePostAxios(`/updateUnit/${id}`);

  const { response: res } = useFetchAxios(`/getUnits?id=${id}`);

  useEffect(() => {
    setInitSchema({
      _id: res?._id,
      name: res?.name,
      shortName: res?.shortName,
    });
  }, [res]);

  const handleSubmit = async (val) => {
    await postData({ ...val, _id: initSchema._id });
    push("/admin/manage/unit");
  };

  return (
    <WrapForm title="update unit">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <>
              <Form
                className="row"
                onSubmit={handleSubmit}
                onChange={handleChange}
              >
                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Unit Name </FormLabel>
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
                  <FormLabel> Unit Shortname </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=" "
                    name="shortName"
                    value={values.shortName}
                    isInvalid={!!touched.shortName && !!errors.shortName}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 btn-page text-center">
                  <Button variant="primary btn-rounded" type="submit">
                    Add Unit
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
