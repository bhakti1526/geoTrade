import React, { useRef, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
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
  Spinner,
} from "react-bootstrap";

import { useRouter } from "next/router";

import useFetchAxios from "../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../component/hooks/usePostAxios";
import AppLoader from "../../../src/components/admin/AppLoader";

const productDetails = {
  name: "",
  price: "",
  unit: "",
  description: "",
  brand: "",
  sellerType: "617bb291fc13ae3f5c000000",
  parentGroup: "",
  parentCategory: "",
  parentSubCategory: "",
  ytUrl: "",
  searchTag: "",
};

const regMatch =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().min(20).required(),
  unit: Yup.string().required(),
  description: Yup.string().min(6).required(),
  brand: Yup.string(),
  parentGroup: Yup.string().required(),
  parentCategory: Yup.string().required(),
  parentSubCategory: Yup.string().required(),
  ytUrl: Yup.string().matches(regMatch, "Website should be a valid URL"),
  sellerType: Yup.string().required(),
  searchTag: Yup.string(),
});

const ImgBlock = ({ img, setImg }) => {
  const imgRef = useRef(null);

  const handlechange = (e) => {
    const image = e.target.files[0];

    if (image.type.startsWith("image")) {
      setImg(image);
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
        {img === null ? (
          <>
            <i className="flaticon-381-photo-camera"></i>
            <p>Add </p>
          </>
        ) : (
          <img
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

const BigImgBlock = ({ img, setImg }) => {
  const imgRef = useRef(null);

  const handlechange = (e) => {
    const image = e.target.files[0];

    if (image.type.startsWith("image")) {
      setImg(image);
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
        {img === null ? (
          <>
            <i className="flaticon-381-photo-camera"></i>
            <p>Add Photos</p>
          </>
        ) : (
          <img
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

const product = () => {
  const [unitList, setUnitList] = useState([]);

  const { isLoading: unitLoad, response } = useFetchAxios("/api/other/unit");

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

  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [img5, setImg5] = useState(null);
  const [pdf, setPdf] = useState(null);

  const { postData, isLoading: postLoad } = usePostAxios("/api/user/product");
  const { push } = useRouter();

  const handleSubmit = async (val) => {
    const data = new FormData();
    data.append("name", val.name);
    data.append("price", val.price);
    data.append("unit", val.unit);
    data.append("description", val.description);
    data.append("brand", val.brand);
    data.append("parentGroup", val.parentGroup);
    data.append("parentCategory", val.parentCategory);
    data.append("parentSubCategory", val.parentSubCategory);
    data.append("ytUrl", val.ytUrl);
    data.append("img", img);
    data.append("img", img1);
    data.append("img", img2);
    data.append("img", img3);
    data.append("img", img4);
    data.append("img", img5);
    data.append("pdf", pdf);
    data.append("sellerType", val.sellerType);
    data.append("searchTag", val.searchTag || val.name);

    await postData(data);
    push("/seller/product");
  };

  const pdfRef = useRef(null);

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
                            <small
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                              }}
                            >
                              Image size 500 x 500
                            </small>
                            <div className="row m-0">
                              <div className="col-4 col-md-3 col-lg-2 p-0">
                                <ImgBlock img={img1} setImg={setImg1} />
                                <ImgBlock img={img2} setImg={setImg2} />
                                <ImgBlock img={img3} setImg={setImg3} />
                                <ImgBlock img={img4} setImg={setImg4} />
                                <ImgBlock img={img5} setImg={setImg5} />
                              </div>
                              <div className="col-8 col-md-9 col-lg-9 p-0">
                                <BigImgBlock img={img} setImg={setImg} />
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
                              as="select"
                            >
                              <option>select</option>
                              {brandRes.map((x) => (
                                <option value={x._id}>{x.name}</option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>

                        {/* <Col md="3">
                          <FormGroup>
                            <FormLabel> Seller Type</FormLabel>
                            <Form.Control
                              isInvalid={
                                !!touched.sellerType && !!errors.sellerType
                              }
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
                        </Col> */}

                        <Col md="3">
                          <Form.Group>
                            <Form.Label>Parent group</Form.Label>
                            <Form.Control
                              name="parentGroup"
                              isInvalid={
                                !!touched.parentGroup && !!errors.parentGroup
                              }
                              as="select"
                              disabled={!values.sellerType}
                            >
                              <option>select</option>
                              {parentRes
                                // .filter(
                                //   (x) => x.sellerType == values.sellerType
                                // )
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

                        <Col md="4">
                          <Form.Label>
                            search tags (seprate it with coma)
                          </Form.Label>
                          <Form.Control
                            name="searchTag"
                            isInvalid={
                              !!touched.searchTag && !!errors.searchTag
                            }
                          />
                        </Col>

                        <FormGroup className="form-group col-md-12 mt-3">
                          <div className="float-right">
                            <Button
                              className="btn btn-success"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              {postLoad === true && (
                                <Spinner
                                  animation="border"
                                  role="status"
                                  style={{
                                    height: "15px",
                                    width: "15px",
                                    marginRight: "0.2rem",
                                    marginBottom: "0.2rem",
                                  }}
                                ></Spinner>
                              )}
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

export default product;
