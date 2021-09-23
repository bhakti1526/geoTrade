import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
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
import { set } from "date-fns";

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
  const initData = {
    name: "",
    description: "",
    sellerType: "",
    parentType: "",
    parentCategory: "",
    brand: "",
    unit: "",
    price: 0,
  };
  const [parentGroup, setParentGroup] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [sellerTypes, setSellerType] = useState([]);
  const [brand, setBrand] = useState([]);
  const [unit, setUnit] = useState([]);
  const [initValue, setInitValue] = useState(initData);
  const [initialOpt, setInitialOpt] = useState();

  const onInputChange = (e) => {
    setInitValue({ ...initValue, [e.target.name]: e.target.value });
  };

  const url = process.env.NEXT_PUBLIC_API_URL;

  const getReqData = async () => {
    const pc = await axios.get(`${url}/getParentCategory`);
    if (pc.status === 201) {
      console.log(pc.data.data);
      setParentCategory(pc.data.data);
    }

    const st = await axios.get(`${url}/getSellerType`);
    if (st.status === 201) {
      console.log(st.data.data);
      setSellerType(st.data.data);
      setInitialOpt(st.data.data[0]._id);
    }

    const pg = await axios.get(`${url}/getParentGroup`);
    if (pg.status === 201) {
      console.log(pg.data.data);
      setParentGroup(pg.data.data);
      // setInitValue({...initValue,['parentCategory']:pg.data.data[0]._id})
    }

    const b = await axios.get(`${url}/getBrands`);
    if (b.status === 201) {
      console.log(b.data.data);
      setBrand(b.data.data);
    }

    const u = await axios.get(`${url}/getUnits`);
    if (u.status === 201) {
      console.log(u.data.data);
      setUnit(u.data.data);
    }

    // console.log(sellerTypes);
  };

  const addPost = async (e) => {
    e.preventDefault();
    const ap = await axios.post(`${url}/addPost`, initValue, {
      headers: {
        // authorization: localStorage.getItem("jwt"),
      authorization:(JSON.parse(window?.localStorage?.getItem("USERINFO"))).token
      },
    });

    if (ap.status === 201) {
      window.location.reload();
      console.log("Post Added");
    }
  };

  useEffect(() => {
    getReqData();
  }, []);

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
        {({
          handleSubmit,
          handleChange,
          values,
          setFieldValue,
          errors,
          touched,
        }) => {
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
                      <FormLabel> Product Name</FormLabel>
                      <FormControl
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => onInputChange(e)}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-lg-12">
                      <FormLabel> Brand Info </FormLabel>
                      <div className="summernote">
                        <Editor
                          onEditorChange={(newValue, editor) => {
                            // setText(editor.getContent({format: 'text'}));
                            setInitValue({
                              ...initValue,
                              ["description"]: editor.getContent({
                                format: "text",
                              }),
                            });
                          }}
                          // onChange={(e) =>
                          //   // setFieldValue("description", e.target.getContent())

                          // }
                        />
                      </div>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Seller Type</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.sellerType && !!errors.sellerType}
                        as="select"
                        name="sellerType"
                        onChange={(e) => onInputChange(e)}
                      >
                        <option>Choosee....</option>

                        {sellerTypes.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.sellerTypeName}
                          </option>
                        ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Parent type</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.parentType && !!errors.parentType}
                        name="parentType"
                        as="select"
                        defaultValue="Choose..."
                        onChange={(e) => onInputChange(e)}
                      >
                        <option>Choosee....</option>
                        {parentGroup.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.parentGroupName}
                          </option>
                        ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Parent Category</FormLabel>
                      <Form.Control
                        isInvalid={
                          !!touched.parentCategory && !!errors.parentCategory
                        }
                        as="select"
                        name="parentCategory"
                        defaultValue="Choose..."
                        onChange={(e) => onInputChange(e)}
                      >
                        <option>Choosee....</option>
                        {parentCategory.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.parentCategoryName}
                          </option>
                        ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel>Brand</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.brand && !!errors.brand}
                        as="select"
                        name="brand"
                        defaultValue={(e) => e.target.value}
                        onChange={(e) => onInputChange(e)}
                      >
                        <option>Choosee....</option>
                        {brand.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                      </Form.Control>
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Price</FormLabel>
                      <FormControl
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="price"
                        onChange={(e) => onInputChange(e)}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Unit</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.unit && !!errors.unit}
                        as="select"
                        name="unit"
                        defaultValue="Choose..."
                        onChange={(e) => onInputChange(e)}
                      >
                        <option>Choosee....</option>
                        {unit.map((ui) => (
                          <option key={ui._id} value={ui._id}>
                            {ui.name}
                          </option>
                        ))}
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
                    <Button
                      variant="primary btn-rounded"
                      type="submit"
                      onClick={(e) => addPost(e)}
                    >
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
//`https://react-bootstrap.netlify.app/components/forms/#forms-validation-libraries`

//for dropdown
// use formcontrol with as="select" and it will automatically get the value

//use some hooks i created so its easy to manage all api call url
//and also use fromik for form validation so u don't have to manage multiple
//  state for geting multiple value
