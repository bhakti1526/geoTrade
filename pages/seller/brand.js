import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { css } from "@emotion/css";
import { Formik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import * as Yup from "yup";
import usePostAxios from "../../component/hooks/usePostAxios";
import {AppContext} from '../../component/context/app.context';


const brands={
  name:"",
  contact:"",
  email:"",
  website:"",
  userType:"",
  description:"",
  isApproved:false,
  isActive:false,
  img:""
};



const brand = () => {
  let tokens;
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [b,setB] = useState(brands);
  const[imgs,setImgs] = useState("");

  
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  contact:Yup.string().required(),
  website:Yup.string().required(),
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

  


  const { response, postData, isLoading } = usePostAxios("/addBrand");

  const { push } = useRouter();


// const setToken=()=>{
//   // const {token} = useContext(AppContext);
//   // tokens = token;
// }

//   useEffect(()=>{
//     // setToken();
//   },[])


  const handleSubmit = async (val) => {
    // if(tokens){
      console.log("xD")
      const data = new FormData();
  
      data.append("name", val.name);
      data.append("img", imgs);
      data.append("contact", val.contact);
      data.append("isActive", val.isActive);
      data.append("isApproved",val.isApproved);
      data.append("website",val.website);
      data.append("email",val.email);
      data.append("userType",val.userType);
      data.append("description",val.description);

  
      await postData(data);
  
    // }

    push("/seller/brand");
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Manage Brand</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
       
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={brands}
      >
        {({ handleSubmit, handleChange, values, errors, touched,setFieldValue }) => {
          return (
                <Form className="row"
                onChange={handleChange}
                onSubmit={handleSubmit}
                >
                  <div className="col-md-8">
                    <div className="row">
                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Brand Name</FormLabel>
                        <FormControl
                          type="text"
                          className="form-control"
                          name="name"
                          value={values.name}
                          placeholder=""
                          isInvalid={!!touched.name && !!errors.name}
                          // onChange={(e) => onInputChange(e)}
                        />



                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Contact Number</FormLabel>
                        <FormControl
                          name="contact"
                          type="text"
                          className="form-control"
                          placeholder=""
                          isInvalid={
                            !!touched.contact && !!errors.contact
                          }
                          // onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Website</FormLabel>
                        <FormControl
                          name="website"
                          type="text"
                          className="form-control"
                          placeholder=""
                          isInvalid={
                            !!touched.website && !!errors.website
                          }
                          // onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>

                

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Email Id</FormLabel>
                        <FormControl
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="email"
                          isInvalid={
                            !!touched.email && !!errors.email
                          }
                        />
                      </FormGroup>

                      <FormGroup className="col-md-12 col-lg-12">
                        <FormLabel>Brand Info</FormLabel>
                        <div className="summernote">
                          <Editor
                            name="description"
                            // onChange={(e) =>
                            //   setFieldValue("description", e.target.getContent())
                            // }
                            onEditorChange={(newValue, editor) => {
                              // setValue(newValue);
                              setFieldValue("description",editor.getContent({format: 'text'}));
                            }}
                          />
                        </div>
                      </FormGroup>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 30vh;
                        border: 1px solid rgb(212, 217, 222);
                        width: 80%;
                      `}
                    >
                            <FormControl
                    name="img"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    // style={{
                    //   display="none"
                    // }}
                    onChange={(e) => setImgs(e.target.files[0])}
                    // isInvalid={
                    //   !!touched && !!errors.parentGroupImg
                    // }
                    isInvalid={
                     !!touched.img && !!errors.img
                    }
                  />
                      {/* <i
                        className="flaticon-381-photo-camera"
                        
                        style={{ fontSize: "34px" }}
                      ></i> */}
                    </div>
                  </div>

                  <FormGroup className="col-md-12  text-center">
                    <div className="btn-page mt-5">
                      <Button
                      // disabled={isLoading}
                        variant="primary btn-rounded"
                        type="submit"
                      >
                        Update Brand
                      </Button>
                    </div>
                  </FormGroup>
                </Form>
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

export default brand;
