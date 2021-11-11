import React, { useState, useMemo } from "react";
import moment from "moment";
import { useTable, useSortBy } from "react-table";
import { css } from "@emotion/css";
import parse from "html-react-parser";
import { Container, Row, Col, Tabs, Tab, Card, Button } from "react-bootstrap";
import useFetchAxios from "../../component/hooks/useFetchAxios";
import AppLoader from "../../src/components/admin/AppLoader";
import { useRouter } from "next/router";
import axios from "axios";
import Logo from "../../logo.png";

const subscription = () => {
  const [key, setKey] = useState("Packages");

  const {
    getData: paymentGet,
    isLoading: paymentLoad,
    response: paymentRes,
  } = useFetchAxios("/api/payment");

  const {
    getData: statusGet,
    isLoading: statusLoad,
    response: statusRes,
  } = useFetchAxios("/api/payment/status");

  if (paymentLoad === true) return <AppLoader />;
  if (statusLoad === true) return <AppLoader />;

  const { findSubscription, active, isActive } = statusRes;

  console.log();

  return (
    <Card>
      <Card.Body>
        <Tabs
          onSelect={(k) => setKey(k)}
          id="controlled-tab-example"
          className="custom-tab-1"
          activeKey={key}
        >
          <Tab eventKey="Packages" title="Packages">
            <Container>
              <Row>
                {paymentRes
                  .sort((a, b) => {
                    return a["sellCost"] > b["sellCost"];
                  })
                  .map((x) => (
                    <Col md="4">
                      <RenderPost
                        paymentGet={paymentGet}
                        statusGet={statusGet}
                        data={x}
                        active={active}
                        isActive={isActive}
                      />
                    </Col>
                  ))}
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="History" title="History">
            <Transaction findSubscription={findSubscription} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default subscription;

const RenderPost = ({ paymentGet, statusGet, data, active, isActive }) => {
  const [isSelect, setIsSelect] = useState(false);

  const toggelSelect = () => setIsSelect((x) => !x);

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

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment?update=true`,
      { id: data._id }
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
          .catch((err) => {})
          .finally(() => {
            paymentGet(), statusGet();
          });
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
          .catch((err) => {})
          .finally(() => {
            paymentGet(), statusGet();
          });
      }
    );
  };

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
            ₹{data.sellCost}
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
          {active === data._id && isActive === true ? (
            <button type="button" class="w-100 btn btn-lg btn-outline-primary">
              Active
            </button>
          ) : (
            <button
              onClick={displayRazorpay}
              type="button"
              class="w-100 btn btn-lg btn-outline-primary"
            >
              Buy {data.name}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const Transaction = ({ findSubscription }) => {
  const { push } = useRouter();

  const column = [
    {
      Header: "no",
      accessor: "id",
    },
    {
      Header: "name",
      accessor: "package.name",
    },

    {
      Header: "ammount",
      accessor: "price",
      Cell: (e) => `₹ ${e.value}`,
    },

    {
      Header: "duration",
      accessor: "duration",
      Cell: (e) => `${e.value} (day)`,
    },

    {
      Header: "paid date",
      accessor: "paidDate",
      Cell: (e) => moment(e.value).format("DD MMM YYYY"),
    },

    {
      Header: "payment status",
      accessor: "isSuccess",
      Cell: (e) => (
        <span
          className={
            e.value ? "badge light badge-success" : "badge light badge-danger"
          }
        >
          {e.value ? "success".toUpperCase() : "fail".toUpperCase()}
        </span>
      ),
    },

    {
      Header: "invoice",
      Cell: (e) => {
        return (
          <Button
            onClick={() => {
              push(`/seller/invoice?id=${e.cell.row.original._id}`);
            }}
            disabled={!e.cell.row.original.isSuccess}
          >
            invoice
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <WrapTable column={column} columnData={findSubscription} />
    </>
  );
};

const WrapTable = ({ column, columnData }) => {
  const columns = useMemo(() => column, []);
  const data = useMemo(
    () => (columnData ? columnData.map((x, i) => ({ ...x, id: i + 1 })) : []),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="card-body">
      <div className="table-responsive">
        <table
          className="table table-responsive-md text-center"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <img src="/images/sort_desc.png" alt="desc" />
                      ) : (
                        <img src="/images/sort_asc.png" alt="asc" />
                      )
                    ) : (
                      <img src="/images/sort_both.png" alt="both" />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
