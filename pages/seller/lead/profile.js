import React from "react";

import WrapTableLead from "./WrapTableLead";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import AppLoader from "../../../src/components/admin/AppLoader";

const profile = () => {
  const { isLoading, response, error } = useFetchAxios(
    "/api/user/lead?type=profile"
  );

  if (isLoading === true) return <AppLoader />;

  const column = [
    {
      Header: "no",
      accessor: "id",
    },
    {
      Header: "buyer name",
      accessor: "buyer.firstName",
    },
    {
      Header: "mobile",
      accessor: "buyer.mobile",
    },

    {
      Header: "Message",
      accessor: "message",
    },
    {
      Header: "Action",
      accessor: "contact",
      Cell: (e) => <button className="btn btn-primary">contact</button>,
    },
  ];

  return (
    <WrapTableLead
      title="Profile Leads"
      column={column}
      isLoading={isLoading}
      columnData={response}
    />
  );
};

export default profile;
