import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  isDisplay: true,
  isRedirect: false,
  indexNo: "",
};

const add = () => {
  const [img, setImg] = useState(null);

  const { push } = useRouter();

  const { isLoading, postData, response } = usePostAxios("/addBanner");

  const regMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const validationSchema = Yup.object().shape({
    img: Yup.mixed()
      .required("A file is required")
      .test("fileFormat", "image only", () => {
        if (img === null || img === undefined) return false;
        return img.type === "image/png"
          ? true
          : img.type === "image/jpeg"
          ? true
          : false;
      }),
    name: Yup.string().required("banner name is required"),
    indexNo: Yup.number().required(),
    redirectUrl: Yup.string().matches(
      regMatch,
      "Website should be a valid URL"
    ),
    isDisplay: Yup.bool().oneOf([true, false]),
    isRedirect: Yup.bool().oneOf([true, false]),
  });

  const handleSubmit = async (val) => {
    let formData = new FormData();
    formData.append("name", val.name);
    formData.append("img", img);
    formData.append("isRedirect", val.isRedirect);
    formData.append("redirectUrl", val.redirectUrl || "");
    formData.append("isDisplay", val.isDisplay);
    formData.append("indexNo", val.indexNo);

    await postData(formData);

    push("/admin/manage/banner");
  };

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
                  isInvalid={!!touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel>
                  Banner Image (
                  <small style={{ color: "blue", textDecoration: "underline" }}>
                    image size : 747 x 485
                  </small>
                  )
                </FormLabel>
                <FormControl
                  name="img"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setImg(e.target.files[0])}
                  value={values.img}
                  isInvalid={!!touched.img && !!errors.img}
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

              <Form.Group>
                <Form.Label>show index</Form.Label>
                <Form.Control
                  name="indexNo"
                  type="number"
                  isInvalid={!!touched.indexNo && !!errors.indexNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.indexNo}
                </Form.Control.Feedback>
              </Form.Group>

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
                <Button disabled={isLoading} variant="primary" type="submit">
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
