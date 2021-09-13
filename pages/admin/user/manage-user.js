import React from "react";
import { Dropdown } from "React-bootstrap";
import WrapTable from "../../../src/components/admin/WrapTable";

const columnData = [
  {
    id: Math.random(),
    username: "temp user",
    email: "temp@user.com",
    phoneNumber: "12312135412",
    city: "ahemdabad",
    state: "gujrat",
    country: "india",
    premium: false,
    sellerType: "mining",
    isActive: true,
  },
  {
    id: Math.random(),
    username: "temp user 2",
    email: "temp@@user.com",
    phoneNumber: "12312135412",
    city: "surat",
    state: "gujrat",
    country: "india",
    premium: true,
    sellerType: "mining",
    isActive: false,
  },
].map((x, i) => ({ ...x, id: i + 1 }));

const column = [
  {
    Header: "no",
    accessor: "id",
  },
  {
    Header: "user info",
    accessor: "username",
  },
  {
    Header: "email",
    accessor: "email",
  },
  {
    Header: "location",
    accessor: "state",
  },
  {
    Header: "premium",
    accessor: "premium",
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
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ),
  },
];

const manageUser = () => {
  return (
    <WrapTable title="manage user" column={column} columnData={columnData} />
  );
};

export default manageUser;
