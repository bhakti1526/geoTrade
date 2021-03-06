import React from "react";
import { Dropdown } from "react-bootstrap";
import WrapTable from "../../../src/components/admin/WrapTable";

const columnData = [
  {
    id: 1,
    name: "site.com",
    email: "xyz@xyz.com",
    outgoinServer: "smtp.gmail.com",
    port: "587",
    isActive: true,
  },
  {
    id: 2,
    name: "demo.com",
    email: "demo@xyz.com",
    outgoinServer: "smtp.gmail.com",
    port: "999",
    isActive: false,
  },
];

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
    Header: "email",
    accessor: "email",
  },
  {
    Header: "outgoing server",
    accessor: "outgoinServer",
  },
  {
    Header: "port",
    accessor: "port",
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

const emailsDetails = () => {
  return (
    <WrapTable
      title="manage email details"
      column={column}
      columnData={columnData}
    />
  );
};

export default emailsDetails;
