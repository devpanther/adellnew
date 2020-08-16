/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownCustomToggler, DropdownMenu1 } from "../../dropdowns";

export function ListsWidget9({ className }) {
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">My Activity</span>
          </h3>
          <div className="card-toolbar">
            <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-hor" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <DropdownMenu1 />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* Body */}
        <div className="card-body pt-4">
          <div className="timeline timeline-5 mt-3">
            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                08:42
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-warning icon-xl"></i>
              </div>

              <div className="font-weight-mormal font-size-lg timeline-content text-muted pl-3">
                You Signed Up For AdellCare - Welcome 😊
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
