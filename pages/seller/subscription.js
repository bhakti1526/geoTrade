import React, { useState, useMemo } from "react";
import moment from "moment";
import { useTable, useSortBy } from "react-table";
import { css } from "@emotion/css";
import parse from "html-react-parser";
import { Container, Row, Col, Tabs, Tab, Card, Button } from "react-bootstrap";
import useFetchAxios from "../../component/hooks/useFetchAxios";
import AppLoader from "../../src/components/admin/AppLoader";
import { useRouter } from "next/router";

const subscription = () => {
  const [key, setKey] = useState("Packages");

  const { isLoading: paymentLoad, response: paymentRes } =
    useFetchAxios("/api/payment");

  const { isLoading: statusLoad, response: statusRes } = useFetchAxios(
    "/api/payment/status"
  );

  if (paymentLoad === true) return <AppLoader />;
  if (statusLoad === true) return <AppLoader />;

  const { findSubscription, active } = statusRes;
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
                      <RenderPost data={x} active={active} />
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

const RenderPost = ({ data, active }) => {
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
          {active === data._id ? (
            <button type="button" class="w-100 btn btn-lg btn-outline-primary">
              Active
            </button>
          ) : (
            <button type="button" class="w-100 btn btn-lg btn-outline-primary">
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
        // console.log(e.cell.row.original)
        return (
          <Button
            className="rounded-pill"
            onClick={() => {
              push(`/seller/invoice?id=${e.cell.row.original._id}`);
            }}
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
