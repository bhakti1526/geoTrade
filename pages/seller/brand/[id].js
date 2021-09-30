import React, { useEffect, useState, createRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { css } from "@emotion/css";
import { Formik } from "formik";
import { useRouter } from "next/router";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import * as Yup from "yup";
import useFetchAxios from "../../../component/hooks/useFetchAxios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  contact: Yup.string().required(),
  website: Yup.string().url().required(),
  description: Yup.string().required(),
  img: Yup.string().required(),
});

const brand = () => {
  const [img, setImg] = useState(null);
  const [initialSchema, setInitialSchema] = useState({
    name: "",
    contact: "",
    email: "",
    website: "",
    userType: "",
    description: "",
    isApproved: false,
    isActive: false,
    img: "",
  });

  const {
    push,
    query: { id },
  } = useRouter();

  const { response } = useFetchAxios(`/api/user/brand?id=${id}`);

  const imgRef = createRef(null);

  const handleSubmit = async (val) => {
    if (img !== null && img !== undefined) {
      const formData = new FormData();
      formData.append("img", img);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
        .then((res) => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/brand/${id}`, {
              ...val,
              _id: id,
              img: res.data.data,
            })
            .then((res) => {
              push("/seller/brand");
            });
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/brand/${id}`, {
          ...val,
          _id: id,
        })
        .then((res) => {
          push("/seller/brand");
        });
    }
  };

  useEffect(() => {
    if (response) {
      setInitialSchema(response);
    }
  }, [response]);

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
                  enableReinitialize
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                  initialValues={initialSchema}
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
                                value={values.contact}
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
                                value={values.email}
                                isInvalid={!!touched.email && !!errors.email}
                              />
                            </FormGroup>

                            <FormGroup className="col-md-12 col-lg-12">
                              <FormLabel>Brand Info</FormLabel>
                              <div className="summernote">
                                <Editor
                                  initialValue={values.description}
                                  onChange={(e) =>
                                    setFieldValue(
                                      "description",
                                      e.target.getContent()
                                    )
                                  }
                                />
                              </div>
                            </FormGroup>
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
                            <FormControl
                              name="img"
                              type="file"
                              className="form-control"
                              accept="image/*"
                              style={{
                                display: "none",
                              }}
                              ref={imgRef}
                              onChange={(e) => setImg(e.target.files[0])}
                              isInvalid={!!touched.img && !!errors.img}
                            />
                            <i
                              className="flaticon-381-photo-camera"
                              style={{ fontSize: "34px" }}
                            ></i>
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
