import React from "react";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import WrapTable from "../../../../src/components/admin/WrapTable";

const columnData = [
  {
    id: 1,
    name: "edecreuze0",
    email: "bgalliver0@hostgator.com",
    status: true,
  },
  {
    id: 2,
    name: "abarck1",
    email: "ccoldman1@reference.com",
    status: true,
  },
  {
    id: 3,
    name: "bewenson2",
    email: "ajakovijevic2@spiegel.de",
    status: false,
  },
  {
    id: 4,
    name: "aologan3",
    email: "csellars3@cargocollective.com",
    status: true,
  },
  {
    id: 5,
    name: "hbecket4",
    email: "ckick4@ow.ly",
    status: false,
  },
  {
    id: 6,
    name: "wlintin5",
    email: "hlundon5@arizona.edu",
    status: true,
  },
];

const column = [
  {
    Header: "no",
    accessor: "id",
  },
  {
    Header: "username",
    accessor: "name",
  },
  {
    Header: "email",
    accessor: "email",
  },
  {
    Header: "status",
    accessor: "status",
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
          <Link href={`${window.location}/kdmnksdl`} passHref>
            <Dropdown.Item>Edit</Dropdown.Item>
          </Link>
          <Dropdown.Item>delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ),
  },
];

const user = () => {
  return (
    <WrapTable
      bText="add user"
      title="manage admin user"
      column={column}
      columnData={columnData}
    />
  );
};

export default user;
