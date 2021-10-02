import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import InquiryCard from "../../../src/components/seller/InquiryCard";
import AppLoader from "../../../src/components/admin/AppLoader";
import useFetchAxios from "../../../component/hooks/useFetchAxios";

const index = () => {
  const { response, isLoading } = useFetchAxios("/api/user/rfq?userId=true");

  console.log(response);

  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header d-flex">
              <h4 className="card-title">Inquiry Leads</h4>
              <Link href={`${window.location.pathname}/add`} passHref>
                <Button className="float-right" as="a">
                  add rfq
                </Button>
              </Link>
            </div>
            <div className="card-body">
              {isLoading === true ? (
                <AppLoader />
              ) : (
                response.map((x) => <InquiryCard />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
