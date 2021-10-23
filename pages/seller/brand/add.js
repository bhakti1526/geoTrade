import React, { useContext, useEffect, useState, createRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { css } from "@emotion/css";
import { Formik } from "formik";
import { useRouter } from "next/router";

import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import * as Yup from "yup";
import usePostAxios from "../../../component/hooks/usePostAxios";
import { AppContext } from "../../../component/context/app.context";

const brands = {
  name: "",
  contact: "",
  email: "",
  website: "",
  userType: "",
  description: "",
  isApproved: false,
  isActive: false,
  img: "",
};

const brand = () => {
  const { token } = useContext(AppContext);
  let tokens;
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [b, setB] = useState(brands);
  const [imgs, setImgs] = useState(null);

  const regMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    contact: Yup.string().required(),
    website: Yup.string()
      .matches(regMatch, "Website should be a valid URL")
      .required(),
    description: Yup.string().required(),

    img: Yup.mixed()
      .required("A file is required")
      .test("fileFormat", "image only", () => {
        if (imgs === null || imgs === undefined) return false;
        return imgs.type === "image/png"
          ? true
          : imgs.type === "image/jpeg"
          ? true
          : false;
      }),
  });

  const { response, postData, isLoading, error } =
    usePostAxios("/api/user/brand");

  const { push } = useRouter();

  const imgRef = createRef(null);

  const handleSubmit = async (val) => {
    const data = new FormData();

    data.append("name", val.name);
    data.append("img", imgs);
    data.append("contact", val.contact);
    data.append("isActive", val.isActive);
    data.append("isApproved", val.isApproved);
    data.append("website", val.website);
    data.append("email", val.email);
    data.append("userType", val.userType);
    data.append("description", val.description);

    await postData(data);

    push("/seller/brand");
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Manage Brand</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <Formik
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                  initialValues={brands}
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
                        <div className="col-md-8">
                          <div className="row">
                            <FormGroup className="col-md-6 col-lg-6">
                              <FormLabel> Brand Name</FormLabel>
                              <FormControl
                                type="text"
                                className="form-control"
                                name="name"
                                value={values.name}
                                placeholder=""
                                isInvalid={!!touched.name && !!errors.name}
                              />
                            </FormGroup>

                            <FormGroup className="col-md-6 col-lg-6">
                              <FormLabel> Contact Number</FormLabel>
                              <FormControl
                                name="contact"
                                type="text"
                                className="form-control"
                                placeholder=""
                                isInvalid={
                                  !!touched.contact && !!errors.contact
                                }
                              />
                            </FormGroup>

                            <FormGroup className="col-md-6 col-lg-6">
                              <FormLabel> Website</FormLabel>
                              <FormControl
                                name="website"
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={values.website}
                                isInvalid={
                                  !!touched.website && !!errors.website
                                }
                              />
                            </FormGroup>

                            <FormGroup className="col-md-6 col-lg-6">
                              <FormLabel> Email Id</FormLabel>
                              <FormControl
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="email"
                                isInvalid={!!touched.email && !!errors.email}
                              />
                            </FormGroup>

                            <FormGroup className="col-md-12 col-lg-12">
                              <FormLabel>Brand Info</FormLabel>
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
                            </FormGroup>

                            {/* <FormGroup className="col-md-12 col-lg-12">
                              <FormLabel>Brand Info</FormLabel>
                              <div className="summernote">
                                <Editor
                                  name="description"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "description",
                                      e.target.getContent()
                                    )
                                  }
                                />
                              </div>
                            </FormGroup> */}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div
                            onClick={() => imgRef.current.click()}
                            className={css`
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              height: 30vh;
                              border: 1px solid rgb(212, 217, 222);
                              width: 80%;
                            `}
                          >
                            {imgs === null ? (
                              <>
                                <i
                                  className="flaticon-381-photo-camera"
                                  style={{ fontSize: "34px" }}
                                ></i>
                              </>
                            ) : (
                              <>
                                <img
                                  className="img-fluid"
                                  src={URL.createObjectURL(imgs)}
                                />
                              </>
                            )}
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
                                const image = e.target.files[0];
                                if (image.type.startsWith("image")) {
                                  setImgs(image);
                                }
                              }}
                              isInvalid={!!touched.img && !!errors.img}
                            />
                          </div>
                        </div>

                        <FormGroup className="col-md-12  text-center">
                          <div className="btn-page mt-5">
                            <Button variant="primary btn-rounded" type="submit">
                              Update Brand
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

export default brand;
