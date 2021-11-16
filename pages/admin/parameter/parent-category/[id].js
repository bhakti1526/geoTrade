import React, { useState, useEffect } from "react";
import axios from "axios";
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
import AppLoader from "../../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const update = () => {
  const {
    push,
    query: { id },
  } = useRouter();

  const [img, setImg] = useState(null);

  console.log(id);

  const [initValue, setInitValue] = useState({
    _id: id,
    parentGroup: "",
    sellerType: "",
    parentCatagoryName: "",
    parentCatagoryImg: "",
    isActive: false,
  });

  const [seller, setSeller] = useState([]);
  const [parent, setParent] = useState([]);

  const { isLoading: sellerLoad, response: sellerRes } =
    useFetchAxios("/getSellerType");

  const { isLoading: parentLoad, response: parentRes } =
    useFetchAxios("/getParentGroup");

  const { isLoading, postData } = usePostAxios("/addParentCategory");

  const { isLoading: categoryLoad, response: categoryRes } = useFetchAxios(
    `/getParentCategory?id=${id}`
  );

  useEffect(() => {
    if (categoryRes) {
      console.log(categoryRes);
      setInitValue({
        _id: categoryRes?._id,
        parentGroup: categoryRes?.parentGroup?._id,
        sellerType: "617bb291fc13ae3f5c000000",
        parentCatagoryName: categoryRes?.parentCatagoryName,
        parentCatagoryImg: categoryRes?.parentCatagoryImg,
        isActive: categoryRes?.isActive,
      });
    }
  }, [categoryRes]);

  console.log(initValue);

  useEffect(() => {
    setSeller(sellerRes);
  }, [sellerRes]);

  useEffect(() => {
    setParent(parentRes);
  }, [parentRes]);

  const validationSchema = Yup.object().shape({
    parentGroup: Yup.string().required(),
    sellerType: Yup.string().required(),
    parentCatagoryName: Yup.string().required(),
    parentCatagoryImg: Yup.string().required(),
    isActive: Yup.bool().oneOf([true, false]),
  });

  if (sellerLoad === true) return <AppLoader />;
  if (parentLoad === true) return <AppLoader />;
  if (categoryLoad === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    if (img !== null && img !== undefined) {
      console.log("THIS IS RUNNING IN 1");
      const formData = new FormData();
      formData.append("img", img);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
        .then((res) => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/updateParentCategory`, {
              ...val,
              _id: id,
              parentCatagoryImg: res.data.data,
            })
            .then((res) => {
              push("/admin/parameter/parent-category");
            });
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/updateParentCategory`, {
          ...val,
          _id: id,
        })
        .then((res) => {
          push("/admin/parameter/parent-category");
        });
    }
  };

  return (
    <WrapForm title="add parent category">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initValue}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => {
          return (
            <Form
              className="row"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              {/* <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Seller Name</FormLabel>
                <Form.Control
                  value={values.sellerType}
                  name="sellerType"
                  as="select"
                >
                  <option>selct</option>
                  {seller.map((x) => (
                    <option value={x._id}> {x.sellerTypeName} </option>
                  ))}
                </Form.Control>
              </FormGroup> */}

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Parent Group</FormLabel>
                <Form.Control
                  value={values.parentGroup}
                  name="parentGroup"
                  as="select"
                >
                  <option>selct</option>
                  {parent.map((x) => (
                    <option value={x._id}> {x.parentGroupName} </option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel>
                  Parent Category Image
                  <small style={{ color: "blue", textDecoration: "underline" }}>
                    image size : 500 x 500
                  </small>
                </FormLabel>
                <FormControl
                  type="file"
                  accept="image/*"
                  name="parentCatagoryImg"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="form-control"
                />
                <small>
                  <a
                    style={{ color: "blue", textDecoration: "underline" }}
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${initValue.parentCatagoryImg}`}
                    target="_blank"
                  >
                    prev image
                  </a>
                </small>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Parent Category Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  name="parentCatagoryName"
                  placeholder=""
                  value={values.parentCatagoryName}
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Status</FormLabel>
                <FormCheck
                  type="checkbox"
                  name="isActive"
                  checked={values.isActive}
                  onClick={() => setFieldValue("isActive", !values.isActive)}
                  label="active or inactive"
                />
              </FormGroup>

              <FormGroup className="col-md-12 btn-page text-center">
                <Button disabled={isLoading} variant="primary" type="submit">
                  Add Parent Category
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
