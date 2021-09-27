import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { css } from "@emotion/css";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import {AppContext} from '../../component/context/app.context';
import axios from "axios";
import { Link } from "@material-ui/core";
import usePostAxios from "../../component/hooks/usePostAxios";
import { useRouter } from "next/router";


const productDetails = {
  name: "",
  slug: "",
  price: "",
  description: "",
  img:""
};


const product = () => {
  // let tokens;
  const[imgs,setImgs]=useState("");
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    slug: Yup.string().required(),
    description:Yup.string().required(),
    img: Yup.mixed()
    .required("A file is required")
    .test("fileFormat", "image only", () => {
      if (imgs === null || imgs === undefined) return false;
      return imgs.type === "image/png"
        ? true
        : imgs.type === "image/jpeg"
        ? true
        : false;
    })
  });

  const { response, postData, isLoading } = usePostAxios("/addProduct");

  const {push} = useRouter();

  
  const handleSubmit = async (val) => {
    // if(tokens){

      console.log("xD")
      const data = new FormData();
      data.append("name", val.name);
      data.append("img", imgs);
      data.append("price", val.price);
      data.append("slug", val.slug);
      data.append("description", val.description);
      await postData(data);
  
    // }


    push("/seller/product");
  };
  
  

  useEffect(()=>{
    // const {token} = useContext(AppContext);
    // tokens = token;
  },[]);



  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Product</h4>
            </div>
            <div className="card-body">
            <div className="basic-form">

              <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={productDetails}
      >
      {({ handleSubmit, handleChange, values, errors, touched,setFieldValue }) => {
          return (
          //   <Form
          //   className="row"
          //   onChange={handleChange}
          //   onSubmit={handleSubmit}
          // >
                <div className="row">
                  <div className="col-md-6">
                    <div className="row m-0">
                      <div className="col-4 col-md-3 col-lg-2 p-0">
                        <div className="images-upload-part">
                          <Link to="#" id="OpenImgUpload" title="Upload Image">
                            <div className="add-photo-01">
                              <i className="flaticon-381-photo-camera"></i>
                              <p>Add</p>
                            </div>
                          </Link>
                          <FormControl
                            type="file"
                            id="imgupload"
                            style={{ display: "none" }}
                          />
                        </div>
                        <div className="add-photo-01">
                          <i className="flaticon-381-photo-camera"></i>
                          <p>Add</p>
                        </div>
                        <div className="add-photo-01">
                          <i className="flaticon-381-photo-camera"></i>
                          <p>Add</p>
                        </div>
                        <div className="add-photo-01">
                          <i className="flaticon-381-photo-camera"></i>
                          <p>Add</p>
                        </div>
                        <div className="add-photo-01">
                          <i className="flaticon-381-photo-camera"></i>
                          <p>Add</p>
                        </div>
                      </div>
                      <div className="col-8 col-md-9 col-lg-9 p-0">
                        <div className="big-photo-add">
                          <div className="add-photo-02">
                            {/* <i className="flaticon-381-photo-camera"></i> */}
                            <p>Add Photos</p>
                           
                          </div>
                        </div>
                        <div className="row m-0">
                          <div className="col-md-6 p-0">
                            <div className="add-photo-01">
                              <i class="fab fa-youtube"></i>
                              <p>Add Video</p>
                            </div>
                          </div>
                          <div className="col-md-6 p-0">
                            <div className="add-photo-01">
                              <i class="far fa-file-pdf"></i>
                              <p>Add PDF</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mt-2">
                          <Link to="#">
                            <i className="far fa-lightbulb pr-1"></i> Tips
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <Form className="row align-items-center mt-4 mt-md-0"  onChange={handleChange}
            onSubmit={handleSubmit}  >
               <FormControl
                            name="img"
                            type="file"
                            className="form-control"
                            accept="image/*"
                              onChange={(e) => setImgs(e.target.files[0])}
                              // style={{ display: "none" }}
                            />
                      <FormGroup className="form-group col-md-12">
                        <FormLabel>Product/Service Name</FormLabel>
                        <FormControl
                          name="name"
                          // onChange={(e) => onInputChange(e)}
                          type="text"
                          className="form-control"
                          placeholder=""
                          isInvalid={
                            !!touched.name && !!errors.name
                          }
                        />
                      </FormGroup>
                      <FormGroup className="form-group col-md-5 tag-price mt-2">
                        <FormLabel>Price</FormLabel>
                        <i className="fas fa-rupee-sign"></i>
                        <FormControl
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="price"
                          isInvalid={
                            !!touched.price && !!errors.price
                          }
                          // onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>
                      <FormGroup className="form-group col-md-2">
                        <FormLabel className="d-none d-md-block">
                          &nbsp;
                        </FormLabel>
                        <p className="mb-0 text-center">-per-</p>
                      </FormGroup>
                      <FormGroup className="form-group col-md-5">
                        <FormLabel className="d-none d-md-block">
                          &nbsp;
                        </FormLabel>
                        <FormControl
                          type="text"
                          name="slug"
                          // onChange={(e) => onInputChange(e)}
                          className="form-control"
                          placeholder="Ex - Pair, Piece etc"
                          isInvalid={
                            !!touched.slug && !!errors.slug
                          }
                        />
                      </FormGroup>
                      <FormGroup className="form-group col-md-12 mt-3">
                        <FormLabel className="d-block">
                          Product/Service Description
                          <small className="text-right text-secondary float-right">
                            Uses, Details, Benefits, etc.
                          </small>
                        </FormLabel>
                        <div className="summernote">
                          <Editor
                            // onEditorChange={(newValue, editor) => {
                            //   setProducts({
                            //     ...products,
                            //     ["description"]: editor.getContent({
                            //       format: "text",
                            //     }),
                            //   });
                            // }}
                            // onChange={(e) =>
                            //   setFieldValue("description", e.target.getContent())
                            // }
                            onEditorChange={(newValue, editor) => {
                              // setValue(newValue);
                              setFieldValue("description",editor.getContent({format: 'text'}));
                            }}
                          />
                        </div>
                        <small className="d-block mt-2 text-right float-right text-secondary">
                          0 character (maximum of 4000) including formatting.
                        </small>
                      </FormGroup>

                      <FormGroup className="form-group col-md-12 mt-3">
                        <div className="float-right">
                          <Button className="btn btn-success" type="submit">
                            Save and Continue
                            <i class="fas fa-arrow-right pl-1"></i>
                          </Button>
                        </div>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
                // </Form>
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

export default product;
