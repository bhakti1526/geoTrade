import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import WrapFrom from "../../../src/components/admin/WrapForm";
import usePostAxios from "../../../component/hooks/usePostAxios";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import AppLoader from "../../../src/components/admin/AppLoader";

const imgStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  border: 1px solid rgb(212, 217, 222);
  width: 80%;
`;

const initData = {
  name: "",
  description: "",
  // sellerType: "",
  // parentType: "",
  // parentCategory: "",
  brand: "",
  unit: "",
  price: "",
  img: "",
  visibleCountry: "",
  visibleState: "",
  visibleCity: "",
  geoCategory: "",
  geoSubCategory: "",
};

const add = () => {
  const imgRef = useRef(null);

  const { isLoading: geoLoad, response: geoRes } = useFetchAxios(
    "/api/public/geobazar/category"
  );

  // const { isLoading: sellerLoad, response: sellerRes } = useFetchAxios(
  //   "/api/other/sellertype"
  // );
  // const { isLoading: parentLoad, response: parentRes } = useFetchAxios(
  //   "/api/other/parenttype"
  // );

  // const { isLoading: paremtCategoryLoad, response: paremtCategoryRes } =
  //   useFetchAxios("/api/other/parentcategory");

  const { isLoading: unitLoad, response: unitRes } =
    useFetchAxios("/api/other/unit");

  const { isLoading: brnadLoad, response: brandRes } = useFetchAxios(
    "/api/other/brand?isSelect=true"
  );

  const { isLoading: countryLoad, response: countryRes } =
    useFetchAxios("/api/other/country");

  const { isLoading: stateLoad, response: stateRes } =
    useFetchAxios("/api/other/state");

  const { isLoading: cityLoad, response: cityRes } =
    useFetchAxios("/api/other/city");

  const [img, setImg] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    // sellerType: Yup.string().required(),
    // parentType: Yup.string().required(),
    // parentCategory: Yup.string().required(),
    geoCategory: Yup.string().required(),
    geoSubCategory: Yup.string().required(),
    brand: Yup.string().required(),
    unit: Yup.string().required(),
    price: Yup.number().required().min(20),
    visibleCountry: Yup.string().required(),
    visibleState: Yup.string().required(),
    visibleCity: Yup.string().required(),
    img: Yup.mixed()
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

  const { response, postData, isLoading } = usePostAxios("/api/user/post");

  const { push } = useRouter();

  const handleSubmit = async (val) => {
    console.log("xD");
    const data = new FormData();
    data.append("name", val.name);
    data.append("img", img);
    data.append("description", val.description);
    data.append("price", val.price);
    // data.append("parentCategory", val.parentCategory);
    // data.append("parentType", val.parentType);
    // data.append("sellerType", val.sellerType);
    data.append("unit", val.unit);
    data.append("brand", val.brand);
    data.append("visibleCountry", val.visibleCountry);
    data.append("visibleState", val.visibleState);
    data.append("visibleCity", val.visibleCity);
    data.append("geoCategory", val.geoCategory);
    data.append("geoSubCategory", val.geoSubCategory);

    await postData(data);

    push("/seller/post");
  };

  // const [parentGroup, setParentGroup] = useState([]);
  // const [parentCategory, setParentCategory] = useState([]);
  // const [sellerTypes, setSellerType] = useState([]);
  const [brand, setBrand] = useState([]);
  const [unit, setUnit] = useState([]);

  // useEffect(() => {
  //   if (parentRes) {
  //     setParentGroup(parentRes);
  //   }
  // }, [parentRes]);

  // useEffect(() => {
  //   if (paremtCategoryRes) {
  //     setParentCategory(paremtCategoryRes);
  //   }
  // }, [paremtCategoryRes]);

  // useEffect(() => {
  //   if (sellerRes) {
  //     setSellerType(sellerRes);
  //   }
  // }, [sellerRes]);

  useEffect(() => {
    if (brandRes) {
      setBrand(brandRes);
    }
  }, [brandRes]);

  useEffect(() => {
    if (unitRes) {
      setUnit(unitRes);
    }
  }, [unitRes]);

  // if (sellerLoad === true) return <AppLoader />;
  // if (parentLoad === true) return <AppLoader />;
  // if (paremtCategoryLoad === true) return <AppLoader />;
  if (brnadLoad === true) return <AppLoader />;
  if (unitLoad === true) return <AppLoader />;
  if (countryLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;
  if (cityLoad === true) return <AppLoader />;
  if (geoLoad === true) return <AppLoader />;

  return (
    <WrapFrom title="add post">
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={initData}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          setFieldValue,
          errors,
          touched,
        }) => {
          return (
            <>
              <Form
                className="row"
                onChange={handleChange}
                onSubmit={handleSubmit}
              >
                <div className="col-md-8">
                  <div className="row">
                    <FormGroup className="col-md-12 col-lg-4">
                      <FormLabel> Product Name</FormLabel>
                      <FormControl
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder=""
                        isInvalid={!!touched.name && !!errors.name}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Price</FormLabel>
                      <FormControl
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="price"
                        isInvalid={!!touched.price && !!errors.price}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Unit</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.unit && !!errors.unit}
                        as="select"
                        name="unit"
                        defaultValue="Choose..."
                      >
                        <option>Choosee....</option>
                        {unit.map((ui) => (
                          <option key={ui._id} value={ui._id}>
                            {ui.name}
                          </option>
                        ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-12 col-lg-12">
                      <FormLabel> Porduct Info </FormLabel>
                      <div
                        className="summernote"
                        style={{
                          border:
                            !!touched.description && !!errors.description
                              ? "1px solid red"
                              : "1px solid transparent",
                        }}
                      >
                        <Editor
                          onChange={(e) =>
                            setFieldValue("description", e.target.getContent())
                          }
                        />
                      </div>
                    </FormGroup>

                    {/* <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Seller Type</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.sellerType && !!errors.sellerType}
                        as="select"
                        name="sellerType"
                      >
                        <option>Choosee....</option>

                        {sellerTypes.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.sellerTypeName}
                          </option>
                        ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Parent type</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.parentType && !!errors.parentType}
                        name="parentType"
                        as="select"
                        defaultValue="Choose..."
                        disabled={!values.sellerType}
                      >
                        <option>Choosee....</option>
                        {values.sellerType &&
                          parentGroup
                            .filter((x) => x.sellerType == values.sellerType)
                            .map((p) => (
                              <option key={p._id} value={p._id}>
                                {p.parentGroupName}
                              </option>
                            ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Parent Category</FormLabel>
                      <Form.Control
                        isInvalid={
                          !!touched.parentCategory && !!errors.parentCategory
                        }
                        as="select"
                        name="parentCategory"
                        defaultValue="Choose..."
                        disabled={!values.parentType}
                      >
                        <option>Choosee....</option>
                        {values.parentType &&
                          parentCategory
                            .filter((x) => x.parentGroup == values.parentType)
                            .map((p) => (
                              <option key={p._id} value={p._id}>
                                {p.parentCatagoryName}
                              </option>
                            ))}
                      </Form.Control>
                    </FormGroup> */}

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel>Brand</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.brand && !!errors.brand}
                        as="select"
                        name="brand"
                      >
                        <option>Choosee....</option>
                        {brand.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel>category</FormLabel>
                      <Form.Control
                        isInvalid={
                          !!touched.geoCategory && !!errors.geoCategory
                        }
                        as="select"
                        name="geoCategory"
                      >
                        <option>Choosee....</option>
                        {geoRes.category.map((x) => (
                          <option key={x._id} value={x._id}>
                            {x.name}
                          </option>
                        ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel>subcategory</FormLabel>
                      <Form.Control
                        isInvalid={
                          !!touched.geoSubCategory && !!errors.geoSubCategory
                        }
                        as="select"
                        name="geoSubCategory"
                      >
                        <option>Choosee....</option>
                        {geoRes.subcategory
                          .filter((x) => x.category === values.geoCategory)
                          .map((x) => (
                            <option key={x._id} value={x._id}>
                              {x.name}
                            </option>
                          ))}
                      </Form.Control>
                    </FormGroup>
                  </div>
                  <Row>
                    <Form.Group as={Col} md="4">
                      <Form.Label>available country</Form.Label>
                      <Form.Control
                        name="visibleCountry"
                        value={values.visibleCountry}
                        isInvalid={
                          !!touched.visibleCountry && !!errors.visibleCountry
                        }
                        as="select"
                      >
                        <option>Choosee...</option>
                        {countryRes.map((x) => (
                          <option value={x._id}>{x.name}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>available state</Form.Label>
                      <Form.Control
                        name="visibleState"
                        value={values.visibleState}
                        isInvalid={
                          !!touched.visibleState && !!errors.visibleState
                        }
                        as="select"
                        disabled={!values.visibleCountry}
                      >
                        {console.log("isDisabled", !values.visibleCountry)}
                        <option>Choosee...</option>
                        {values.visibleCountry &&
                          stateRes
                            .filter((x) => x.country == values.visibleCountry)
                            .map((x) => (
                              <option value={x._id}>{x.name}</option>
                            ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                      <Form.Label>available city</Form.Label>
                      <Form.Control
                        name="visibleCity"
                        value={values.visibleCity}
                        isInvalid={
                          !!touched.visibleCity && !!errors.visibleCity
                        }
                        as="select"
                        disabled={!values.visibleState}
                      >
                        <option>Choosee...</option>
                        {values.visibleState &&
                          cityRes
                            .filter((x) => x.state == values.visibleState)
                            .map((x) => (
                              <option value={x._id}>{x.name}</option>
                            ))}
                      </Form.Control>
                    </Form.Group>
                  </Row>
                </div>

                <div className="col-md-4">
                  <div
                    className={imgStyle}
                    onClick={() => imgRef.current.click()}
                    style={{
                      border:
                        !!touched.img && !!errors.img
                          ? "1px solid red"
                          : "1px solid rgb(212, 217, 222)",
                    }}
                  >
                    <FormControl
                      name="img"
                      type="file"
                      className="form-control"
                      accept="image/*"
                      style={{
                        display: "none",
                      }}
                      ref={imgRef}
                      onChange={(e) => {
                        const type = e.target.files[0].type;
                        if (type === "image/jpeg" || type === "image/png") {
                          setImg(e.target.files[0]);
                        }
                      }}
                      isInvalid={!!touched.img && !!errors.img}
                    />

                    {img !== null ? (
                      <img
                        style={{ width: "100%", height: "auto" }}
                        src={URL.createObjectURL(img)}
                      />
                    ) : (
                      <i
                        className="flaticon-381-photo-camera"
                        style={{ fontSize: "34px" }}
                      ></i>
                    )}
                  </div>
                  <small style={{ color: "blue", textDecoration: "underline" }}>
                    image size : 600 x 450
                  </small>
                </div>

                <FormGroup className="col-md-12  text-center">
                  <div className="btn-page mt-5">
                    <Button variant="primary " type="submit">
                      Add Post
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapFrom>
  );
};

export default add;
