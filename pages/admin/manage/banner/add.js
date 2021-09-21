import React, { useState, useEffect } from "react";
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

import WrapForm from "../../../../src/components/admin/WrapForm";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const initSchema = {
  name: "",
  img: "",
  redirectUrl: "",
  isDisplay: false,
  isRedirect: false,
};

const validationSchema = Yup.object().shape({
  img: Yup.string().required("banner image is required"),
  name: Yup.string().required("banner name is required"),
  redirectUrl: Yup.string(),
  isDisplay: Yup.bool().oneOf([true, false]),
  isRedirect: Yup.bool().oneOf([true, false]),
});

const add = () => {
  const [image, setImage] = useState(null);

  const { push } = useRouter();

  const { isLoading, postData, response } = usePostAxios("/addBanner");

  const handleSubmit = async (val) => {
    const data = new FormData();
    data.append("img", image);
    let imgUrl;
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img`, data)
      .then((res) => {
        imgUrl = res?.data?.data?.img || "";
      })
      .catch((err) => {});
    await postData({ ...val, img: imgUrl });
    push("/admin/manage/");
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);

  return (
    <WrapForm title="add banner">
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
                  onChange={handleImageChange}
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
                <Button
                  disabled={isLoading}
                  variant="primary btn-rounded"
                  type="submit"
                >
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

export default add;
