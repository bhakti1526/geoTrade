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

const initValue = {
  sellerType: "",
  parentGroupName: "",
  parentGroupImg: "",
  isActive: true,
};

const add = () => {
  const { push } = useRouter();

  const [img, setImg] = useState(null);
  const [sellerTypes, setSellerTypes] = useState([]);

  const { isLoading: sellerLoad, response: sellerRes } =
    useFetchAxios("/getSellerType");

  const { isLoading: sendLoad, postData } = usePostAxios("/addParentGroup");

  useEffect(() => {
    setSellerTypes(sellerRes);
  }, [sellerRes]);

  if (sellerLoad === true) return <AppLoader />;

  const validationSchema = Yup.object().shape({
    sellerType: Yup.string().required(),
    parentGroupName: Yup.string().required(),
    parentGroupImg: Yup.mixed()
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

  const handleSubmit = async (val) => {
    const data = new FormData();

    data.append("sellerType", val.sellerType);
    data.append("parentGroupName", val.parentGroupName);
    data.append("parentGroupImg", img);
    data.append("isActive", val.isActive);

    await postData(data);

    push("/admin/parameter/parent-group");
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
                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Seller Type</FormLabel>
                  <Form.Control name="sellerType" as="select">
                    <option>select...</option>
                    {sellerTypes.map((x) => (
                      <option value={x._id}>{x.sellerTypeName}</option>
                    ))}
                  </Form.Control>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Parent Group Name</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="parentGroupName"
                    isInvalid={
                      !!touched.parentGroupName && !!errors.parentGroupName
                    }
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Parent Group Image</FormLabel>
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
                  <Button
                    disabled={sendLoad}
                    variant="primary btn-rounded"
                    type="submit"
                  >
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

export default add;
