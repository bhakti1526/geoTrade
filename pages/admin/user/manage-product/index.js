import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import WrapTable from "../../../../src/components/admin/WrapTable";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";
import useDeleteAxios from "../../../../component/hooks/useDeleteAxios";

const manageProduct = () => {
  const {
    query: { id },
  } = useRouter();

  const { isLoading, response, error, getData } = useFetchAxios(
    `/api/auth/admin/userdata?data=product&id=${id}`
  );

  console.log("USER DATA RESPONSE", response);

  const { deleteData } = useDeleteAxios();

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
      accessor: "img",
      Cell: (e) => {
        return (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${e.value[0]}`}
            alt="product"
            width="56"
          />
        );
      },
    },
    {
      Header: "price",
      accessor: "price",
    },
    {
      Header: "unit",
      accessor: "unit.name",
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
            <Link
              href={`${window.location.pathname}/${s.row.original._id}`}
              passHref
            >
              <Dropdown.Item as="a">Edit</Dropdown.Item>
            </Link>
            <Dropdown.Item
              onClick={async () => {
                await deleteData(`/deleteProduct/${s.row.original._id}`);
                getData();
              }}
            >
              delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  if (!Array.isArray(response)) return <></>;
  return (
    <WrapTable
      title="manage user product"
      column={column}
      isLoading={isLoading}
      columnData={response}
    />
  );
};

export default manageProduct;
