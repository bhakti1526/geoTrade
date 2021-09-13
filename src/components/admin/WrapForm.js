import React from "react";

const WrapForm = ({ title, children }) => {
  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{title}</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapForm;
