import React from "react";
import { useRouter } from "next/router";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import usePostAxios from "../../../component/hooks/usePostAxios";
import AppLoader from "../../../src/components/admin/AppLoader";
import WrapTableLead from "./WrapTableLead";

const contact = () => {
  const { isLoading, response, error } = useFetchAxios(
    "/api/user/lead?type=contect"
  );

  const { push } = useRouter();

  const { postData } = usePostAxios("/api/user/chats/gen/chat");

  if (isLoading === true) return <AppLoader />;

  const genChat = async (id) => {
    await postData({ seller: id });
    push("/buyer/chats");
  };

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
      Cell: (e) =>
        e.value.slice(0, 2) + e.value.slice(2).replace(/.(?=...)/g, "*"),
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
      Cell: (e) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            genChat(e.row.original.buyer._id);
          }}
        >
          contact
        </button>
      ),
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
