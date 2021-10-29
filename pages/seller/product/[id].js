import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Col,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

import useFetchAxios from "../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../component/hooks/usePostAxios";

import { useRouter } from "next/router";

import AppLoader from "../../../src/components/admin/AppLoader";
import axios from "axios";

const regMatch =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().min(20).required(),
  unit: Yup.string().required(),
  description: Yup.string().min(6).required(),
  brand: Yup.string().required(),
  parentGroup: Yup.string().required(),
  parentCategory: Yup.string().required(),
  parentSubCategory: Yup.string().required(),
  ytUrl: Yup.string().matches(regMatch, "Website should be a valid URL"),
  sellerType: Yup.string().required(),
});

const ImgBlock = ({ img, setImg, imgUrl, setImgUrl }) => {
  const imgRef = useRef(null);

  const handlechange = (e) => {
    const image = e.target.files[0];

    if (image.type.startsWith("image")) {
      setImg(image);
      setImgUrl("");
    }
  };

  return (
    <>
      <div
        className={
          img
            ? css`
                padding: 0;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
              ` + " add-photo-01"
            : " add-photo-01"
        }
        onClick={() => imgRef.current.click()}
      >
        {imgUrl !== "" ? (
          imgUrl === undefined ? (
            <>
              <i className="flaticon-381-photo-camera"></i>
              <p>Add </p>
            </>
          ) : (
            <img
              loading="lazy"
              style={{ height: "auto", width: "100%" }}
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${imgUrl}`}
            />
          )
        ) : img === null ? (
          <>
            <i className="flaticon-381-photo-camera"></i>
            <p>Add </p>
          </>
        ) : (
          <img
            loading="lazy"
            style={{ padding: "0.2rem", height: "auto", width: "100%" }}
            src={URL.createObjectURL(img)}
          />
        )}
      </div>
      <input
        style={{ display: "none" }}
        ref={imgRef}
        onChange={handlechange}
        type="file"
        accept="image/*"
      />
    </>
  );
};

const BigImgBlock = ({ img, setImg, imgUrl, setImgUrl }) => {
  const imgRef = useRef(null);

  const handlechange = (e) => {
    const image = e.target.files[0];

    if (image.type.startsWith("image")) {
      setImg(image);
      setImgUrl("");
    }
  };

  return (
    <div
      className={
        img
          ? css`
              padding: 0;
              margin: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            ` + " big-photo-add"
          : " big-photo-add"
      }
      onClick={() => imgRef.current.click()}
    >
      <div className="add-photo-02">
        {imgUrl !== "" ? (
          <img
            loading="lazy"
            style={{ height: "auto", width: "100%" }}
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${imgUrl}`}
          />
        ) : img === null ? (
          <>
            <i className="flaticon-381-photo-camera"></i>
            <p>Add Photos</p>
          </>
        ) : (
          <img
            loading="lazy"
            style={{ height: "auto", width: "100%" }}
            src={URL.createObjectURL(img)}
          />
        )}
      </div>
      <input
        style={{ display: "none" }}
        ref={imgRef}
        onChange={handlechange}
        type="file"
        accept="image/*"
      />
    </div>
  );
};

const id = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    unit: "",
    description: "",
    brand: "",
    sellerType: "",
    parentGroup: "",
    parentCategory: "",
    parentSubCategory: "",
    ytUrl: "",
  });

  const [unitList, setUnitList] = useState([]);

  const [imgUrl, setImgUrl] = useState("");
  const [imgUrl1, setImgUrl1] = useState("");
  const [imgUrl2, setImgUrl2] = useState("");
  const [imgUrl3, setImgUrl3] = useState("");
  const [imgUrl4, setImgUrl4] = useState("");
  const [imgUrl5, setImgUrl5] = useState("");

  const {
    push,
    query: { id },
  } = useRouter();

  const { isLoading: unitLoad, response } = useFetchAxios("/api/other/unit");

  const { isLoading: preoductLoad, response: prodResss } = useFetchAxios(
    `/api/user/product?id=${id}`
  );

  const { isLoading: brandLoad, response: brandRes } =
    useFetchAxios("/api/other/brand");

  const { isLoading: sellerLoad, response: sellerRes } = useFetchAxios(
    "/api/other/sellertype"
  );

  const { isLoading: parentLoad, response: parentRes } = useFetchAxios(
    "/api/other/parenttype"
  );

  const { isLoading: paremtCategoryLoad, response: paremtCategoryRes } =
    useFetchAxios("/api/other/parentcategory");

  const { isLoading: subcategoryLoad, response: seubCategoryRes } =
    useFetchAxios("/api/other/subcategory");

  useEffect(() => {
    if (response) setUnitList(response);
  }, [response]);

  useEffect(() => {
    if (prodResss) {
      const {
        name,
        price,
        unit,
        description,
        brand,
        sellerType,
        parentGroup,
        parentCategory,
        parentSubCategory,
        ytUrl,
        img,
        pdf,
      } = prodResss;

      setProductDetails({
        name,
        price,
        unit,
        description,
        brand,
        sellerType,
        parentGroup,
        parentCategory,
        parentSubCategory,
        ytUrl,
      });

      setImgUrl(img[0]);
      setImgUrl1(img[1]);
      setImgUrl2(img[2]);
      setImgUrl3(img[3]);
      setImgUrl4(img[4]);
      setImgUrl5(img[5]);
    }
  }, [prodResss]);

  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [img5, setImg5] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleSubmit = async (val) => {
    const imgArray = [img, img1, img2, img3, img4, img5].filter(
      (x) => x !== null
    );
    const imgUrlArray = [
      imgUrl,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5,
    ].filter((x) => {
      if (x === undefined) return false;
      if (x === "") return false;
      return true;
    });

    if (imgArray.length !== 0) {
      const formData = new FormData();
      imgArray.map((x) => formData.append("img", x));

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/multi`, formData)
        .then((res) =>
          console.log(res.data.data.map((x) => imgUrlArray.push(x)))
        )
        .then(() => {
          console.log(imgUrlArray);
        })
        .then(() => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/product/${id}`, {
              ...val,
              img: imgUrlArray,
            })
            .then((res) => push("/seller/product"));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("THIS IS RUNNIG");
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/product/${id}`, {
          ...val,
          img: imgUrlArray,
        })
        .then((res) => push("/seller/product"))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const pdfRef = useRef(null);

  if (preoductLoad === true) return <AppLoader />;
  if (unitLoad === true) return <AppLoader />;
  if (sellerLoad === true) return <AppLoader />;
  if (parentLoad === true) return <AppLoader />;
  if (subcategoryLoad === true) return <AppLoader />;
  if (paremtCategoryLoad === true) return <AppLoader />;
  if (brandLoad === true) return <AppLoader />;

  return (
    <div>
      <div className="row  ">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Product</h4>
            </div>
            <div className="card-body ">
              <div className="basic-form p-3 p-md-0">
                <Formik
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                  initialValues={productDetails}
                  enableReinitialize
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                  }) => {
                    return (
                      <Form
                        className="row"
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row m-0">
                              <div className="col-4 col-md-3 col-lg-2 p-0">
                                <ImgBlock
                                  img={img1}
                                  imgUrl={imgUrl1}
                                  setImg={setImg1}
                                  setImgUrl={setImgUrl1}
                                />
                                <ImgBlock
                                  img={img2}
                                  imgUrl={imgUrl2}
                                  setImg={setImg2}
                                  setImgUrl={setImgUrl2}
                                />
                                <ImgBlock
                                  img={img3}
                                  imgUrl={imgUrl3}
                                  setImg={setImg3}
                                  setImgUrl={setImgUrl3}
                                />
                                <ImgBlock
                                  img={img4}
                                  imgUrl={imgUrl4}
                                  setImg={setImg4}
                                  setImgUrl={setImgUrl4}
                                />
                                <ImgBlock
                                  img={img5}
                                  imgUrl={imgUrl5}
                                  setImg={setImg5}
                                  setImgUrl={setImgUrl5}
                                />
                              </div>
                              <div className="col-8 col-md-9 col-lg-9 p-0">
                                <BigImgBlock
                                  img={img}
                                  imgUrl={imgUrl}
                                  setImg={setImg}
                                  setImgUrl={setImgUrl}
                                />
                                <div className="row m-0">
                                  <OverlayTrigger
                                    trigger="click"
                                    placement="auto"
                                    rootClose
                                    overlay={
                                      <Popover>
                                        <Popover.Title>
                                          Youtub URL
                                        </Popover.Title>
                                        <Popover.Content>
                                          <Form.Control
                                            value={values.ytUrl}
                                            name="ytUrl"
                                            onChange={handleChange}
                                            isInvalid={
                                              !!touched.ytUrl && !!errors.ytUrl
                                            }
                                          />
                                        </Popover.Content>
                                      </Popover>
                                    }
                                  >
                                    <div className="col-md-6 p-0">
                                      <div className="add-photo-01">
                                        <i class="fab fa-youtube"></i>
                                        <p>Add Video</p>
                                      </div>
                                    </div>
                                  </OverlayTrigger>
                                  <div
                                    className="col-md-6 p-0"
                                    onClick={() => pdfRef.current.click()}
                                  >
                                    <div className="add-photo-01">
                                      <i class="far fa-file-pdf"></i>
                                      <p>Add PDF</p>
                                    </div>
                                    <input
                                      style={{ display: "none" }}
                                      onChange={(e) => {
                                        const pdf = e.target.files[0];

                                        if (pdf.type === "application/pdf") {
                                          setPdf(pdf);
                                        }
                                      }}
                                      type="file"
                                      accept="application/pdf"
                                      ref={pdfRef}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6">
                            <div className="row align-items-center mt-4 mt-md-0">
                              <FormGroup className="form-group col-md-12">
                                <FormLabel>Product/Service Name</FormLabel>
                                <FormControl
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  placeholder=""
                                  isInvalid={!!touched.name && !!errors.name}
                                  value={values.name}
                                />
                              </FormGroup>
                              <FormGroup className="form-group col-md-5 tag-price mt-2">
                                <FormLabel>Price</FormLabel>
                                <i className="fas fa-rupee-sign"></i>
                                <FormControl
                                  type="text"
                                  className="form-control"
                                  placeholder=""
                                  name="price"
                                  isInvalid={!!touched.price && !!errors.price}
                                  value={values.price}
                                />
                              </FormGroup>
                              <FormGroup className="form-group col-md-2">
                                <FormLabel className="d-none d-md-block">
                                  &nbsp;
                                </FormLabel>
                                <p className="mb-0 text-center">-per-</p>
                              </FormGroup>
                              <FormGroup className="form-group col-md-5">
                                <FormLabel className="d-none d-md-block">
                                  Ex - Pair, Piece etc
                                </FormLabel>
                                <FormControl
                                  type="text"
                                  name="unit"
                                  className="form-control"
                                  as="select"
                                  isInvalid={!!touched.unit && !!errors.unit}
                                  value={values.unit}
                                >
                                  <option>select</option>
                                  {unitList.map((x) => (
                                    <option value={x._id}>{x.name}</option>
                                  ))}
                                </FormControl>
                              </FormGroup>
                              <FormGroup className="form-group col-md-12 mt-3">
                                <FormLabel className="d-block">
                                  Product/Service Description
                                  <small className="text-right text-secondary float-right">
                                    Uses, Details, Benefits, etc.
                                  </small>
                                </FormLabel>
                                <div className="summernote">
                                  <Editor
                                    initialValue={productDetails.description}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "description",
                                        e.target.getContent()
                                      )
                                    }
                                  />
                                </div>
                                <small className="d-block mt-2 text-right float-right text-secondary">
                                  0 character (maximum of 4000) including
                                  formatting.
                                </small>
                              </FormGroup>
                            </div>
                          </div>
                        </div>

                        <Col md="3">
                          <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                              name="brand"
                              isInvalid={!!touched.brand && !!errors.brand}
                              value={values.brand}
                              as="select"
                            >
                              <option>select</option>
                              {brandRes.map((x) => (
                                <option value={x._id}>{x.name}</option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <FormLabel> Seller Type</FormLabel>
                            <Form.Control
                              isInvalid={
                                !!touched.sellerType && !!errors.sellerType
                              }
                              value={values.sellerType}
                              as="select"
                              name="sellerType"
                            >
                              <option>Choosee....</option>

                              {sellerRes.map((s) => (
                                <option key={s._id} value={s._id}>
                                  {s.sellerTypeName}
                                </option>
                              ))}
                            </Form.Control>
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <Form.Group>
                            <Form.Label>Parent group</Form.Label>
                            <Form.Control
                              name="parentGroup"
                              isInvalid={
                                !!touched.parentGroup && !!errors.parentGroup
                              }
                              value={values.parentGroup}
                              as="select"
                              disabled={!values.sellerType}
                            >
                              <option>select</option>
                              {parentRes
                                .filter(
                                  (x) => x.sellerType == values.sellerType
                                )
                                .map((x) => (
                                  <option value={x._id}>
                                    {x.parentGroupName}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="3">
                          <Form.Group>
                            <Form.Label>Parent category</Form.Label>
                            <Form.Control
                              name="parentCategory"
                              isInvalid={
                                !!touched.parentCategory &&
                                !!errors.parentCategory
                              }
                              as="select"
                              value={values.parentCategory}
                              disabled={!values.parentGroup}
                            >
                              <option>select</option>
                              {paremtCategoryRes
                                .filter(
                                  (x) => x.parentGroup == values.parentGroup
                                )
                                .map((x) => (
                                  <option value={x._id}>
                                    {x.parentCatagoryName}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="3">
                          <Form.Group>
                            <Form.Label>Sub Parent category</Form.Label>
                            <Form.Control
                              name="parentSubCategory"
                              isInvalid={
                                !!touched.parentSubCategory &&
                                !!errors.parentSubCategory
                              }
                              as="select"
                              value={values.parentSubCategory}
                              disabled={!values.parentCategory}
                            >
                              <option>select</option>
                              {seubCategoryRes
                                .filter(
                                  (x) =>
                                    x.parentCategory == values.parentCategory
                                )
                                .map((x) => (
                                  <option value={x._id}>
                                    {x.parentSubCategoryName}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <FormGroup className="form-group col-md-12 mt-3">
                          <div className="float-right">
                            <Button
                              className="btn btn-success"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              Save and Continue
                              <i class="fas fa-arrow-right pl-1"></i>
                            </Button>
                          </div>
                        </FormGroup>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default id;
