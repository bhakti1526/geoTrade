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

const update = () => {
  const [img, setImg] = useState(null);
  const [taxArray, setTaxArray] = useState([]);

  const [initValues, setInitValues] = useState({
    name: "",
    img: "",
    price: "",
    tax: "",
    sellCost: "",
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
  });

  const {
    push,
    query: { id },
  } = useRouter();

  const { isLoading: taxLoad, response: texRes } = useFetchAxios("/getTax");
  const { isLoading: packageLoad, response: packageRes } = useFetchAxios(
    `/getPackage?id=${id}`
  );

  const { isLoading, postData } = usePostAxios("/addPackage");

  useEffect(() => {
    setTaxArray(texRes);
  }, [texRes]);

  useEffect(() => {
    console.log(packageRes);
    setInitValues({ ...packageRes, tax: packageRes?.tax?._id });
  }, [packageRes]);

  if (taxLoad === true) return <AppLoader />;
  if (packageLoad === true) return <AppLoader />;

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
    price: Yup.number().min(1).required(),
    tax: Yup.string().required(),
    sellCost: Yup.number().min(1).required(),
    note: Yup.string().required(),
    duration: Yup.number().min(1).required(),
    description: Yup.string().required(),
    isPost: Yup.bool().oneOf([true, false]),
    postCount: Yup.number().min(1).required(),
    isLead: Yup.bool().oneOf([true, false]),
    leadCount: Yup.number().min(1).required(),
    canAddBrand: Yup.bool().oneOf([true, false]),
    isCategoryPriority: Yup.bool().oneOf([true, false]),
    vcnFeature: Yup.bool().oneOf([true, false]),
    vssFeature: Yup.bool().oneOf([true, false]),
    isActive: Yup.bool().oneOf([true, false]),
  });

  const handleSubmit = async (val) => {
    const formData = new FormData();

    formData.append("name", val.name);
    formData.append("img", img);
    formData.append("price", val.price);
    formData.append("name", val.name);
    formData.append("tax", val.tax);
    formData.append("sellCost", val.sellCost);
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
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initValues}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => {
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
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Package Price</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="price"
                    value={values.price}
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
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Tax</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="tax"
                    value={values.tax}
                    as="select"
                  >
                    <option>option</option>
                    {taxArray.map((x) => (
                      <option key={x._id} value={x._id}>
                        {x.country.name}({x.taxValue})
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Sell Cost</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="sellCost"
                    value={values.sellCost}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Note</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="note"
                    value={values.note}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-4">
                  <FormLabel> Package Duration</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="duration"
                    value={values.duration}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 col-lg-12">
                  <FormLabel> package description </FormLabel>
                  <div className="summernote">
                    <Editor
                      initialValue={values.description}
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

export default update;
