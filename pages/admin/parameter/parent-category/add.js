import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import AppLoader from "../../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const initValue = {
  parentGroup: "",
  sellerType: "617bb291fc13ae3f5c000000",
  parentCatagoryName: "",
  parentCatagoryImg: "",
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

  const { isLoading, postData } = usePostAxios("/api/admin/parencategory");

  useEffect(() => {
    setSeller(sellerRes);
  }, [sellerRes]);

  useEffect(() => {
    setParent(parentRes);
  }, [parentRes]);

  const selectInputRef = useRef();

  const validationSchema = Yup.object().shape({
    parentGroup: Yup.array().of(Yup.string()).required(),
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
  });

  if (sellerLoad === true) return <AppLoader />;
  if (parentLoad === true) return <AppLoader />;

  const onClear = () => {
    selectInputRef.current.select.clearValue();
  };

  const handleSubmit = async (val) => {
    const data = new FormData();
    data.append("parentGroup", JSON.stringify(val.parentGroup));
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
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => {
          const parenCategoryStyle = {
            control: (base, state) => ({
              ...base,

              borderColor: state.isFocused
                ? "#ddd"
                : !errors?.parentGroup
                ? "#ddd"
                : "#f72b50",

              "&:hover": {
                borderColor: state.isFocused
                  ? "#ddd"
                  : !errors?.parentGroup
                  ? "#ddd"
                  : "#f72b50",
              },
            }),
          };

          useEffect(() => {
            onClear();
          }, [values.sellerType]);

          return (
            <Form
              className="row"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              {/* <FormGroup
                className="col-md-6 col-lg-4"
                style={{ display: "none" }}
              >
                <FormLabel> Seller Name</FormLabel>
                <Form.Control
                  isInvalid={!!touched.sellerType && !!errors.sellerType}
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

                <Select
                  styles={parenCategoryStyle}
                  ref={selectInputRef}
                  options={parent
                    // .filter((x) => x.sellerType._id === values.sellerType)
                    .map((x) => ({
                      value: x._id,
                      label: x.parentGroupName,
                    }))}
                  isMulti
                  onChange={(e) =>
                    setFieldValue(
                      "parentGroup",
                      e.map((x) => x.value)
                    )
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-6 col-lg-4">
                <FormLabel>
                  {" "}
                  Parent Category Image
                  <small style={{ color: "blue", textDecoration: "underline" }}>
                    image size : 500 x 500
                  </small>{" "}
                </FormLabel>
                <FormControl
                  isInvalid={
                    !!touched.parentCatagoryImg && !!errors.parentCatagoryImg
                  }
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
                  isInvalid={
                    !!touched.parentCatagoryName && !!errors.parentCatagoryName
                  }
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

export default add;
