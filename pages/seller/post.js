import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import WrapFrom from "../../src/components/admin/WrapForm";
import usePostAxios from "../../component/hooks/usePostAxios";

const imgStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  border: 1px solid rgb(212, 217, 222);
  width: 80%;
`;

const initData = {
  name: "",
  description: "",
  sellerType: "",
  parentType: "",
  parentCategory: "",
  brand: "",
  unit: "",
  price: "",
  img: "",
};

const post = () => {
  const [img, setImg] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    sellerType: Yup.string().required(),
    parentType: Yup.string().required(),
    parentCategory: Yup.string().required(),
    brand: Yup.string().required(),
    unit: Yup.string().required(),
    price: Yup.string().required(),
    img: Yup.mixed()
      .required("A file is required")
      .test("fileFormat", "image only", () => {
        if (imgs === null || imgs === undefined) return false;
        return imgs.type === "image/png"
          ? true
          : imgs.type === "image/jpeg"
          ? true
          : false;
      }),
  });

  const { response, postData, isLoading } = usePostAxios("/addPost");

  const { push } = useRouter();

  const handleSubmit = async (val) => {
    console.log("xD");
    const data = new FormData();
    data.append("name", val.name);
    data.append("img", imgs);
    data.append("description", val.description);
    data.append("price", val.price);
    data.append("parentCategory", val.parentCategory);
    data.append("parentType", val.parentType);
    data.append("sellerType", val.sellerType);
    data.append("unit", val.unit);
    data.append("brand", val.brand);

    await postData(data);

    push("/seller/post");
  };

  const [parentGroup, setParentGroup] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [sellerTypes, setSellerType] = useState([]);
  const [brand, setBrand] = useState([]);
  const [unit, setUnit] = useState([]);
  const [initValue, setInitValue] = useState(initData);
  const [initialOpt, setInitialOpt] = useState();

  return (
    <WrapFrom title="add post">
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={initData}
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
                        isInvalid={!!touched.name && !!errors.name}
                        // onChange={(e) => onInputChange(e)}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-12 col-lg-12">
                      <FormLabel> Porduct Info </FormLabel>
                      <div className="summernote">
                        <Editor
                          onEditorChange={(newValue, editor) => {
                            // setValue(newValue);
                            setFieldValue(
                              "description",
                              editor.getContent({ format: "text" })
                            );
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

                        // onChange={(e) => onInputChange(e)}
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
                        // onChange={(e) => onInputChange(e)}
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
                        isInvalid={!!touched.price && !!errors.price}
                        // onChange={(e) => onInputChange(e)}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Unit</FormLabel>
                      <Form.Control
                        isInvalid={!!touched.unit && !!errors.unit}
                        as="select"
                        name="unit"
                        defaultValue="Choose..."
                        // onChange={(e) => onInputChange(e)}
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
                    <FormControl
                      name="img"
                      type="file"
                      className="form-control"
                      accept="image/*"
                      style={{
                        display: "none",
                      }}
                      onChange={(e) => setImgs(e.target.files[0])}
                      // isInvalid={
                      //   !!touched && !!errors.parentGroupImg
                      // }
                      isInvalid={!!touched.img && !!errors.img}
                    />

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
//`https://react-bootstrap.netlify.app/components/forms/#forms-validation-libraries`

//for dropdown
// use formcontrol with as="select" and it will automatically get the value

//use some hooks i created so its easy to manage all api call url
//and also use fromik for form validation so u don't have to manage multiple
//  state for geting multiple value
