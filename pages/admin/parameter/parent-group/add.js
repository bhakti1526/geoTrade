import React, { useEffect, useState } from "react";
import Select from "react-select";
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
  sellerType: ["617bb291fc13ae3f5c000000"],
  parentGroupName: "",
  parentGroupImg: "",
};

const add = () => {
  const { push } = useRouter();

  const [img, setImg] = useState(null);
  const [sellerTypes, setSellerTypes] = useState([]);

  const { isLoading: sellerLoad, response: sellerRes } =
    useFetchAxios("/getSellerType");

  const { isLoading: sendLoad, postData } = usePostAxios(
    "/api/admin/parentgroup"
  );

  useEffect(() => {
    setSellerTypes(sellerRes);
  }, [sellerRes]);

  if (sellerLoad === true) return <AppLoader />;

  const validationSchema = Yup.object().shape({
    sellerType: Yup.array().of(Yup.string()).required(),
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
  });

  const handleSubmit = async (val) => {
    const data = new FormData();

    data.append("sellerType", JSON.stringify(val.sellerType));
    data.append("parentGroupName", val.parentGroupName);
    data.append("parentGroupImg", img);

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
          const parenCategoryStyle = {
            control: (base, state) => ({
              ...base,

              borderColor: state.isFocused
                ? "#ddd"
                : !errors?.sellerType
                ? "#ddd"
                : "#f72b50",

              "&:hover": {
                borderColor: state.isFocused
                  ? "#ddd"
                  : !errors?.sellerType
                  ? "#ddd"
                  : "#f72b50",
              },
            }),
          };

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
                  <Select
                    styles={parenCategoryStyle}
                    options={sellerTypes.map((x) => ({
                      value: x._id,
                      label: x.sellerTypeName,
                    }))}
                    isMulti
                    onChange={(e) =>
                      setFieldValue(
                        "sellerType",
                        e.map((x) => x.value)
                      )
                    }
                  />
                </FormGroup> */}

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
                  <FormLabel>
                    Parent Group Image
                    <small
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      image size : 500 x 500
                    </small>
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

export default add;
