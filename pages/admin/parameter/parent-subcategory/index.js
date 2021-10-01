import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import AppLoader from "../../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import useDeletAxios from "../../../../component/hooks/useDeleteAxios";
import WrapTable from "../../../../src/components/admin/WrapTable";

const index = () => {
  const { isLoading, response, getData } = useFetchAxios(
    "/api/admin/subcategory"
  );
  const { deleteData } = useDeletAxios();

  console.log(response, isLoading);

  const column = [
    {
      Header: "no",
      accessor: "id",
    },
    {
      Header: "  category name",
      accessor: "parentCategory.parentCatagoryName",
    },
    {
      Header: "  subcategory name",
      accessor: "parentSubCategoryName",
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
            <Link href={`${window.location}/${s.row.original._id}`} passHref>
              <Dropdown.Item>Edit</Dropdown.Item>
            </Link>
            <Dropdown.Item
              onClick={async () => {
                await deleteData(
                  `/api/admin/subcategory?id=${s.row.original._id}`
                );
                getData();
              }}
            >
              delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  if (isLoading === true) return <AppLoader />;

  return (
    <WrapTable
      bText="add parent subcategory"
      title="manage parent subcategory"
      column={column}
      isLoading={isLoading}
      columnData={response}
    />
  );
};

export default index;
