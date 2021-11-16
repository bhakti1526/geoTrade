import React from "react";
import { useRouter } from "next/router";
import usePostAxios from "../../../component/hooks/usePostAxios";
import WrapTableLead from "./WrapTableLead";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import AppLoader from "../../../src/components/admin/AppLoader";

const profile = () => {
  const { isLoading, response, error } = useFetchAxios(
    "/api/user/lead?type=profile"
  );

  const { push } = useRouter();

  const { postData } = usePostAxios("/api/user/chats/gen/chat");

  const genChat = async (id) => {
    await postData({ seller: id });
    push("/buyer/chats");
  };

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
      Cell: (e) =>
        e.value.slice(0, 2) + e.value.slice(2).replace(/.(?=...)/g, "*"),
    },
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
      title="Profile Leads"
      column={column}
      isLoading={isLoading}
      columnData={response}
    />
  );
};

export default profile;
