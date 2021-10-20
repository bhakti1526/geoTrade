import React, { useContext, useEffect, useState } from "react";
import { css } from "@emotion/css";
import parse from "html-react-parser";
import { Row, Col, Form, Container } from "react-bootstrap";
import Multistep from "react-multistep";
import Select from "react-select";
import AppLoader from "../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import { useRouter } from "next/router";

import axios from "axios";

import { Dispatch } from "../../../component/context/app.context";
import Logo from "../../../logo.png";

const FirstForm = ({ setFormVal, response }) => {
  const { parentGroup, sellerType } = response;

  const [values, setValues] = useState({
    sellerType: "",
    parentGroup: [],
  });

  useEffect(() => {
    setFormVal((x) => ({ ...x, firstForm: values }));
  }, [values]);

  return (
    <section>
      <Row>
        <Col md="12">
          <Form.Group>
            <Form.Label>Seller Type</Form.Label>
            <Select
              onChange={(val) =>
                setValues((x) => ({ ...x, sellerType: val.value }))
              }
              options={sellerType.map((x) => ({
                value: x._id,
                label: x.sellerTypeName,
              }))}
            />
          </Form.Group>
        </Col>
        <Col md="12">
          <Form.Group>
            <Form.Label>Product Category</Form.Label>
            <Select
              isMulti
              onChange={(val) => setValues((x) => ({ ...x, parentGroup: val }))}
              options={parentGroup.map((x) => ({
                value: x._id,
                label: x.parentGroupName,
              }))}
            />
          </Form.Group>
        </Col>
      </Row>
    </section>
  );
};

const SecondForm = ({ setFormVal }) => {
  const [values, setValues] = useState({
    companyName: "",
    address: "",
  });

  const [docs, setDocs] = useState(null);

  useEffect(() => {
    setFormVal((x) => ({ ...x, SecondForm: values }));
  }, [values]);

  useEffect(() => {
    setFormVal((x) => ({ ...x, docs }));
  }, [docs]);

  return (
    <>
      <Row>
        <Col md="6">
          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              onChange={(e) =>
                setValues((x) => ({ ...x, companyName: e.target.value }))
              }
            />
          </Form.Group>
        </Col>
        <Col md="6" className="d-flex align-items-center">
          <div class="input-group">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                onChange={(e) => setDocs(e.target.files[0])}
              />
              <label class="custom-file-label">Add Brochure / DLR sheet</label>
            </div>
          </div>
        </Col>
        <Col md="12">
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={(e) =>
                setValues((x) => ({ ...x, address: e.target.value }))
              }
            />
          </Form.Group>
        </Col>

        <Col md="12">
          <Form.Group>
            <Form.Label>Map</Form.Label>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

const index = () => {
  const { isLoading, response } = useFetchAxios("/api/public/get-all-category");

  const [formVal, setFormVal] = useState({});

  const steps = [
    {
      name: "Personal Info",
      component: <FirstForm response={response} setFormVal={setFormVal} />,
    },
    { name: "Company Info", component: <SecondForm setFormVal={setFormVal} /> },
    { name: "Business Hours", component: <ThirdForm formVal={formVal} /> },
  ];

  const prevStyle = {
    background: "#F7FAFC",
    borderWidth: "0px",
    color: "#333333",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    padding: "0.55em 2em",
    border: "1px solid #EEEEEE",
    marginRight: "1rem",
  };

  const nextStyle = {
    background: "#FF720D",
    borderWidth: "0px",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    padding: "0.55em 2em",
  };

  if (isLoading === true) return <AppLoader />;

  return (
    <div className="row">
      <div className="col-xl-12 col-xxl-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Become Seller Form</h4>
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="step-form-horizontal"
            >
              <Multistep
                showNavigation={true}
                steps={steps}
                prevStyle={prevStyle}
                nextStyle={nextStyle}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

const RenderPost = ({ data, displayRazorpay }) => {
  const handleClick = () => displayRazorpay(data._id);

  const [isSelect, setIsSelect] = useState(false);

  const toggelSelect = () => setIsSelect((x) => !x);

  return (
    <>
      <div
        class={
          !isSelect
            ? "card mb-4 rounded-3 shadow-sm border"
            : "card mb-4 rounded-3 shadow-sm border border-primary"
        }
        onMouseEnter={toggelSelect}
        onMouseLeave={toggelSelect}
      >
        <div class="card-header py-3" style={{ borderRadius: "0" }}>
          <h4 class="my-0 fw-normal text-capitalize"> {data.name}</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">
            ${data.sellCost}
            <small class="text-muted fw-light">/ {data.duration} day</small>
          </h1>
          <ul
            class={
              "list-unstyled mt-3 mb-4" +
              " " +
              css`
                p {
                  margin-bottom: 0;
                }
              `
            }
          >
            {parse(data.description)}
          </ul>
          <button
            onClick={handleClick}
            type="button"
            class="w-100 btn btn-lg btn-outline-primary"
          >
            Buy {data.name}
          </button>
        </div>
      </div>
    </>
  );
};

const ThirdForm = ({ formVal }) => {
  const dispatch = useContext(Dispatch);

  const { push } = useRouter();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (id) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const { firstForm, docs, SecondForm } = formVal;

    const fd = new FormData();
    fd.append("img", docs);

    let sheetUrl;

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, fd)
      .then((res) => {
        sheetUrl = res.data.data;
      })
      .catch((err) => console.log(err));

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
      { id, firstForm, SecondForm, sheet: sheetUrl }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: "GroTrade",
      description: "Test Transaction",
      image: { Logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/status`, data)
          .then((res) => {
            dispatch({ type: "SET-SELLER" });
            push("/seller");
          })
          .catch((err) => {});
      },

      prefill: {
        name: "test email",
        email: "demo@mail.com",
        contact: "1231231230",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on(
      "payment.failed",
      async ({
        error: {
          metadata: { payment_id, order_id },
        },
      }) => {
        await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/status`, {
            razorpayPaymentId: payment_id,
            orderCreationId: order_id,
          })
          .then((res) => {})
          .catch((err) => {});
      }
    );
  };

  const { isLoading, response } = useFetchAxios("/api/payment");

  if (isLoading === true) return <AppLoader />;

  console.log(response);

  return (
    <Container fluid>
      <Row>
        {response
          .sort((a, b) => {
            return a["sellCost"] > b["sellCost"];
          })
          .map((x, i) => (
            <Col md="4">
              <RenderPost key={i} data={x} displayRazorpay={displayRazorpay} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};
