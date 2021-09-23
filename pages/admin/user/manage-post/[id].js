import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormLabel,
  FormCheck,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import WrapForm from "../../../../src/components/admin/WrapForm";
import AppLoader from "../../../../src/components/admin/AppLoader";

const validatinSchema = Yup.object().shape({
  name: Yup.string().required(),
  img: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().min(1).required(),
  unit: Yup.string().required(),
  brand: Yup.string().required(),
  sellerType: Yup.string().required(),
  parentCategory: Yup.string().required(),
  parentGroup: Yup.string().required(),
  isAdminApproved: Yup.bool().oneOf([true, false]).required(),
  isActive: Yup.bool().oneOf([true, false]).required(),
});

const id = () => {
  const [img, setImg] = useState(null);
  const [unitList, setUnitList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [sellerTypeList, setSellerTypeList] = useState([]);
  const [parentGroupList, setParentGroupList] = useState([]);
  const [parentCategoryList, setParentCategoryList] = useState([]);

  const [initSchema, setInitSchema] = useState({
    name: "",
    img: "",
    description: "",
    price: "",
    unit: "",
    brand: "",
    sellerType: "",
    parentCategory: "",
    parentGroup: "",
    isAdminApproved: false,
    isActive: true,
  });

  const {
    query: { id },
  } = useRouter();

  const { isLoading: productLoad, response: productRes } = useFetchAxios(
    `/getPost?id=${id}`
  );

  const { isLoading: unitLoad, response: unitRes } = useFetchAxios("/getUnits");
  const { isLoading: sellerLoad, response: sellerRes } =
    useFetchAxios("/getSellerType");
  const { isLoading: parentLoad, response: categoryRes } =
    useFetchAxios("/getParentCategory");
  const { isLoading: parentGroupLoad, response: groupRes } =
    useFetchAxios("/getParentGroup");

  useEffect(() => {
    setInitSchema({
      ...productRes,
      parentCategory: productRes?.parentCategory?._id,
      parentGroup: productRes?.parentGroup?._id,
      sellerType: productRes?.sellerType?._id,
      unit: productRes?.unit?._id,
    });
  }, [productRes]);

  useEffect(() => {
    setUnitList(unitRes);
  }, [unitRes]);

  useEffect(() => {
    setSellerTypeList(sellerRes);
  }, [sellerRes]);

  useEffect(() => {
    setParentCategoryList(categoryRes);
  }, [categoryRes]);

  useEffect(() => {
    setParentGroupList(groupRes);
  }, [groupRes]);

  if (productLoad === true) return <AppLoader />;
  if (unitLoad === true) return <AppLoader />;
  if (sellerLoad === true) return <AppLoader />;
  if (parentLoad === true) return <AppLoader />;
  if (parentGroupLoad === true) return <AppLoader />;

  const handleSubmit = async (val) => {
    if (img !== null && img !== undefined) {
      const formData = new FormData();
      formData.append("img", img);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
        .then((res) => {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/updatePost`, {
              ...val,
              parentGroupImg: res.data.data,
            })
            .then((res) => {
              push("/admin/user/manage-post");
            });
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/updatePost`, {
          ...val,
        })
        .then((res) => {
          push("/admin/user/manage-post");
        });
    }
  };

  return (
    <WrapForm title="update post">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validatinSchema}
        initialValues={initSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue,
        }) => {
          return (
            <>
              <Form
                onSubmit={handleSubmit}
                onChange={handleChange}
                className="row"
              >
                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Product Name</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="name"
                    value={values.name}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Product Image</FormLabel>
                  <FormControl
                    name="img"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                    isInvalid={!!touched.img && !!errors.img}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 col-lg-12">
                  <FormLabel> Post Description</FormLabel>
                  <div className="summernote">
                    <Editor
                      initialValue={values.description}
                      onChange={(e) =>
                        setFieldValue("description", e.target.getContent())
                      }
                    />
                  </div>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Price</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="price"
                    value={values.price}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Choose Unit</FormLabel>
                  <Form.Control value={values.unit} as="select">
                    <option>select</option>
                    {unitList.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.name}
                      </option>
                    ))}
                  </Form.Control>
                </FormGroup>

                {/* <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Choose Brand</FormLabel>
                  <Form.Control as="select">
                    <option>select</option>
                    {brandList.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.name}
                      </option>
                    ))}
                  </Form.Control>
                </FormGroup> */}

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Choose Seller Type</FormLabel>
                  <Form.Control value={values.sellerType} as="select">
                    <option>select</option>
                    {sellerTypeList.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.sellerTypeName}
                      </option>
                    ))}
                  </Form.Control>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Parent Group</FormLabel>
                  <Form.Control value={values.parentGroup} as="select">
                    <option>select</option>
                    {parentGroupList.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.parentGroupName}
                      </option>
                    ))}
                  </Form.Control>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Parent Category</FormLabel>
                  {console.log(values.parentCategory)}
                  <Form.Control value={values.parentCategory} as="select">
                    <option>select</option>
                    {parentCategoryList.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.parentCatagoryName}
                      </option>
                    ))}
                  </Form.Control>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Admin Approved</FormLabel>
                  <FormCheck
                    checked={values.isAdminApproved}
                    onClick={() =>
                      setFieldValue("isAdminApproved", !values.isAdminApproved)
                    }
                    type="checkbox"
                    label="active or inactive"
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Status</FormLabel>
                  <FormCheck
                    checked={values.isActive}
                    onClick={() => setFieldValue("isActive", !values.isActive)}
                    type="checkbox"
                    label="active or inactive"
                  />
                </FormGroup>

                <FormGroup className="col-md-12 btn-page text-center">
                  <Button variant="primary btn-rounded" type="submit">
                    Update Post
                  </Button>
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
