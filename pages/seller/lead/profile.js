// import React from 'react'
// import { Link } from '@material-ui/core'

// const profile = () => {
//     return (
//         <div>

//             <div className="row">
//         <div className="col-xl-12 col-lg-12">
//           <div className="card">
//             <div className="card-header">
//               <h4 className="card-title">Profile Leads</h4>
//             </div>
//             <div className="card-body">
//               <div className="basic-form">

//               <div className="lead-box mb-4">
//     <div className="row">
//         <div className="col-md-12 col-lg-6">
//             <div className="lead-left-desc">
//                 <h5 className="mb-3">Ecommerce Solutions</h5>
//                 <div className="flag row m-0 mb-3">
//                     <img
//                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAACMCAYAAADBcR0TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGMjU2MUUwMTA3MDExRUNBMjEwQTdBQkUyNThCMTU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGMjU2MUUxMTA3MDExRUNBMjEwQTdBQkUyNThCMTU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEYyNTYxREUxMDcwMTFFQ0EyMTBBN0FCRTI1OEIxNTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEYyNTYxREYxMDcwMTFFQ0EyMTBBN0FCRTI1OEIxNTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz64mtRXAAAPVklEQVR42uyd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"
//                         alt="india"
//                         class="col-1 p-1"
//                     />
//                     <p className="col-10 p-1 mb-0">Rewa, Madhya Pradesh</p>
//                 </div>
//                 <div className="duration-post mb-3"><i className="far fa-clock pr-1"></i><span className="pl-1">21 hrs ago</span></div>
//                 <div className="desc-post">
//                     <p className="mb-2">Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon... Text will be coming soon...</p>
//                     <p className="mb-2">Text will be coming soon...Text will be coming soon...Text will be coming soon...</p>
//                 </div>
//             </div>
//         </div>
//         <div className="col-md-12 col-lg-6">
//             <div className="lead-right-desc">
//                 <div className="table table-responsive mb-lg-0">
//                     <table className="table table-lead-post mb-0">
//                         <tbody>
//                             <tr>
//                                 <td>Product</td>
//                                 <td  style={{width: "10px"}}>:</td>
//                                 <th>Desc</th>
//                             </tr>
//                             <tr>
//                                 <td>Date</td>
//                                 <td  style={{width: "10px"}}>:</td>
//                                 <th>Desc</th>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="mt-4"><h5>Buyer Details</h5></div>
//                 <div className="table table-responsive mb-lg-0">
//                     <table className="table table-lead-post mb-0">
//                         <tbody>
//                             <tr>
//                                 <td>Member Since</td>
//                                 <td  style={{width: "10px"}}>:</td>
//                                 <th>2+ Years</th>
//                             </tr>
//                             <tr>
//                                 <td>Available</td>
//                                 <td style={{width: "10px"}}>:</td>
//                                 <th>
//                                     <div className="d-flex text-center">
//                                         <Link className="text-link mr-2" to="#">
//                                             <i className="fas fa-mobile-alt text-success"></i><br />
//                                             Mobile
//                                         </Link>
//                                         <Link className="text-link" to="#">
//                                             <i className="far fa-envelope-open text-success"></i><br />
//                                             Email
//                                         </Link>
//                                     </div>
//                                 </th>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="d-block mt-5">
//                     <div className="text-center">
//                         <Link className="btn btn-success btn-rounded text-white" to="#">send inquiry</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>

// <div className="lead-box mb-4">
//     <div className="row">
//         <div className="col-md-12 col-lg-6">
//             <div className="lead-left-desc">
//                 <h5 className="mb-3">Ecommerce Solutions</h5>
//                 <div className="flag row m-0 mb-3">
//                     <img
//                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAACMCAYAAADBcR0TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGMjU2MUUwMTA3MDExRUNBMjEwQTdBQkUyNThCMTU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGMjU2MUUxMTA3MDExRUNBMjEwQTdBQkUyNThCMTU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEYyNTYxREUxMDcwMTFFQ0EyMTBBN0FCRTI1OEIxNTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEYyNTYxREYxMDcwMTFFQ0EyMTBBN0FCRTI1OEIxNTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz64mtRXAAAPVklEQVR42uyd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"
//                         alt="india"
//                         class="col-1 p-1"
//                     />
//                     <p className="col-10 p-1 mb-0">Rewa, Madhya Pradesh</p>
//                 </div>
//                 <div className="duration-post mb-3"><i className="far fa-clock pr-1"></i><span className="pl-1">21 hrs ago</span></div>
//                 <div className="desc-post">
//                     <p className="mb-2">Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon... Text will be coming soon...</p>
//                     <p className="mb-2">Text will be coming soon...Text will be coming soon...Text will be coming soon...</p>
//                 </div>
//             </div>
//         </div>
//         <div className="col-md-12 col-lg-6">
//             <div className="lead-right-desc">
//                 <div className="table table-responsive mb-lg-0">
//                     <table className="table table-lead-post mb-0">
//                         <tbody>
//                             <tr>
//                                 <td>Product</td>
//                                 <td  style={{width: "10px"}}>:</td>
//                                 <th>Desc</th>
//                             </tr>
//                             <tr>
//                                 <td>Date</td>
//                                 <td  style={{width: "10px"}}>:</td>
//                                 <th>Desc</th>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="mt-4"><h5>Buyer Details</h5></div>
//                 <div className="table table-responsive mb-lg-0">
//                     <table className="table table-lead-post mb-0">
//                         <tbody>
//                             <tr>
//                                 <td>Member Since</td>
//                                 <td  style={{width: "10px"}}>:</td>
//                                 <th>2+ Years</th>
//                             </tr>
//                             <tr>
//                                 <td>Available</td>
//                                 <td style={{width: "10px"}}>:</td>
//                                 <th>
//                                     <div className="d-flex text-center">
//                                         <Link className="text-link mr-2" to="#">
//                                             <i className="fas fa-mobile-alt text-success"></i><br />
//                                             Mobile
//                                         </Link>
//                                         <Link className="text-link" to="#">
//                                             <i className="far fa-envelope-open text-success"></i><br />
//                                             Email
//                                         </Link>
//                                     </div>
//                                 </th>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="d-block mt-5">
//                     <div className="text-center">
//                         <Link className="btn btn-success btn-rounded text-white" to="#">send inquiry</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>

//                </div>
//             </div>
//           </div>
//         </div>
//       </div>

//         </div>
//     )
// }

// export default profile

import React, { useEffect } from "react";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
// import WrapTable from "../../../../src/components/admin/WrapTable";

// import useFetchAxios from "../../../../component/hooks/useFetchAxios";
import useFetchAxios from "../../../component/hooks/useFetchAxios";
import AppLoader from "../../../src/components/admin/AppLoader";
import useDeleteAxios from "../../../component/hooks/useDeleteAxios";
import WrapTableLead from "./WrapTableLead";

const profile = () => {
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
      Header: "Message",
      accessor: "message",
    },
  ];

  return (
    <WrapTableLead
      //   bText="add city"
      title="Profile Leads"
      column={column}
      isLoading={isLoading}
      columnData={response}
    />
  );
};

export default profile;
