import React, {useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import { css } from "@emotion/css";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";

const post = () => {


    const [selectOption, setSelectOption] = useState(null);
    const options = [
      { value: "Traders & Suppliers", label: "Traders & Suppliers" },
      { value: "Manufacturer", label: "Manufacturer" },
    ];

    const [selectOption1, setSelectOption1] = useState(null);
    const options1 = [
      { value: "Sand and Gravel", label: "Sand and Gravel" },
    ];

    const [selectOption2, setSelectOption2] = useState(null);
    const options2 = [
      { value: "Sand and Gravel", label: "Sand and Gravel" },
    ];

    const [selectOption3, setSelectOption3] = useState(null);
    const options3 = [
        { value: "kg", label: "kg" },
        { value: "cm", label: "cm" },
        { value: "ton", label: "ton" },
    ];


    return (
        <div>
            
            <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Post</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <Form className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <FormGroup className="col-md-12 col-lg-6">
                        <FormLabel> Product name</FormLabel>
                        <FormControl
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </FormGroup>

                      <FormGroup className="col-md-12 col-lg-12">
                        <FormLabel> Brand Info </FormLabel>
                        <div className="summernote">
                          {" "}
                          <Editor />{" "}
                        </div>
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-4">
                        <FormLabel> Seller Type</FormLabel>
                        <Select placeholder="Manufacturer" className=""
                                 defaultValue={selectOption}
                                 onChange={setSelectOption}
                                 options={options}
                                />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-4">
                        <FormLabel> Parent Group</FormLabel>
                        <Select placeholder="Sand and Gravel" className=""
                                 defaultValue={selectOption1}
                                 onChange={setSelectOption1}
                                 options={options1}
                                />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-4">
                        <FormLabel> Parent Category</FormLabel>
                        <Select placeholder="Sand and Gravel" className=""
                                 defaultValue={selectOption2}
                                 onChange={setSelectOption2}
                                 options={options2}
                                />
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
                        <Select placeholder="kg" className=""
                                 defaultValue={selectOption3}
                                 onChange={setSelectOption3}
                                 options={options3}
                                />
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
                      <Button variant="primary btn-rounded" type="button">
                      Add Post
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
    )
}

export default post
