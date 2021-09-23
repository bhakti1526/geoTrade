import React from "react";
import { Formik } from "formik";
import { Row, Col, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import moment from "moment";

const initSchema = {
  startDate: "",
  endDate: "",
};

const validationSchema = Yup.object().shape({
  startDate: Yup.string().required(),
  endDate: Yup.string().required(),
});

const tracking = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Generate Sales</h4>
      </div>
      <div className="card-body">
        <Formik
          onSubmit={(val) => console.log(val)}
          initialValues={initSchema}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, handleChange, setFieldValue }) => {
            return (
              <>
                <Form onSubmit={handleSubmit} onChange={handleChange}>
                  <Row>
                    <Col md="6">
                      <p className="mb-1">start date</p>
                      <Form.Control
                        onChange={(e) =>
                          setFieldValue(
                            "startDate",
                            moment(e.target.value).toISOString()
                          )
                        }
                        type="date"
                      />
                    </Col>
                    <Col md="6">
                      <p className="mb-1">end date</p>
                      <Form.Control
                        onChange={(e) =>
                          setFieldValue(
                            "endDate",
                            moment(e.target.value).toISOString()
                          )
                        }
                        type="date"
                      />
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      className="mt-2"
                      type="submit"
                      variant="outline-primary"
                    >
                      Generate
                    </Button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default tracking;
