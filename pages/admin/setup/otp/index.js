import React, { useEffect } from "react";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import WrapTable from "../../../../src/components/admin/WrapTable";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import AppLoader from "../../../../src/components/admin/AppLoader";
import useDeleteAxios from "../../../../component/hooks/useDeleteAxios";

const otp = () => {
  const { isLoading, response, error } = useFetchAxios("/getOtp");
  const { deleteData, response: res } = useDeleteAxios();

  if (isLoading === true) return <AppLoader />;

  const column = [
    {
      Header: "no",
      accessor: "id",
    },

    {
      Header: "sending limit",
      accessor: "sendingLimit",
    },
    {
      Header: "re-send limit",
      accessor: "reSendingLimit",
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
            <Link href={`${window.location}/update`} passHref>
              <Dropdown.Item as="a">Edit</Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  return (
    <WrapTable
      title="manage otp"
      column={column}
      isLoading={isLoading}
      columnData={response}
    />
  );
};

export default otp;
