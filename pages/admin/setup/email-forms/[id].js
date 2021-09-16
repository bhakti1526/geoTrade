import React, { useEffect, useState } from "react";
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
  isActive: Yup.bool().oneOf([true, false]),
});

const update = () => {
  const [initValue, setInitValue] = useState({
    _id: "",
    name: "",
    isActive: false,
  });

  const { postData, response } = usePostAxios("/updateForm");

  const {
    push,
    query: { id },
  } = useRouter();

  const { response: res } = useFetchAxios(`/getForm?id=${id}`);

  useEffect(() => {
    setInitValue({ ...res });
  }, [res]);

  const handleSubmite = async (val) => {
    console.log(val);
    await postData({ ...val, _id: initValue._id });
    push("/admin/setup/email-forms");
  };

  return (
    <WrapForm title="add email forms">
      <Formik
        enableReinitialize
        onSubmit={handleSubmite}
        validationSchema={validationSchema}
        initialValues={initValue}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleChange,
          values,
          touched,
          errors,
        }) => {
          return (
            <>
              <Form
                onSubmit={handleSubmit}
                onChange={handleChange}
                className="row"
              >
                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Form Name </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="name"
                    value={values.name}
                    isInvalid={!!touched.name && !!errors.name}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Status </FormLabel>
                  <FormCheck
                    checked={values.isActive}
                    onClick={() => setFieldValue("isActive", !values.isActive)}
                    type="checkbox"
                    label="active or inactive"
                    isInvalid={!!touched.isActive && !!errors.isActive}
                  />
                </FormGroup>

                <FormGroup className="col-md-12  text-center btn-page">
                  <Button variant="primary btn-rounded" type="submit">
                    Add Email Form
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

export default update;
