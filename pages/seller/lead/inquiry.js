import React from 'react'
import { Link } from '@material-ui/core'
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import AppLoader from "../../../src/components/admin/AppLoader";
import useDeleteAxios from "../../../component/hooks/useDeleteAxios";
import WrapTableLead from "./WrapTableLead";

const inquiry = () => {

const { isLoading, response, error } = useFetchAxios("/getTracking");
const { deleteData, response: res } = useDeleteAxios();



if (isLoading === true) return <AppLoader />;

const column = [
  {
    Header: "no",
    accessor: "id",
  },
  {
    Header: "User Name",
    accessor: "buyer.firstName",
  },
  {
    Header: "Visited On",
    accessor: "actionDate",
  },
  {
    Header: "City Name",
    accessor: "buyer.city.name",
  },
  {
    Header: "Visit Type",
    accessor: "visitType.name",
  },
  {
      Header:"Message",
      accessor:"message"
  }
];

return (
  <WrapTableLead
  //   bText="add city"
    title="Inquiry sLeads"
    column={column}
    isLoading={isLoading}
    columnData={response}
  />
);
}

export default inquiry
