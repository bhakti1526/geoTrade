import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import WrapForm from "../../../../src/components/admin/WrapForm";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoading from "../../../../src/components/admin/AppLoader";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  img: Yup.string().required(),
  description: Yup.string().required(),
  isActive: Yup.bool().oneOf([true, false]).required(),
  isApproved: Yup.bool().oneOf([true, false]).required(),
  email: Yup.string().email().required(),
  contact: Yup.string().required(),
  website: Yup.string().url().required(),
});

const id = () => {
  const [img, setImg] = useState(null);
  const {
    query: { id },
    push,
  } = useRouter();

  const { isLoading, response } = useFetchAxios(`/getbrands?id=${id}`);

  const [initSchema, setInitSchema] = useState({
    name: "",
    img: "",
    description: "",
    email: "",
    contact: "",
    website: "",
    isApproved: false,
    isActive: true,
  });

  useEffect(() => {
    setInitSchema({
      name: response?.name,
      img: response?.img,
      description: response?.description,
      email: response?.email,
      contact: response?.contact,
      website: response?.website,
      isApproved: response?.isApproved,
      isActive: response?.isActive || true,
    });
  }, [response]);

  if (isLoading === true) return <AppLoading />;

  const handleSubmit = (val) => {
    if (img !== null && img !== undefined) {
      const formData = new FormData();
      formData.append("img", img);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
        .then((res) => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/updateBrands/${id}`, {
              ...val,
              _id: id,
              img: res.data.data,
            })
            .then((res) => {
              push("/admin/parameter/manage-brand");
            });
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/updateBrands/${id}`, {
          ...val,
          _id: id,
        })
        .then((res) => {
          push("/admin/parameter/manage-brand");
        });
    }
  };

  return (
    <WrapForm title="update brand">
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={initSchema}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => {
          return (
            <>
              <Form
                onSubmit={handleSubmit}
                onChange={handleChange}
                className="row"
              >
                <div className="col-md-12">
                  <div className="row">
                    <FormGroup className="col-md-4  ">
                      <FormLabel> Brand Name</FormLabel>
                      <FormControl
                        type="text"
                        className="form-control"
                        name="name"
                        value={values.name}
                        placeholder=""
                      />
                    </FormGroup>

                    <FormGroup className="col-md-4  ">
                      <FormLabel> Brand image</FormLabel>
                      <FormControl
                        type="text"
                        className="form-control"
                        name="img"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files[0])}
                      />
                    </FormGroup>
                  </div>
                  <div className="row">
                    <FormGroup className="col-md-4">
                      <FormLabel> Contact Number</FormLabel>
                      <FormControl
                        name="contact"
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="contact"
                        value={values.contact}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-4">
                      <FormLabel> Website</FormLabel>
                      <FormControl
                        name="website"
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="website"
                        value={values.website}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-4">
                      <FormLabel> Email Id</FormLabel>
                      <FormControl
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="email"
                        value={values.email}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-lg-12">
                      <FormLabel>Brand Info</FormLabel>
                      <div className="summernote">
                        <Editor
                          initialValue={values.description}
                          onChange={(e) =>
                            setFieldValue("description", e.target.getContent())
                          }
                        />
                      </div>
                    </FormGroup>
                  </div>
                </div>
                <Row className="ml-2">
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>is Approved</Form.Label>
                      <Form.Check
                        checked={values.isApproved}
                        onClick={() =>
                          setFieldValue("isApproved", !values.isApproved)
                        }
                        label="active or inactive"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>status</Form.Label>
                      <Form.Check
                        checked={values.isActive}
                        onClick={() =>
                          setFieldValue("isActive", !values.isActive)
                        }
                        label="active or inactive"
                        label="active or inactive"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <FormGroup className="col-md-12  text-center">
                  <div className="btn-page mt-5">
                    <Button variant="primary btn-rounded" type="submit">
                      Update Brand
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapForm>
  );
};

export default id;
