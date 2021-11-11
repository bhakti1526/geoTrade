import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/css";
import { Row, Col, Form, Button } from "react-bootstrap";
import WrapForm from "../../src/components/admin/WrapForm";
import { Formik } from "formik";
import * as Yup from "yup";
import useFetchAxios from "../../component/hooks/useFetchAxios";
import AppLoader from "../../src/components/admin/AppLoader";
import axios from "axios";

const borderUpdate = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  border: 1px solid rgb(212, 217, 222);
  width: 80%;
`;

const profile = () => {
  const [initSchema, setInitSchema] = useState({
    firstName: "",
    email: "",
    mobile: "",
    website: "",
    gstNumber: "",
    panNo: "",
    stqlNo: "",
    brocherSheet: "",
    img: "",
  });

  const { isLoading, response } = useFetchAxios("/api/auth/user/profile");

  const [img, setImg] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [imgString, setImgString] = useState("oRdemc3Vc6.jpg");

  const imgRef = useRef(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    email: Yup.string().email().required(),
    mobile: Yup.string().required(),
    website: Yup.string().required(),
    gstNumber: Yup.string().required(),
    panNo: Yup.string().required(),
    stqlNo: Yup.string().required(),
    brocherSheet: Yup.string().required(),
    img: Yup.string().required(),
  });

  useEffect(() => {
    if (response) {
      const {
        firstName,
        email,
        mobile,
        website,
        gstNumber,
        panNo,
        stqlNo,
        brocherSheet,
        img,
      } = response;

      setInitSchema({
        firstName,
        email,
        mobile,
        website,
        gstNumber,
        panNo,
        stqlNo,
        brocherSheet,
        img,
      });

      if (response.img) {
        setImg(response.img);
      }
    }
  }, [response]);

  if (isLoading === true) return <AppLoader />;

  const handleSubmit = (val) => {
    const fd = new FormData();

    fd.append("img", img);
    fd.append("pdf", pdf);

    axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/img/upload?pdf=true`,
      fd
    );
  };

  return (
    <WrapForm title="update profile">
      <Formik
        initialValues={initSchema}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => {
          return (
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Row>
                <Col md="8">
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          name="firstName"
                          isInvalid={!!touched.firstName && !!errors.firstName}
                          value={values.firstName}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          value={values.email}
                          isInvalid={!!touched.email && !!errors.email}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                          name="mobile"
                          value={values.mobile}
                          isInvalid={!!touched.mobile && !!errors.mobile}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                          name="website"
                          value={values.website}
                          isInvalid={!!touched.website && !!errors.website}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group>
                        <Form.Label>GST Number</Form.Label>
                        <Form.Control
                          name="gstNumber"
                          value={values.gstNumber}
                          isInvalid={!!touched.gstNumber && !!errors.gstNumber}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <Form.Label>PAN Number</Form.Label>
                        <Form.Control
                          name="panNo"
                          value={values.panNo}
                          isInvalid={!!touched.panNo && !!errors.panNo}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>QL/STQL/STML/ML Number</Form.Label>
                        <Form.Control
                          name="stqlNo"
                          value={values.stqlNo}
                          isInvalid={!!touched.stqlNo && !!errors.stqlNo}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <div class="input-group">
                        <div class="custom-file">
                          <input
                            type="file"
                            accept="application/pdf"
                            class={
                              !!touched.brocherSheet && !!errors.brocherSheet
                                ? "custom-file-input is-invalid"
                                : "custom-file-input"
                            }
                            name="brocherSheet"
                            onChange={(e) => {
                              if (
                                e.target.files[0].type === "application/pdf"
                              ) {
                                setPdf(e.target.files[0]);
                              }
                            }}
                          />
                          <label class="custom-file-label">
                            Add Brochure / DLR sheet
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md="4">
                  <div
                    onClick={() => imgRef.current.click()}
                    className={
                      !!touched.img && !!errors.img
                        ? `form-control is-invalid ${borderUpdate}`
                        : `form-control ${borderUpdate}`
                    }
                  >
                    {imgString ? (
                      <img
                        className="img-fluid"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${imgString}`}
                      />
                    ) : img === null ? (
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
                          src={URL.createObjectURL(img)}
                        />
                      </>
                    )}
                    <Form.Control
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
                        console.log(image);
                        if (image.type.startsWith("image")) {
                          setImg(image);
                          setImgString("");
                        }
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <div className="mt-4">
                <Button type="submit">Update</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default profile;
