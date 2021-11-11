import React, { useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import WrapTable from "../../../../src/components/admin/WrapTable";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";
import useDeleteAxios from "../../../../component/hooks/useDeleteAxios";

const manageUser = () => {
  const { isLoading, response, error, getData } = useFetchAxios(
    "/api/auth/admin/alluser"
  );

  const { deleteData, response: res } = useDeleteAxios();

  if (isLoading === true) return <AppLoader />;

  console.log("RESPONSE", response);

  const column = [
    {
      Header: "no",
      accessor: "id",
    },
    {
      Header: "user info",
      accessor: "firstName",
    },
    // {
    //   Header: "email",
    //   accessor: "email",
    // },
    {
      Header: "date of registration",
      accessor: "createdAt",
      Cell: (e) => moment(e.value).format("DD/MM/YYYY"),
    },
    {
      Header: "package",
      accessor: "package.subscription.package.name",
    },
    // {
    //   Header: "country",
    //   accessor: "country.name",
    // },
    // {
    //   Header: "state",
    //   accessor: "state.name",
    // },
    // {
    //   Header: "city",
    //   accessor: "city.name",
    // },
    // {
    //   Header: "package",
    //   Cell: (s) => {
    //     // try {
    //     //   return moment(s?.row?.original?.package?.subscription?.paidDate).add(
    //     //     "DD-MM-YYYY",
    //     //     s?.row?.original?.package?.subscription?.duration
    //     //   );
    //     // } catch {
    //     //   return "";
    //     // }
    //   },
    // },
    {
      Header: "status",
      accessor: "isActive",
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
              href={`${window.location}/edit/${s.row.original._id}`}
              passHref
            >
              <Dropdown.Item as="a">edit seller</Dropdown.Item>
            </Link>

            <Link href={`${window.location}/${s.row.original._id}`} passHref>
              <Dropdown.Item as="a">add packages</Dropdown.Item>
            </Link>

            {s.row.original.isSeller ? (
              <>
                <Link
                  href={`/admin/user/manage-product?id=${s.row.original._id}`}
                  passHref
                >
                  <Dropdown.Item as="a">all products</Dropdown.Item>
                </Link>
                <Link
                  href={`/admin/user/manage-post?id=${s.row.original._id}`}
                  passHref
                >
                  <Dropdown.Item as="a">all post</Dropdown.Item>
                </Link>
              </>
            ) : undefined}
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <WrapTable
      bText="add seller"
      title="manage user"
      column={column}
      isLoading={isLoading}
      columnData={response}
    />
  );
};

export default manageUser;
