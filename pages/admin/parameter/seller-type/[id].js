import React, { useEffect, useState } from "react";
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
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";
import axios from "axios";

const add = () => {
  const [initSchema, setInitSchema] = useState({
    _id: "",
    sellerTypeName: "",
    sellerTypeImg: "",
    isActive: true,
  });

  const {
    push,
    query: { id },
  } = useRouter();

  const [img, setImg] = useState(null);

  const { isLoading: sellerResLoad, response: sellerResData } = useFetchAxios(
    `/getSellerType?id=${id}`
  );

  const { isLoading, postData } = usePostAxios("/addSellerType");
  const {
    isLoading: isImgLoad,
    postData: postImg,
    response: postImgRes,
  } = usePostAxios("/api/img/upload");

  const validationSchema = Yup.object().shape({
    sellerTypeName: Yup.string().required(),
    sellerTypeImg: Yup.string().required(),
    isActive: Yup.bool().oneOf([true, false]),
  });

  const handleSubmite = async (val) => {
    if (img !== null && img !== undefined) {
      const formData = new FormData();
      formData.append("img", img);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
        .then((res) => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/updateSellerType`, {
              ...val,
              sellerTypeImg: res.data.data,
            })
            .then((res) => {
              push("/admin/parameter/seller-type/");
            });
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/updateSellerType`, {
          ...val,
        })
        .then((res) => {
          push("/admin/parameter/seller-type/");
        });
    }
  };

  useEffect(() => {
    setInitSchema({
      _id: sellerResData?._id,
      sellerTypeName: sellerResData?.sellerTypeName,
      sellerTypeImg: sellerResData?.sellerTypeImg,
      isActive: sellerResData?.isActive,
    });
  }, [sellerResData]);

  if (sellerResLoad === true) return <AppLoader />;

  return (
    <WrapForm title="add seller type">
      <Formik
        enableReinitialize
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
                  value={values.sellerTypeName}
                  isInvalid={
                    !!touched.sellerTypeName && !!errors.sellerTypeName
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel>
                  Seller Type Image
                  <small style={{ color: "blue", textDecoration: "underline" }}>
                    img size : 500 * 500
                  </small>
                </FormLabel>
                <FormControl
                  type="file"
                  name="sellerTypeImg"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                  isInvalid={!!touched.sellerTypeImg && !!errors.sellerTypeImg}
                />
                <small>
                  <a
                    style={{ color: "blue", textDecoration: "underline" }}
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${initSchema.sellerTypeImg}`}
                    target="_blank"
                  >
                    prev image
                  </a>
                </small>
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
                <Button disabled={isLoading} variant="primary" type="submit">
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
