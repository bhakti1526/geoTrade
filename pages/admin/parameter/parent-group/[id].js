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
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import axios from "axios";

const update = () => {
  const {
    push,
    query: { id },
  } = useRouter();

  const [initValue, setInitValue] = useState({
    _id: "",
    sellerType: "",
    parentGroupName: "",
    parentGroupImg: "",
    isActive: true,
  });

  const [img, setImg] = useState(null);
  const [sellerTypes, setSellerTypes] = useState([]);

  const { isLoading: sellerLoad, response: sellerRes } =
    useFetchAxios("/getSellerType");

  const { isLoading: sendLoad, postData } = usePostAxios(`/addParentGroup`);

  const { isLoading: parentLoad, response: parentRes } = useFetchAxios(
    `/getParentGroup?id=${id}`
  );

  useEffect(() => {
    console.log(parentRes);
    setInitValue({
      _id: parentRes?._id,
      sellerType: "617bb291fc13ae3f5c000000",
      parentGroupName: parentRes?.parentGroupName,
      parentGroupImg: parentRes?.parentGroupImg,
      isActive: true,
    });
  }, [parentRes]);

  useEffect(() => {
    setSellerTypes(sellerRes);
  }, [sellerRes]);

  if (sellerLoad === true) return <AppLoader />;
  if (parentLoad === true) return <AppLoader />;

  const validationSchema = Yup.object().shape({
    sellerType: Yup.string().required(),
    parentGroupName: Yup.string().required(),
    parentGroupImg: Yup.string().required(),
    isActive: Yup.bool().oneOf([true, false]),
  });

  const handleSubmit = async (val) => {
    if (img !== null && img !== undefined) {
      const formData = new FormData();
      formData.append("img", img);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
        .then((res) => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/updateParentGroup`, {
              ...val,
              parentGroupImg: res.data.data,
            })
            .then((res) => {
              push("/admin/parameter/parent-group");
            });
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/updateParentGroup`, {
          ...val,
        })
        .then((res) => {
          push("/admin/parameter/parent-group");
        });
    }
  };

  return (
    <WrapForm title="update parent group">
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={initValue}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue,
        }) => {
          return (
            <>
              <Form
                className="row"
                onSubmit={handleSubmit}
                onChange={handleChange}
              >
                {/* <FormGroup
                  className="col-md-6 col-lg-4"
                  style={{ display: "none" }}
                >
                  <FormLabel> Seller Type</FormLabel>
                  <Form.Control
                    value={values.sellerType}
                    name="sellerType"
                    as="select"
                  >
                    <option>select...</option>
                    {sellerTypes.map((x) => (
                      <option value={x._id}>{x.sellerTypeName}</option>
                    ))}
                  </Form.Control>
                </FormGroup> */}

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Parent Group Name</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="parentGroupName"
                    value={values.parentGroupName}
                    isInvalid={
                      !!touched.parentGroupName && !!errors.parentGroupName
                    }
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel>
                    {" "}
                    Parent Group Image
                    <small
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      image size : 500 x 500
                    </small>{" "}
                  </FormLabel>
                  <FormControl
                    name="parentGroupImg"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                    isInvalid={
                      !!touched.parentGroupImg && !!errors.parentGroupImg
                    }
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Status</FormLabel>
                  <FormCheck
                    type="checkbox"
                    label="active or inactive"
                    name="isActive"
                    checked={values.isActive}
                    onClick={() => setFieldValue("isActive", !values.isActive)}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 btn-page text-center">
                  <Button disabled={sendLoad} variant="primary" type="submit">
                    Add Parent Group
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
