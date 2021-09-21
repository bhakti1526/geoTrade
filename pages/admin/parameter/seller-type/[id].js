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
import { imgPost } from "../../../../component/hooks/imgPost";

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
    let url;

    if (img !== null && img !== undefined) {
      url = await imgPost(img);
    }

    console.log(url);

    // await postData(val);
    // push("/admin/parameter/seller-type");
  };

  useEffect(() => {
    setInitSchema({
      _id: sellerResData?._id,
      sellerTypeName: sellerResData?.sellerTypeName,
      sellerTypeImg: sellerResData?.sellerTypeImg,
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
                <FormLabel> Seller Type Image</FormLabel>
                <FormControl
                  type="file"
                  name="sellerTypeImg"
                  className="form-control"
                  accept="image/*"
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
