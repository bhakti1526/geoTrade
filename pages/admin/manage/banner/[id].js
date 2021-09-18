import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";

import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import WrapForm from "../../../../src/components/admin/WrapForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  img: Yup.string().required(),
  redirectUrl: Yup.string(),
  isDisplay: Yup.bool().oneOf([true, false]),
  isRedirect: Yup.bool().oneOf([true, false]),
});

const handleSubmit = (val) => {};

const update = () => {
  const [initSchema, setInitSchema] = useState({
    name: "",
    img: "",
    redirectUrl: "",
    isDisplay: false,
    isRedirect: false,
  });

  const {
    query: { id },
  } = useRouter();

  const { response } = useFetchAxios(`/getbanner?${id}`);
  console.log(response?.allBanner);

  const handleImg = (e, setFieldValue) => {
    const file = e.target.files[0];

    const data = new FormData();

    data.append("img", file);

    try {
      axios.post("http://localhost:4000/api/img", data).then((res) => {
        const imgUrl = res?.data?.data?.img || "";
        setFieldValue("img", imgUrl);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WrapForm title="update banner">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initSchema}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          errors,
          setFieldValue,
          values,
        }) => {
          return (
            <Form
              className="row"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Banner Name </FormLabel>
                <FormControl
                  name="name"
                  type="text"
                  value={values.name}
                  className="form-control"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Banner Image</FormLabel>
                <FormControl
                  name="img"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleImg(e, setFieldValue)}
                  value={values.img}
                  isInvalid={!!errors.img}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.img}
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Redirect Url</FormLabel>
                <FormControl
                  name="redirectUrl"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={values.redirectUrl}
                  isInvalid={!!errors.redirectUrl}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.redirectUrl}
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Dispaly On Home</FormLabel>

                <Form.Check
                  checked={values.isDisplay}
                  name="isDisplay"
                  onPress={() => setFieldValue("isDisplay", !values.isDisplay)}
                  label="active or inactive"
                  isInvalid={!!errors.isDisplay}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isDisplay}
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="col-md-6 custom-checkbox col-lg-4">
                <FormLabel> Is Redirectable</FormLabel>
                <Form.Check
                  checked={!!values.isRedirect}
                  onPress={() =>
                    setFieldValue("isRedirect", !values.isRedirect)
                  }
                  name="isRedirect"
                  type="checkbox"
                  label="is Clickable"
                  isInvalid={!!errors.isRedirect}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isRedirect}
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="col-md-12 btn-page  text-center">
                <Button variant="primary btn-rounded" type="submit">
                  Add Banner
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
