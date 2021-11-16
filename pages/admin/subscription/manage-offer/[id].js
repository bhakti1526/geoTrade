import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

import WrapForm from "../../../../src/components/admin/WrapForm";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../../component/hooks/usePostAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";

const update = () => {
  const {
    push,
    query: { id },
  } = useRouter();

  const [initValue, setInitValue] = useState({
    title: "",
    img: "",
    description: "",
    stateDate: "",
    endDate: "",
    offerCode: "",
    offerUseCount: "",
    terms: "",
    offerOnCountry: "",
    offerOnState: "",
    offerOnCity: "",

    offerAmountType: "",
    offerPercentage: "",
    offerMinAmmount: "",

    MinOfferApplicableOn: "",
    MaxOfferApplicableOn: "",
    IsMinApplicableOn: true,
    isActive: true,
  });

  const [img, setImg] = useState(null);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const { isLoading: countryLoad, response: contryRes } =
    useFetchAxios("/getCountry");
  const { isLoading: stateLoad, response: stateRes } =
    useFetchAxios("/getState");
  const { isLoading: cityLoad, response: cityRes } = useFetchAxios("/getCity");

  const { isLoading, postData } = usePostAxios("/addOffer");

  const { isLoading: offerLoad, response: offerRes } = useFetchAxios(
    `/getOffer?id=${id}`
  );

  useEffect(() => {
    setCountryList(contryRes);
  }, [contryRes]);

  useEffect(() => {
    setStateList(stateRes);
  }, [stateRes]);

  useEffect(() => {
    setCityList(cityRes);
  }, [cityRes]);

  useEffect(() => {
    setInitValue({
      ...offerRes,
      offerOnCountry: offerRes?.offerOnCountry?._id,
      offerOnState: offerRes?.offerOnState?._id,
      offerOnCity: offerRes?.offerOnCity?._id,
    });
  }, [offerRes]);

  if (countryLoad === true) return <AppLoader />;
  if (stateLoad === true) return <AppLoader />;
  if (cityLoad === true) return <AppLoader />;
  if (offerLoad === true) return <AppLoader />;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    img: Yup.mixed(),
    description: Yup.string().required(),
    stateDate: Yup.string().required(),
    endDate: Yup.string().required(),
    offerCode: Yup.string().required(),
    offerUseCount: Yup.number().min(1).required(),
    terms: Yup.string().required(),

    offerOnCountry: Yup.string().required(),
    offerOnState: Yup.string().required(),
    offerOnCity: Yup.string().required(),

    offerAmountType: Yup.number().oneOf([1, 2]).required(),
    offerPercentage: Yup.number().required(),
    offerMinAmmount: Yup.number().required(),

    MinOfferApplicableOn: Yup.number().required(),
    MaxOfferApplicableOn: Yup.number().required(),
    IsMinApplicableOn: Yup.bool().oneOf([true, false]),
    isActive: Yup.bool().oneOf([true, false]),
  });

  const handleSubmit = async (val) => {
    try {
      if (img !== null && img !== undefined) {
        const formData = new FormData();
        formData.append("img", img);
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
          .then((res) => {
            axios
              .post(`${process.env.NEXT_PUBLIC_API_URL}/updateOffer/${id}`, {
                ...val,
                img: res.data.data,
              })
              .then((res) => {
                push("/admin/subscription/manage-offer");
              });
          });
      } else {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/updateOffer/${id}`, {
            ...val,
          })
          .then((res) => {
            push("/admin/subscription/manage-offer");
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WrapForm title="update offer">
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initValue}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => {
          return (
            <>
              <Form
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="row"
              >
                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> Offer Name</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="title"
                    value={values.title}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel>
                    {" "}
                    Offer image{" "}
                    <small
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      image size : 140 x 95
                    </small>{" "}
                  </FormLabel>
                  <FormControl
                    type="file"
                    className="form-control"
                    placeholder=""
                    accept="image/*"
                    name="img"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 col-lg-12">
                  <FormLabel> Offer Description </FormLabel>
                  <div className="summernote">
                    <Editor
                      initialValue={initValue.description}
                      name="description"
                      onChange={(e) =>
                        setFieldValue("description", e.target.getContent())
                      }
                    />
                  </div>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> Start Date</FormLabel>
                  <FormControl
                    type="date"
                    className="form-control"
                    value={values.stateDate}
                    onChange={(e) => {
                      const date = moment(e.target.value).toISOString();
                      setFieldValue("stateDate", date);
                    }}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> End Date</FormLabel>
                  <FormControl
                    type="date"
                    className="form-control"
                    value={values.endDate}
                    onChange={(e) =>
                      setFieldValue(
                        "endDate",
                        moment(e.target.value).toISOString()
                      )
                    }
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> Offer Code </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="offerCode"
                    value={values.offerCode}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> Offer User Count </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="offerUseCount"
                    value={values.offerUseCount}
                  />
                </FormGroup>

                <FormGroup className="col-md-12 col-lg-12">
                  <FormLabel> Offer Terms </FormLabel>
                  <div className="summernote">
                    <Editor
                      initialValue={values.terms}
                      name="terms"
                      onChange={(e) =>
                        setFieldValue("terms", e.target.getContent())
                      }
                    />
                  </div>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel>Country</FormLabel>
                  <FormControl
                    value={values.offerOnCountry}
                    name="offerOnCountry"
                    as="select"
                  >
                    <option>select</option>
                    {countryList.map((x) => (
                      <option value={x._id}>{x.name}</option>
                    ))}
                  </FormControl>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel>state</FormLabel>
                  <FormControl
                    value={values.offerOnState}
                    name="offerOnState"
                    as="select"
                  >
                    <option>select</option>
                    {stateList.map((x) => (
                      <option value={x._id}>{x.name}</option>
                    ))}
                  </FormControl>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> City</FormLabel>
                  <FormControl
                    value={values.offerOnCity}
                    name="offerOnCity"
                    as="select"
                  >
                    <option>select</option>
                    {cityList.map((x) => (
                      <option value={x._id}>{x.name}</option>
                    ))}
                  </FormControl>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> Offer ammount Type</FormLabel>
                  <FormControl
                    value={values.offerAmountType}
                    name="offerAmountType"
                    as="select"
                  >
                    <option>select</option>
                    <option value="1">Percentage</option>
                    <option value="2">Total Ammount</option>
                  </FormControl>
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> Offer Percentage/Ammount </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="offerPercentage"
                    value={values.offerPercentage}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel>Offer Minimum Ammount </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="offerMinAmmount"
                    value={values.offerMinAmmount}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> Offer Maximum Applicable On </FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="MinOfferApplicableOn"
                    value={values.MinOfferApplicableOn}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel> Maximum Offer Applicable On</FormLabel>
                  <FormControl
                    type="text"
                    className="form-control"
                    name="MaxOfferApplicableOn"
                    value={values.MaxOfferApplicableOn}
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel>Is Min Applicable On</FormLabel>
                  <Form.Check
                    checked={values.IsMinApplicableOn}
                    onClick={() =>
                      setFieldValue(
                        "IsMinApplicableOn",
                        !values.IsMinApplicableOn
                      )
                    }
                    label="active or inactive"
                  />
                </FormGroup>

                <FormGroup className="col-md-6 col-lg-6 col-xl-4">
                  <FormLabel>Status</FormLabel>
                  <Form.Check
                    checked={values.isActive}
                    onClick={() => setFieldValue("isActive", !values.isActive)}
                    label="active or inactive"
                  />
                </FormGroup>

                <FormGroup className="col-md-12 btn-page text-center">
                  <Button variant="primary " type="submit">
                    Add Offers
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
