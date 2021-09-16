import React from "react";
import { css } from "@emotion/css";
import { Spinner } from "react-bootstrap";

const AppLoader = () => {
  return (
    <div
      className={
        css`
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          height: 30vh !important;
          width: 100%;
          text-align: center;
        ` +
        " " +
        "row"
      }
    >
      <div className="col-md-12">
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    </div>
  );
};

export default AppLoader;
