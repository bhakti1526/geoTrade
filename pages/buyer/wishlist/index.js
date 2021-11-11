import React from "react";
import AppLoader from "../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import WrapTable from "../../../src/components/admin/WrapTable";

const index = () => {
  const { isLoading, response } = useFetchAxios("/api/user/other/whislist");

  const column = [
    {
      Header: "no",
      accessor: "id",
    },
    {
      Header: "Prduct name",
      accessor: "item.name",
    },
    {
      Header: "Product image",
      accessor: "item.img",
      Cell: (e) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/api/img/${e.value[0]}`}
          alt="product"
          width="56"
        />
      ),
    },
    {
      Header: "item link",
      accessor: "url",
    },
    {
      Header: "action",
      Cell: (e) => <button className="btn btn-primary">remove</button>,
    },
  ];

  if (isLoading === true) return <AppLoader />;

  return (
    <WrapTable title="wishlist items" column={column} columnData={response} />
  );
};

export default index;
