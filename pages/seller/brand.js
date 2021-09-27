import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { css } from "@emotion/css";
import axios from "axios";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";

import { AppContext } from "../../component/context/app.context";
import usePostAxios from "../../component/hooks/usePostAxios";

// {
//   auth: {
//     isAuth: false,
//     isAdmin: false,
//     isSeller: false,
//   },
//   token: "",
//   user: { email: "", firstName: "" },
//   error: {
//     isError: false,
//     msg: "SOMETHING WENT WRONG",
//   },
// };

const brands = {
  name: "",
  contact: "",
  email: "",
  website: "",
  userType: "",
  description: "",
  isApproved: false,
  isActive: false,
};

// "title":"New Title",
// "message":"New message",
// "img":"fr",
// "qty":2,
// "unit":"6135b8db590c5a0389788d9c",
// "buyer":"613850ac884ea6aeb9c7a187",
// "city":"613871d3eee75a8d2b93ab68",
// "state":"61386ee9f6b146bd2add71b9",
// "country":"61386717acf6d47a9e924940",
// "sellerType":"6144ba1e60d63c513571f4e4",
// "parentType":"6144ba1e60d63c513571f4e4",
// "parentCatagory":"6144ba1e60d63c513571f4e4"

const brand = () => {
  const { token } = useContext(AppContext);
  let tokens;
  const url = "http://localhost:4000";
  const [b, setB] = useState(brands);
  const [img, setImg] = useState("");

  const { isLoading: sendLoad, postData } = usePostAxios("/addBrand");

  useEffect(() => {
    tokens = token;
  }, []);

  const handleSubmit = async (val) => {
    // push("/admin/parameter/parent-group");
  };

  const addBrand = async (e) => {
    if (tokens) {
      // e.preventDefault();
      // console.log(desc)
      // const adds = await axios.post(`${url}/addBrand`,b,{
      //   headers:{
      //     authorization: token
      //   }
      // });

      const data = new FormData();

      data.append("name", b.name);
      data.append("img", img);
      data.append("contact", b.contact);
      data.append("isActive", b.isActive);
      data.append("isApproved", b.isApproved);
      data.append("website", b.website);
      data.append("email", b.email);
      data.append("userType", b.userType);
      data.append("description", b.description);

      await postData(data);
    }

    if (adds.status === 201) {
      console.log("Brand Added");
      window.location.reload();
    }
  };

  const onInputChange = (e) => {
    console.log(b);
    setB({ ...b, [e.target.name]: e.target.value });
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
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Contact Number</FormLabel>
                        <FormControl
                          name="contact"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Website</FormLabel>
                        <FormControl
                          name="website"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-6 col-lg-6">
                        <FormLabel> Email Id</FormLabel>
                        <FormControl
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="email"
                          onChange={(e) => onInputChange(e)}
                        />
                      </FormGroup>

                      <FormGroup className="col-md-12 col-lg-12">
                        <FormLabel>Brand Info</FormLabel>
                        <div className="summernote">
                          <Editor
                            onEditorChange={(newValue, editor) => {
                              // setText(editor.getContent({format: 'text'}));
                              setB({
                                ...initValue,
                                ["description"]: editor.getContent({
                                  format: "text",
                                }),
                              });
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
                      <i
                        className="flaticon-381-photo-camera"
                        style={{ fontSize: "34px" }}
                      ></i>
                    </div>
                  </div>

                  <FormGroup className="col-md-12  text-center">
                    <div className="btn-page mt-5">
                      <Button
                        variant="primary btn-rounded"
                        type="button"
                        onClick={(e) => addBrand(e)}
                      >
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
