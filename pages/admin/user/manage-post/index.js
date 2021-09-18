import React, { useEffect } from "react";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import WrapTable from "../../../../src/components/admin/WrapTable";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";
import useDeleteAxios from "../../../../component/hooks/useDeleteAxios";

const managePost = () => {
  const { isLoading, response, error } = useFetchAxios("/getPost");
  const { deleteData, response: res } = useDeleteAxios();

  if (isLoading === true) return <AppLoader />;

  const column = [
    {
      Header: "no",
      accessor: "id",
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "image",
      accessor: "image",
      Cell: (e) => <img src={e.value} alt="product" width="56" />,
    },
    {
      Header: "username",
      accessor: "username",
    },
    {
      Header: "price",
      accessor: "price",
    },
    {
      Header: "unit",
      accessor: "unit",
    },
    {
      Header: "approved",
      accessor: "isApproved",
      Cell: (e) => (
        <span
          className={
            e.value ? "badge light badge-success" : "badge light badge-danger"
          }
        >
          {e.value ? "active".toUpperCase() : "disabled".toUpperCase()}
        </span>
      ),
    },
    {
      Header: "action",
      Cell: (s) => (
        <Dropdown className="text-center">
          <Dropdown.Toggle
            as="a"
            variant=""
            className="btn-link i-false c-pointer"
          >
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <rect x={0} y={0} width={24} height={24} />
                <circle fill="#000000" cx={5} cy={12} r={2} />
                <circle fill="#000000" cx={12} cy={12} r={2} />
                <circle fill="#000000" cx={19} cy={12} r={2} />
              </g>
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight={true}>
            <Link href={`${window.location}/${s.row.original._id}`} passHref>
              <Dropdown.Item as="a">Edit</Dropdown.Item>
            </Link>
            <Dropdown.Item
              onClick={async () => {
                await deleteData(`/deletePost/${s.row.original._id}`).then(
                  () => {
                    if (res !== null) window.location.reload();
                  }
                );
              }}
            >
              delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <WrapTable
      title="manage user post"
      column={column}
      isLoading={isLoading}
      // columnData={response}
    />
  );
};

export default managePost;
