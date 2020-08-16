/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
        ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
        : "";
  };

  return (
      <>
        {/* begin::Menu Nav */}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
              className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}
          {/*begin::1 Level*/}
            <li
                className={`menu-item ${getMenuItemActive("/chat")}`}
                aria-haspopup="true"
            >
                <NavLink className="menu-link" to="/chat">
                    <span className="svg-icon menu-icon">
                        <SVG src={toAbsoluteUrl("/media/svg/icons/Home/mailbox.svg")}/>
                    </span>
                    <span className="menu-text">Chat</span>
                </NavLink>
            </li>
            {/*end::1 Level*/}
            {/*begin::1 Level*/}
            <li
                className={`menu-item ${getMenuItemActive("/settings")}`}
                aria-haspopup="true"
            >
                <NavLink className="menu-link" to="/settings">
                    <span className="svg-icon menu-icon">
                        <SVG src={toAbsoluteUrl("/media/svg/icons/Tools/Tools.svg")}/>
                    </span>
                    <span className="menu-text">Settings</span>
                </NavLink>
            </li>
            {/*end::1 Level*/}
            {/*begin::1 Level*/}
            <li
                className={`menu-item ${getMenuItemActive("/bug-report")}`}
                aria-haspopup="true"
            >
                <NavLink className="menu-link" to="/bug-report">
                    <span className="svg-icon menu-icon">
                        <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Warning-2.svg")}/>
                    </span>
                    <span className="menu-text">File A Complaint</span>
                </NavLink>
            </li>
            {/*end::1 Level*/}
          {/*begin::1 Level*/}
          {/* <li
              className={`menu-item ${getMenuItemActive("/builder", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/builder">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}/>
            </span>
              <span className="menu-text">Layout Builder</span>
            </NavLink>
          </li> */}
          {/*end::1 Level*/}

          

          {/*end::1 Level*/}
        </ul>

        {/* end::Menu Nav */}
      </>
  );
}
