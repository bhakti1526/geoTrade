import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Pickadate from "pickadate/builds/react-dom";

const sales = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Generate Sales</h4>
      </div>
      <div className="card-body">
        <Row>
          <Col md="6">
            <p className="mb-1">start date</p>
            <Pickadate.InputPicker
              className="datepicker-default form-control"
              id="datepicker"
            />
          </Col>
          <Col md="6">
            <p className="mb-1">end date</p>
            <Pickadate.InputPicker
              className="datepicker-default form-control"
              id="datepicker"
            />
          </Col>
        </Row>
        <div className="text-center">
          <Button className="mt-2" variant="outline-primary">
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default sales;
