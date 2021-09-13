import React from "react";
import Link from "next/link";
import { Dropdown } from "React-bootstrap";
import WrapTable from "../../../../src/components/admin/WrapTable";

const columnData = [
  {
    id: Math.random(),
    name: "Traders and Suppliers".toLowerCase(),
    title: "Traders-and-Suppliers".toLowerCase(),
    img: "https://picsum.photos/200/300",
  },
].map((x, i) => ({ ...x, id: i + 1 }));

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
    Header: "seller image",
    accessor: "img",
    Cell: (e) => <img src={e.value} alt="product" width="56" />,
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
          <Link href={`${window.location}/kdmnksdl`} passHref>
            <Dropdown.Item as="a">Edit</Dropdown.Item>
          </Link>
          <Dropdown.Item>delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ),
  },
];

const sellerType = () => {
  return (
    <WrapTable
      bText="add seller type"
      title="manage seller type"
      column={column}
      columnData={columnData}
    />
  );
};

export default sellerType;
