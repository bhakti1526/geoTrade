import React from "react";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import AppLoader from "../../../src/components/admin/AppLoader";
import WrapTableLead from "./WrapTableLead";

const contact = () => {
  const { isLoading, response, error } = useFetchAxios(
    "/api/user/lead?type=contect"
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
    // {
    //   Header: "product / post",
    //   accessor: "originId.name",
    // },
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
      title="Contact Leads"
      column={column}
      isLoading={isLoading}
      columnData={response}
    />
  );
};

export default contact;
