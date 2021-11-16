import React from "react";
import moment from "moment";
import { css } from "@emotion/css";
import { Card, Col, Table, Button, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import useFetchAxios from "../../component/hooks/useFetchAxios";
import Logo from "../../logo.png";
import html2canvas from "html2canvas";
import AppLoader from "../../src/components/admin/AppLoader";

import { jsPDF } from "jspdf";

const invoice = () => {
  const {
    query: { id },
  } = useRouter();

  const { isLoading, response } = useFetchAxios(`/api/payment/status?id=${id}`);

  if (isLoading === true) return <AppLoader />;

  const genPdf = () => {
    html2canvas(document.querySelector("#myPage")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header d-flex">
            <h4 className="card-title  text-capitalize">Invoice</h4>
            <Button onClick={genPdf}>genrate invoice</Button>
          </div>
          <div className="card-body" id="myPage">
            <Card className="p-4 shadow-none">
              <div className="mt-4">
                <div className="row align-items-center">
                  <div className="pl-4 clearfix ">
                    <div className="brand-logo mb-3">
                      <img
                        className="logo-abbr mr-2"
                        width={60}
                        src={Logo}
                        alt=""
                      />
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <Row
                className={css`
                  margin-left: 0rem;
                  margin-bottom: 1rem;
                `}
              >
                <Col md="6">
                  <h6>To:</h6>
                  <div>
                    <strong> {response?.user?.companyName}</strong>
                  </div>

                  <div>Email: {response?.user?.email} </div>
                </Col>
                <Col md="6">
                  <Table
                    className="text-start font-weight-normal"
                    style={{ wordBreak: "break-word" }}
                  >
                    <tbody>
                      <tr>
                        <td
                          className={
                            "left" +
                            " " +
                            css`
                              border-top: 1px solid transparent !important;
                            `
                          }
                        >
                          <strong>Transaction Id</strong>
                        </td>
                        <td
                          className={
                            "right" +
                            " " +
                            css`
                              border-top: 1px solid transparent !important;
                            `
                          }
                        >
                          {" "}
                          {response?._id}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={
                            "left" +
                            " " +
                            css`
                              border-bottom: 1px solid #eeeeee;
                            `
                          }
                        >
                          <strong>Transaction Date</strong>
                        </td>
                        <td
                          className={
                            "right" +
                            " " +
                            css`
                              border-bottom: 1px solid #eeeeee;
                            `
                          }
                        >
                          {moment(response?.paidDate).format("DD MMM YYYY")}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <div className="container mt-1">
                <Table
                  className="text-center font-weight-normal"
                  striped
                  bordered
                  responsive
                >
                  <thead>
                    <tr>
                      <th className="font-weight-normal">No</th>
                      <th className="font-weight-normal">Name</th>
                      <th className="font-weight-normal">Ammount</th>
                      <th className="font-weight-normal">Tax</th>
                      <th className="font-weight-normal">Paid Date</th>
                      <th className="font-weight-normal">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="font-weight-normal">
                        {response?.package?.name}
                      </td>
                      <td className="font-weight-normal">
                        ₹{response?.package?.price}
                      </td>
                      <td className="font-weight-normal">{response?.tax}</td>
                      <td>
                        {moment(response?.paidDate).format("DD MMM YYYY")}
                      </td>
                      <td className="font-weight-normal">
                        {response?.package?.duration}days
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="row">
                <Col md="8"></Col>
                <Col
                  md="4"
                  className={css`
                    padding-right: 2rem !important;
                  `}
                >
                  <Table className="text-center font-weight-normal">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>total</strong>
                        </td>
                        <td className="right">₹{response?.price}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </div>
              <div className="my-2 d-flex justify-content-center text-capitalize">
                <p
                  className={css`
                    font-size: 0.7rem;
                  `}
                >
                  this is computer generated invoice signature not required
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default invoice;
