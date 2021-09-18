import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";

import { css } from "@emotion/css";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import WrapFrom from "../../src/components/admin/WrapForm";
import useFetchAxios from "../../component/hooks/useFetchAxios";

const imgStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  border: 1px solid rgb(212, 217, 222);
  width: 80%;
`;

// do not post image because it is not implemented so this will be ignored

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  sellerType: Yup.string().required(),
  parentType: Yup.string().required(),
  parentCategory: Yup.string().required(),
  brand: Yup.string().required(),
  unit: Yup.string().required(),
});

const post = () => {
  const [initValue, setInitValue] = useState({
    name: "",
    description: "",
    sellerType: "",
    parentType: "",
    parentCategory: "",
    brand: "",
    unit: "",
  });

  // const { response: res } = useFetchAxios("/getseller");

  // useEffect(() => {
  //   setInitValue({
  //     name: res.name,
  //     description: res.description,
  //     sellerType: res.sellerType,
  //     parentType: res.parentType,
  //     parentCategory: res.parentCategory,
  //     brand: res.brand,
  //     unit: res.unit,
  //   });
  // }, [res]);

  return (
    <WrapFrom title="add post">
      <Formik
        enableReinitialize
        //above line enable them to state update so form can re-render
        initialValues={initValue}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => {
          return (
            <>
              <Form
                className="row"
                onChange={handleChange}
                onSubmit={handleSubmit}
              >
                <div className="col-md-8">
                  <div className="row">
                    <FormGroup className="col-md-12 col-lg-6">
                      <FormLabel> Product name</FormLabel>
                      <FormControl
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-lg-12">
                      <FormLabel> Brand Info </FormLabel>
                      <div className="summernote">
                        <Editor
                          onChange={(e) =>
                            setFieldValue("description", e.target.getContent())
                          }
                        />
                      </div>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Seller Type</FormLabel>
                      <Form.Control
                        as="select"
                        name="sellerType"
                        defaultValue="Choose..."
                      >
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Parent type</FormLabel>
                      <Form.Control
                        name="parentType"
                        as="select"
                        defaultValue="Choose..."
                      >
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Parent Category</FormLabel>
                      <Form.Control
                        as="select"
                        name="parentCategory"
                        defaultValue="Choose..."
                      >
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> brnad</FormLabel>
                      <Form.Control
                        as="select"
                        name="brand"
                        defaultValue="Choose..."
                      >
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Price</FormLabel>
                      <FormControl
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Unit</FormLabel>
                      <Form.Control
                        as="select"
                        name="unit"
                        defaultValue="Choose..."
                      >
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Control>
                    </FormGroup>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className={imgStyle}>
                    <i
                      className="flaticon-381-photo-camera"
                      style={{ fontSize: "34px" }}
                    ></i>
                  </div>
                </div>

                <FormGroup className="col-md-12  text-center">
                  <div className="btn-page mt-5">
                    <Button variant="primary btn-rounded" type="submit">
                      Add Post
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </>
          );
        }}
      </Formik>
    </WrapFrom>
  );
};

export default post;

// u can check other codes in admin/state/add i implement it with formik
// and there is also other code in unit so u can check out how to update
// value based on fatching value

//for formik
// go to this url u will get implementation of react-bootstrap and formik
//https://react-bootstrap.netlify.app/components/forms/#forms-validation-libraries

//for dropdown
// use formcontrol with as="select" and it will automatically get the value

//use some hooks i created so its easy to manage all api call url
//and also use fromik for form validation so u don't have to manage multiple
//  state for geting multiple value
