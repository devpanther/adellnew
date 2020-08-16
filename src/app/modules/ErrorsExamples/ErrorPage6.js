import React from "react";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import "../../../_metronic/_assets/sass/pages/error/error-6.scss";

export function ErrorPage6() {
  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="error error-6 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/error/bg6.jpg")})`,
        }}
      >
        <div className="d-flex flex-column flex-row-fluid text-center">
          <h1
            className="error-title font-weight-boldest text-white mb-12"
            style={{ marginTop: "12rem;" }}
          >
            Oops...
          </h1>
          <p className="display-4 font-weight-bold text-white">
            Looks like something went wrong.
            <br />
            We're working on it
          </p>
          <a href="/"
          style={{
            backgroundColor: "#09c8e6", 
            color: "#444242", 
            border: "none", 
            textAlign: "center", 
            margin: "0 auto",
            padding: "10px 20px",
            borderRadius: "70px"}}>Back To Home</a>
        </div>
        
      </div>
    </div>
  );
}
