import React, { useState, useRef } from "react";
import { css } from "@emotion/css";
import { Row, Col, Form } from "react-bootstrap";
import WrapForm from "../../src/components/admin/WrapForm";

const initSchema = {
  firstName: "",
  email: "",
  mobile: "",
};

const profile = () => {
  const [img, setImg] = useState(null);

  const imgRef = useRef(null);

  return (
    <WrapForm title="update profile">
      <Form>
        <Row>
          <Col md="8">
            <Row>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col md="4">
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
              {img === null ? (
                <>
                  <i
                    className="flaticon-381-photo-camera"
                    style={{ fontSize: "34px" }}
                  ></i>
                </>
              ) : (
                <>
                  <img className="img-fluid" src={URL.createObjectURL(img)} />
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
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </WrapForm>
  );
};

export default profile;
