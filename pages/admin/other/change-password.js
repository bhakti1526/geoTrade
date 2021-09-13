import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import WrapForm from "../../../src/components/admin/WrapForm";

const changePassword = () => {
  return (
    <WrapForm title="change password">
      <Form>
        <Row>
          <Col md="4">
            <Form.Group>
              <Form.Label>change password</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group>
              <Form.Label>change password</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="text-center">
          <Button className="rounded-pill">change password</Button>
        </Form.Group>
      </Form>
    </WrapForm>
  );
};

export default changePassword;
