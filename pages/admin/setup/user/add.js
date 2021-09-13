import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";

const add = () => {
  return (
    <WrapForm title="add user">
      <Form>
        <Row>
          <Col md="4">
            <Form.Group>
              <Form.Label>user name</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group>
              <Form.Label>user email</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group>
              <Form.Label>user password</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>user name</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group>
          <Form.Label>states</Form.Label>
          <Form.Check label="active or inactive" />
        </Form.Group>
        <Form.Group>
          <Button className="rounded-pill">add user</Button>
        </Form.Group>
      </Form>
    </WrapForm>
  );
};

export default add;
