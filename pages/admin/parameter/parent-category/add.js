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
import AppLoader from "../../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const initValue = {
  parentGroup: "",
  sellerType: "",
  parentCatagoryName: "",
  parentCatagoryImg: "",
  isActive: false,
};

const add = () => {
  const { push } = useRouter();

  const [img, setImg] = useState(null);

  const [seller, setSeller] = useState([]);
  const [parent, setParent] = useState([]);

  const { isLoading: sellerLoad, response: sellerRes } =
    useFetchAxios("/getSellerType");

  const { isLoading: parentLoad, response: parentRes } =
    useFetchAxios("/getParentGroup");

  const { isLoading, postData } = usePostAxios("/addParentCategory");

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
    parentCatagoryImg: Yup.mixed()
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

  if (sellerLoad === true) return <AppLoader />;
  if (parentLoad === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    const data = new FormData();
    data.append("parentGroup", val.parentGroup);
    data.append("sellerType", val.sellerType);
    data.append("parentCatagoryName", val.parentCatagoryName);
    data.append("parentCatagoryImg", img);
    data.append("isActive", val.isActive);

    await postData(data);
    push("/admin/parameter/parent-category");
  };

  return (
    <WrapForm title="add parent category">
      <Formik
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
              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Seller Name</FormLabel>
                <Form.Control name="sellerType" as="select">
                  <option>selct</option>
                  {seller.map((x) => (
                    <option value={x._id}> {x.sellerTypeName} </option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Parent Group</FormLabel>
                <Form.Control name="parentGroup" as="select">
                  <option>selct</option>
                  {parent.map((x) => (
                    <option value={x._id}> {x.parentGroupName} </option>
                  ))}
                </Form.Control>
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Parent Category Image</FormLabel>
                <FormControl
                  type="file"
                  accept="image/*"
                  name="parentCatagoryImg"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="form-control"
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel> Parent Category Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control"
                  name="parentCatagoryName"
                  placeholder=""
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
                <Button
                  disabled={isLoading}
                  variant="primary btn-rounded"
                  type="submit"
                >
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

export default add;
