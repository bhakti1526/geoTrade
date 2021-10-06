import React from "react";
import InquiryCard from "../../src/components/seller/InquiryCard";
import AppLoader from "../../src/components/admin/AppLoader";
import useFetchAxios from "../../component/hooks/useFetchAxios";

const rfqs = () => {
  const { response, isLoading } = useFetchAxios("/api/user/rfq?userId=true");
  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header d-flex">
              <h4 className="card-title">My Rfqs</h4>
            </div>
            <div className="card-body">
              {isLoading === true ? (
                <AppLoader />
              ) : (
                response.map((x) => <InquiryCard data={x} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default rfqs;
