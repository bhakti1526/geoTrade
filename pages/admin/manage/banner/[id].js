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
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";

const id = () => {
  const [img, setImg] = useState(null);

  const [initSchema, setInitSchema] = useState({
    name: "",
    img: "",
    redirectUrl: "",
    isDisplay: true,
    isRedirect: false,
  });

  const {
    push,
    query: { id },
  } = useRouter();

  const { response: bannerRes, isLoading: bannerLoad } = useFetchAxios(
    `/getBanner?id=${id}`
  );

  useEffect(() => {
    if (bannerRes) {
      setInitSchema({
        _id: bannerRes._id,
        name: bannerRes.name,
        img: bannerRes.img,
        redirectUrl: bannerRes.redirectUrl,
        isDisplay: bannerRes.isDisplay,
        isRedirect: bannerRes.isRedirect,
      });
    }
  }, [bannerRes]);

  const regMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const validationSchema = Yup.object().shape({
    img: Yup.string().required("A image is required"),
    name: Yup.string().required("banner name is required"),
    redirectUrl: Yup.string().matches(
      regMatch,
      "Website should be a valid URL"
    ),
    isDisplay: Yup.bool().oneOf([true, false]),
    isRedirect: Yup.bool().oneOf([true, false]),
  });

  const handleSubmit = async (val) => {
    if (img !== null && img !== undefined) {
      const formData = new FormData();
      formData.append("img", img);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
        .then((res) => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/updateBanner/${id}`, {
              ...val,
              img: res.data.data,
            })
            .then((res) => {
              push("/admin/manage/banner/");
            });
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/updateBanner/${id}`, {
          ...val,
        })
        .then((res) => {
          push("/admin/manage/banner/");
        });
    }
  };

  if (bannerLoad === true) return <AppLoader />;

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
                <FormLabel> Banner Image</FormLabel>
                <FormControl
                  name="img"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setImg(e.target.files[0])}
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

export default id;
