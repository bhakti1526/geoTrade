import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import axios from "axios";
import AppLoader from "../../../../src/components/admin/AppLoader";

const index = () => {
  const [initValues, setInitValues] = useState({
    companyName: "",
    contactPerson: "",
    contactPersonPhone: "",
    mobileNo: "",
    email: "",
    websiteAddress: "",
    gstNo: "",
    other1: "",
    other2: "",
    androidAppLink: "",
    iosAppLink: "",
  });

  const [isModelOpen, setIsModelOpen] = useState(false);

  const toggleModel = () => setIsModelOpen((x) => !x);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/basicInfo`)
        .then((res) => {
          if (res.data.data !== null) {
            setInitValues((x) => ({ ...x, ...res.data.data }));
          }
        });

      setIsLoading(false);
    })();
  }, []);

  const [androidImg, setAndoridImg] = useState(null);
  const [iosImg, setIosImg] = useState(null);

  if (isLoading === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    const fd = new FormData();

    fd.append("companyName", val.companyName);
    fd.append("contactPerson", val.contactPerson);
    fd.append("contactPersonPhone", val.contactPersonPhone);
    fd.append("mobileNo", val.mobileNo);
    fd.append("email", val.email);
    fd.append("websiteAddress", val.websiteAddress);
    fd.append("gstNo", val.gstNo);
    fd.append("other1", val.other1);
    fd.append("other2", val.other2);
    fd.append("androidAppLink", val.androidAppLink);
    fd.append("iosAppLink", val.iosAppLink);
    fd.append("androidIcon", androidImg);
    fd.append("iosIcon", iosImg);

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/basicInfo`, fd)
      .then((res) => {
        setIsModelOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsModelOpen(true);
        setError("somethign went wrong updating info");
      });
  };

  return (
    <WrapForm title="company details">
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <Form onChange={handleChange} onSubmit={handleSubmit}>
              <Row>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      value={values.companyName}
                      isInvalid={!!touched.companyName && !!errors.companyName}
                      name="companyName"
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Contact person</Form.Label>
                    <Form.Control
                      value={values.contactPerson}
                      isInvalid={
                        !!touched.contactPerson && !!errors.contactPerson
                      }
                      name="contactPerson"
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Contact person Number</Form.Label>
                    <Form.Control
                      value={values.contactPersonPhone}
                      isInvalid={
                        !!touched.contactPersonPhone &&
                        !!errors.contactPersonPhone
                      }
                      name="contactPersonPhone"
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control
                      value={values.mobileNo}
                      isInvalid={!!touched.mobileNo && !!errors.mobileNo}
                      name="mobileNo"
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>email </Form.Label>
                    <Form.Control
                      value={values.email}
                      isInvalid={!!touched.email && !!errors.email}
                      name="email"
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> website address </Form.Label>
                    <Form.Control
                      value={values.websiteAddress}
                      name="websiteAddress"
                      isInvalid={
                        !!touched.websiteAddress && !!errors.websiteAddress
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> GST No </Form.Label>
                    <Form.Control
                      value={values.gstNo}
                      isInvalid={!!touched.gstNo && !!errors.gstNo}
                      name="gstNo"
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> other1 </Form.Label>
                    <Form.Control
                      value={values.other1}
                      isInvalid={!!touched.other1 && !!errors.other1}
                      name="other1"
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> other2 </Form.Label>
                    <Form.Control
                      value={values.other2}
                      isInvalid={!!touched.other2 && !!errors.other2}
                      name="other2"
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> Android app icon </Form.Label>
                    <Form.Control
                      name="androidIcon"
                      type="file"
                      onChange={(e) => {
                        const image = e.target.files[0];

                        if (image.type.startsWith("image")) {
                          setAndoridImg(image);
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> android app link </Form.Label>
                    <Form.Control
                      value={values.androidAppLink}
                      isInvalid={
                        !!touched.androidAppLink && !!errors.androidAppLink
                      }
                      name="androidAppLink"
                    />
                  </Form.Group>
                </Col>
                <Col md="4"></Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> ios app icon </Form.Label>
                    <Form.Control
                      name="iosIcon"
                      type="file"
                      onChange={(e) => {
                        const image = e.target.files[0];

                        if (image.type.startsWith("image")) {
                          setIosImg(image);
                        }
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label> ios app link </Form.Label>
                    <Form.Control
                      value={values.iosAppLink}
                      isInvalid={!!touched.iosAppLink && !!errors.iosAppLink}
                      name="iosAppLink"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit">update</Button>
            </Form>
          );
        }}
      </Formik>

      <Modal show={isModelOpen} onHide={toggleModel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {error || "infomation updated successfully"}
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </WrapForm>
  );
};

export default index;
