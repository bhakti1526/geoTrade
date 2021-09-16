import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { css } from "@emotion/css";
import axios from 'axios';
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";

const brands={
  name:"",
  img:"",
  contact:"",
  email:"",
  website:"",
  userType:"",
  isApproved:false
};

const brand = () => {
  const url ="http://localhost:4000";
  const [b,setB] = useState(brands);
  const[desc,setDesc] = useState("");

  const addBrand=async(e)=>{
    e.preventDefault();
    console.log(desc)
    const adds = await axios.post(`${url}/addBrand`,{b,desc});

    if(adds.status===201){
      console.log("Brand Added");
      window.location.reload();
    }
  }

  const onInputChange=(e)=>{
    console.log(b);
    setB({...b,[e.target.name]:e.target.value})
  }

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
                <Form className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Brand Name</FormLabel>
                        <FormControl
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder=""
                          onChange={(e)=>onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Contact Number</FormLabel>
                        <FormControl
                          name="contact"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e)=>onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Website</FormLabel>
                        <FormControl
                          name="website"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e)=>onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Email Id</FormLabel>
                        <FormControl
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="email"
                          onChange={(e)=>onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-12 col-lg-12">
                        <FormLabel>Brand Info</FormLabel>
                        <div className="summernote">
                          <Editor onEditorChange={(newValue, editor) => {
        
        setDesc(editor.getContent({format: 'text'}));
      }}  value={desc}/>
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
                      <i
                        className="flaticon-381-photo-camera"
                        style={{ fontSize: "34px" }}
                      ></i>
                    </div>
                  </div>

                  <FormGroup className="col-md-12  text-center">
                    <div className="btn-page mt-5">
                      <Button variant="primary btn-rounded" type="button" onClick={(e)=>addBrand(e)}>
                        Update Brand
                      </Button>
                    </div>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default brand;
