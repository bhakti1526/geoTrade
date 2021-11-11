import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { Button, Modal, ListGroup } from "react-bootstrap";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import WrapTable from "../../../../src/components/admin/WrapTable";
import AppLoader from "../../../../src/components/admin/AppLoader";

const index = () => {
  const { response, isLoading } = useFetchAxios("/api/admin/request");

  if (isLoading === true) return <AppLoader />;

  const column = [
    {
      Header: "no",
      accessor: "id",
    },
    {
      Header: "name",
      accessor: "pName",
    },
    {
      Header: "info",
      accessor: "pInfo",
      Cell: (e) => {
        var str = e.value;
        if (str.length > 10) str = str.substring(0, 10);

        return `${str} ...`;
      },
    },
    {
      Header: "img",
      accessor: "pImg",
      Cell: (e) => {
        return (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${e.value}`}
            width="48"
            alt="no image"
          />
        );
      },
    },
    {
      Header: "action",
      Cell: (e) => {
        return <ShowModalButton val={e} />;
      },
    },
  ];

  return (
    <>
      <WrapTable
        title="product request"
        columnData={response}
        column={column}
      />

      <Modal></Modal>
    </>
  );
};

export default index;

const ShowModalButton = ({ val }) => {
  const [showModal, setShowModal] = useState(false);

  const { pName, pInfo, pImg } = val.row.original;

  const toggle = () => setShowModal((x) => !x);

  return (
    <>
      <Button className="btn btn-primary" onClick={toggle}>
        view more
      </Button>

      <Modal show={showModal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Product Request Info</Modal.Title>
        </Modal.Header>
        <Modal.Body
          closeButton
          className={css`
            max-height: calc(100vh - 200px);
            overflow-y: auto;
          `}
        >
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Product Name</strong> : {pName}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Product info</strong> : {pInfo}
            </ListGroup.Item>
            {pImg && (
              <ListGroup.Item>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${pImg}`}
                  className="img-fluid"
                  height="45"
                  alt="no image"
                />
              </ListGroup.Item>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>
            Close
          </Button>
          {/* <Button
            variant="secondary"
            onClick={() => {
              toggle();

              push("/seller/product/add");
            }}
          >
            Add Product
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
