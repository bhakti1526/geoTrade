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
import WrapForm from "../../../../src/components/admin/WrapForm";
import AppLoader from "../../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";

const initValues = {
  name: "",
  img: "",
  price: "",
  tax: "",
  note: "",
  duration: "",
  description: "",
  isPost: false,
  postCount: "",
  isLead: false,
  leadCount: "",
  canAddBrand: false,
  isCategoryPriority: false,
  vcnFeature: false,
  vssFeature: false,
  isActive: true,
};

const add = () => {
  const [img, setImg] = useState(null);
  const [taxArray, setTaxArray] = useState([]);

  const { push } = useRouter();

  const { isLoading: taxLoad, response: texRes } = useFetchAxios("/getTax");
  const { isLoading, postData } = usePostAxios("/addPackage");

  useEffect(() => {
    setTaxArray(texRes);
  }, [texRes]);

  if (taxLoad === true) return <AppLoader />;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    img: Yup.mixed()
      .required("A file is required")
      .test("fileFormat", "image only", () => {
        if (img === null || img === undefined) return false;
        return img.type === "image/png"
          ? true
          : img.type === "image/jpeg"
          ? true
          : false;
      }),
    price: Yup.number().min(0).required(),
    tax: Yup.string().required(),
    note: Yup.string().required(),
    duration: Yup.number().min(1).required(),
    description: Yup.string().required(),
    isPost: Yup.bool().oneOf([true, false]),
    postCount: Yup.number().min(0).required(),
    isLead: Yup.bool().oneOf([true, false]),
    leadCount: Yup.number().min(0).required(),
    canAddBrand: Yup.bool().oneOf([true, false]),
    isCategoryPriority: Yup.bool().oneOf([true, false]),
    vcnFeature: Yup.bool().oneOf([true, false]),
    vssFeature: Yup.bool().oneOf([true, false]),
    isActive: Yup.bool().oneOf([true, false]),
  });

  const percentage = (partialValue, totalValue) => {
    const perValue = parseInt((partialValue * totalValue) / 100);
    return parseInt(perValue) + parseInt(totalValue);
  };

  const handleSubmit = async (val) => {
    const formData = new FormData();

    const texVal = texRes.find((x) => x._id === val.tax).taxValue;

    formData.append("name", val.name);
    formData.append("img", img);
    formData.append("price", val.price);
    formData.append("name", val.name);
    formData.append("tax", val.tax);
    formData.append("sellCost", percentage(texVal, val.price));
    formData.append("note", val.note);
    formData.append("duration", val.duration);
    formData.append("description", val.description);
    formData.append("isPost", val.isPost);
    formData.append("postCount", val.postCount);
    formData.append("isLead", val.isLead);
    formData.append("leadCount", val.leadCount);
    formData.append("canAddBrand", val.canAddBrand);
    formData.append("isCategoryPriority", val.isCategoryPriority);
    formData.append("vcnFeature", val.vcnFeature);
    formData.append("vssFeature", val.vssFeature);
    formData.append("isActive", val.isActive);

    await postData(formData);

    push("/admin/subscription/manage-package");
  };

  return (
    <WrapForm title="add package">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initValues}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          touched,
          errors,
        }) => {
          return (
            <>
              <Form
                onSubmit={handleSubmit}
                onChange={handleChange}
                className="row"
              >
                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Package Name</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="name"
                    value={values.name}
                    isInvalid={!!touched.name && !!errors.name}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Package Price</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="price"
                    value={values.price}
                    isInvalid={!!touched.price && !!errors.price}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Package Image</FormLabel>
                  <FormControl
                    type="file"
                    className="form-control"
                    accept="image/*"
                    name="img"
                    onChange={(e) => setImg(e.target.files[0])}
                    isInvalid={!!touched.img && !!errors.img}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Tax</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="tax"
                    value={values.tax}
                    isInvalid={!!touched.tax && !!errors.tax}
                    as="select"
                  >
                    <option>option</option>
                    {taxArray.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.country.name} - ({x.name}) - ({x.taxValue}%)
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Package Duration (in day)</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="duration"
                    value={values.duration}
                    isInvalid={!!touched.duration && !!errors.duration}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Note</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="note"
                    value={values.note}
                    isInvalid={!!touched.note && !!errors.note}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 col-lg-12">
                  <FormLabel> package description </FormLabel>
                  <div className="summernote">
                    <Editor
                      onChange={(e) =>
                        setFieldValue("description", e.target.getContent())
                      }
                    />
                  </div>
                </FormGroup>

                <div className="col-md-12">
                  <div className="row">
                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Is Lead Available</FormLabel>
                      <FormCheck
                        name="isLead"
                        type="checkbox"
                        label="yes or no"
                        checked={values.isLead}
                        isInvalid={!!touched.isLead && !!errors.isLead}
                        onChange={() => setFieldValue("isLead", !values.isLead)}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Lead Count</FormLabel>
                      <FormControl
                        type="text"
                        className="form-control"
                        name="leadCount"
                        value={values.leadCount}
                        isInvalid={!!touched.leadCount && !!errors.leadCount}
                      />
                    </FormGroup>
                  </div>

                  <div className="row">
                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Is Post Available</FormLabel>
                      <FormCheck
                        name="isPost"
                        type="checkbox"
                        label="yes or no"
                        value={values.isPost}
                        isInvalid={!!touched.isPost && !!errors.isPost}
                        onChange={() => setFieldValue("isPost", !values.isPost)}
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Post Count</FormLabel>
                      <FormControl
                        type="text"
                        className="form-control"
                        name="postCount"
                        value={values.postCount}
                        isInvalid={!!touched.postCount && !!errors.postCount}
                      />
                    </FormGroup>
                  </div>

                  <div className="row">
                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Can Add Brand</FormLabel>
                      <FormCheck
                        name="canAddBrand"
                        type="checkbox"
                        label="yes or no"
                        value={values.canAddBrand}
                        isInvalid={
                          !!touched.canAddBrand && !!errors.canAddBrand
                        }
                        onChange={() =>
                          setFieldValue("canAddBrand", !values.canAddBrand)
                        }
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> Category Priority</FormLabel>
                      <FormCheck
                        name="isCategoryPriority"
                        type="checkbox"
                        label="yes or no"
                        value={values.isCategoryPriority}
                        isInvalid={
                          !!touched.isCategoryPriority &&
                          !!errors.isCategoryPriority
                        }
                        onChange={() =>
                          setFieldValue(
                            "isCategoryPriority",
                            !values.isCategoryPriority
                          )
                        }
                      />
                    </FormGroup>
                  </div>

                  <div className="row">
                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> View Contact Feture</FormLabel>
                      <FormCheck
                        name="vcnFeature"
                        type="checkbox"
                        label="yes or no"
                        value={values.vcnFeature}
                        isInvalid={!!touched.vcnFeature && !!errors.vcnFeature}
                        onChange={() =>
                          setFieldValue("vcnFeature", !values.vcnFeature)
                        }
                      />
                    </FormGroup>

                    <FormGroup className="col-md-6 col-lg-4">
                      <FormLabel> View Social Sharing Feture</FormLabel>
                      <FormCheck
                        name="vssFeature"
                        type="checkbox"
                        label="yes or no"
                        value={values.vssFeature}
                        isInvalid={!!touched.vssFeature && !!errors.vssFeature}
                        onChange={() =>
                          setFieldValue("vssFeature", !values.vssFeature)
                        }
                      />
                    </FormGroup>
                  </div>
                </div>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> status</FormLabel>
                  <FormCheck
                    name="isActive"
                    type="checkbox"
                    label="active or inactive"
                    value={values.isActive}
                    isInvalid={!!touched.isActive && !!errors.isActive}
                    onChange={() => setFieldValue("isActive", !values.isActive)}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 btn-page text-center">
                  <Button
                    disabled={isLoading}
                    variant="primary btn-rounded"
                    type="submit"
                  >
                    Add Package
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

export default add;
