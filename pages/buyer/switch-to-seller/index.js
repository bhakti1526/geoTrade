import React from "react";
import AppLoader from "../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import { Button } from "react-bootstrap";
import axios from "axios";
// import Logo from "../../../logo.png";

const RenderPost = ({ data, displayRazorpay }) => {
  const handleClick = () => displayRazorpay(data._id);

  return <Button onClick={handleClick}>{data.name}</Button>;
};

const index = () => {
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

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
      { id }
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
      image: "https://i.ibb.co/q5j82YX/geotrade-logo.png",
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
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
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
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    );
  };

  const { isLoading, response } = useFetchAxios("/api/payment");

  if (isLoading === true) return <AppLoader />;

  return (
    <div>
      {response.map((x, i) => (
        <RenderPost key={i} data={x} displayRazorpay={displayRazorpay} />
      ))}
    </div>
  );
};

export default index;
