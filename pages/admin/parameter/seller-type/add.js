import React, { useState } from "react";
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
  sellerTypeName: "",
  sellerTypeImg: "",
  isActive: true,
};

const add = () => {
  const { push } = useRouter();

  const [img, setImg] = useState(null);

  const { isLoading, postData } = usePostAxios("/addSellerType");

  const validationSchema = Yup.object().shape({
    sellerTypeName: Yup.string().required(),
    sellerTypeImg: Yup.mixed()
      .required("A file is required")
      .test("fileFormat", "image only", () => {
        if (img === null || img === undefined) return false;
        return img.type === "image/png"
          ? true
          : img.type === "image/jpeg"
          ? true
          : false;
      }),
    isActive: Yup.bool().oneOf([true, false]),
  });

  const handleSubmite = async (val) => {
    const data = new FormData();
    data.append("sellerTypeName", val.sellerTypeName);
    data.append("sellerTypeImg", img);
    data.append("isActive", val.isActive);

    await postData(data);
    push("/admin/parameter/seller-type");
  };

  return (
    <WrapForm title="add seller type">
      <Formik
        initialValues={initSchema}
        validationSchema={validationSchema}
        onSubmit={handleSubmite}
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          errors,
          values,
          setFieldValue,
        }) => {
          return (
            <Form
              className="row"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Seller Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="sellerTypeName"
                  isInvalid={
                    !!touched.sellerTypeName && !!errors.sellerTypeName
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Seller Type Image</FormLabel>
                <FormControl
                  type="file"
                  name="sellerTypeImg"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                  isInvalid={!!touched.sellerTypeImg && !!errors.sellerTypeImg}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Status</FormLabel>
                <FormCheck
                  type="checkbox"
                  label="active or inactive"
                  checked={values.isActive}
                  onClick={() => setFieldValue("isActive", !values.isActive)}
                />
              </FormGroup>

              <FormGroup className="col-md-12 btn-page text-center">
                <Button
                  disabled={isLoading}
                  variant="primary btn-rounded"
                  type="submit"
                >
                  Add Seller Type
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
